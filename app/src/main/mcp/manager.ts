/**
 * MCP client manager.
 *
 * Connects to the servers declared in `mcp.json` (see {@link ./config}) — local
 * stdio processes and remote HTTP endpoints — discovers each server's tools, and
 * exposes a single `callTool(server, name, args)` the workflow engine invokes for
 * an approved `mcp_call`. Connection status is tracked per server for the UI.
 *
 * Security posture: remote HTTP is the one intentional relaxation of Sylor's
 * offline stance — it reaches out only to URLs the user explicitly configured on
 * disk, with locally-stored headers that are never logged. Local stdio spawns
 * local processes only. Every tool call is permission-gated upstream in the
 * engine (like `run_command`); nothing here runs without approval.
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { getDefaultEnvironment, StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js'
import type {
  McpCategory,
  McpConnectionState,
  McpConfigSource,
  McpHttpServerConfig,
  McpRisk,
  McpServerConfig,
  McpServerStatus,
  McpToolInfo
} from '../../shared/types'
import { loadMcpConfigs, transportOf } from './config'
import { MCP_CATALOG, mcpCatalogEntry } from './catalog'
import { isMcpEnabled, resetMcpOverrides, setMcpEnabled } from '../settings'

/** Per-request timeouts (ms). Tool calls get a long budget; connect/list short. */
const CONNECT_TIMEOUT_MS = 20_000
const LIST_TIMEOUT_MS = 15_000
const CALL_TIMEOUT_MS = 120_000

/** Cap on flattened tool output fed back into the model (chars). */
const MAX_OUTPUT = 8_000

/** The lightweight outcome of a tool call; the engine attaches id/kind. */
export interface McpCallOutcome {
  ok: boolean
  output: string
  truncated: boolean
  error?: string
}

/**
 * A server definition resolved for the active root: catalog metadata merged with
 * the concrete config to connect. Built by {@link McpManager.buildDefs} from the
 * catalog + disk on each (re)connect. The config/`build`-derived fields are code,
 * never persisted; only the on/off override is.
 */
interface ResolvedDef {
  name: string
  /** The concrete config used to connect (catalog-built or from disk). */
  config: McpServerConfig
  source: McpConfigSource
  title: string
  description: string
  category: McpCategory
  /** True when a catalog entry backs this name (even if configured on disk). */
  builtIn: boolean
  recommended: boolean
  local: boolean
  risk: McpRisk
  homepage?: string
  /** Credential a catalog server needs; blocks connect (→ unconfigured) until supplied on disk. */
  requiresApiKey?: string
  /** Default on/off when the user hasn't overridden (catalog value; disk → on). */
  defaultOn: boolean
  /** A catalog server that must be workspace-scoped; unconfigured if there's no root. */
  needsWorkspace: boolean
  /** True when `config` came from the catalog build (not a disk override). */
  usingCatalogConfig: boolean
}

/** Live per-server state held in the manager (its resolved def + connection). */
interface ServerRuntime {
  def: ResolvedDef
  client: Client | null
  state: McpConnectionState
  /** User on/off switch (persisted). A disabled server is never connected. */
  enabled: boolean
  tools: McpToolInfo[]
  error?: string
}

/** Turns any thrown value into a concise message (no secrets — headers/env stay out). */
function errText(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

/** Builds the child env: the SDK's safe defaults plus the config's extra vars. */
function buildEnv(extra?: Record<string, string>): Record<string, string> {
  return { ...getDefaultEnvironment(), ...(extra ?? {}) }
}

/** Flattens an MCP tool result's content blocks to bounded plain text. */
function flattenContent(content: unknown): { text: string; truncated: boolean } {
  const parts: string[] = []
  if (Array.isArray(content)) {
    for (const block of content) {
      if (!block || typeof block !== 'object') continue
      const b = block as Record<string, unknown>
      if (b.type === 'text' && typeof b.text === 'string') {
        parts.push(b.text)
      } else if (b.type === 'resource' && b.resource && typeof b.resource === 'object') {
        const r = b.resource as Record<string, unknown>
        parts.push(typeof r.text === 'string' ? r.text : `[resource ${String(r.uri ?? '')}]`)
      } else if (typeof b.type === 'string') {
        parts.push(`[${b.type}]`) // image / audio / other non-text block
      }
    }
  }
  const joined = parts.join('\n')
  return joined.length > MAX_OUTPUT
    ? { text: joined.slice(0, MAX_OUTPUT), truncated: true }
    : { text: joined, truncated: false }
}

function newClient(): Client {
  return new Client({ name: 'sylor', version: '0.1.0' }, { capabilities: {} })
}

/**
 * Manages the lifecycle of all configured MCP servers. A single instance is
 * shared across the app ({@link mcpManager}). Connection is lazy + memoized:
 * {@link ensureConnected} runs the initial connect once and all callers await the
 * same promise; {@link reconnect} tears everything down and reloads from disk.
 */
class McpManager {
  private servers = new Map<string, ServerRuntime>()
  private connectPromise: Promise<void> | null = null
  private projectRoot: string | null = null
  /** The project root the in-flight/settled `connectPromise` was built for. */
  private connectedRoot: string | null = null

  /** Point the manager at the active project root (affects project mcp.json). */
  setProjectRoot(root: string | null): void {
    this.projectRoot = root
  }

  /**
   * Connect to every configured server, memoized so overlapping turns share one
   * in-flight connect. Passing a `root` that differs from the one the current
   * connection was built for triggers a full reconnect, since a project's
   * `.sylor/mcp.json` is root-specific (switching sessions must reload it). A
   * `callTool`-style call with no `root` always reuses the existing connection.
   */
  ensureConnected(root?: string | null): Promise<void> {
    const rootChanged = root !== undefined && root !== this.connectedRoot
    if (root !== undefined) this.projectRoot = root
    if (this.connectPromise && !rootChanged) return this.connectPromise
    this.connectedRoot = this.projectRoot
    // On a root change, tear down existing clients before reconnecting.
    const teardown = this.connectPromise ? this.disconnectAll() : Promise.resolve()
    this.connectPromise = teardown.then(() => this.connectAll())
    return this.connectPromise
  }

  /** Reload `mcp.json` from disk and reconnect all servers; returns fresh status. */
  async reconnect(root?: string | null): Promise<McpServerStatus[]> {
    if (root !== undefined) this.projectRoot = root
    await this.disconnectAll()
    this.connectedRoot = this.projectRoot
    this.connectPromise = this.connectAll()
    await this.connectPromise
    return this.listServers()
  }

  /** Current status of every configured server (drives the settings UI). */
  listServers(): McpServerStatus[] {
    return [...this.servers.values()].map((rt) => {
      const d = rt.def
      const status: McpServerStatus = {
        name: d.name,
        title: d.title,
        description: d.description,
        category: d.category,
        transport: transportOf(d.config),
        source: d.source,
        state: rt.state,
        enabled: rt.enabled,
        toolCount: rt.tools.length,
        builtIn: d.builtIn,
        recommended: d.recommended,
        local: d.local,
        free: true,
        risk: d.risk
      }
      if (rt.error) status.error = rt.error
      if (d.requiresApiKey) status.requiresApiKey = d.requiresApiKey
      if (d.homepage) status.homepage = d.homepage
      return status
    })
  }

  /**
   * Enable or disable a server by name (persisted to `sylor-mcp.json`) and apply
   * it immediately by reloading from disk + reconnecting: a disabled server drops
   * its client and its tools vanish from the next turn's prompt, while an enabled
   * one connects. Returns fresh status for the settings UI.
   */
  async setEnabled(
    name: string,
    enabled: boolean,
    root?: string | null
  ): Promise<McpServerStatus[]> {
    if (root !== undefined) this.projectRoot = root
    setMcpEnabled(name, enabled)
    return await this.reconnect()
  }

  /**
   * Clear every enable/disable override so each server reverts to its default
   * (catalog defaults — mostly off; custom disk servers back on), then reconnect.
   * Never touches `mcp.json`, so custom server definitions are preserved.
   */
  async restoreDefaults(root?: string | null): Promise<McpServerStatus[]> {
    if (root !== undefined) this.projectRoot = root
    resetMcpOverrides()
    return await this.reconnect()
  }

  /** All tools discovered across connected servers (for the system prompt). */
  getTools(): McpToolInfo[] {
    const out: McpToolInfo[] = []
    for (const rt of this.servers.values()) out.push(...rt.tools)
    return out
  }

  /**
   * Calls a tool on a connected server. Ensures the initial connect has run, then
   * dispatches. Never throws — a missing server, disconnected server, or a tool
   * error all come back as `{ ok: false, error }` so the agent loop can react.
   */
  async callTool(
    server: string,
    name: string,
    args: Record<string, unknown>
  ): Promise<McpCallOutcome> {
    await this.ensureConnected()
    const rt = this.servers.get(server)
    if (!rt) {
      return fail(`Unknown MCP server "${server}". Check your mcp.json configuration.`)
    }
    if (!rt.client || rt.state !== 'connected') {
      return fail(`MCP server "${server}" is not connected${rt.error ? `: ${rt.error}` : '.'}`)
    }
    try {
      const res = await rt.client.callTool(
        { name, arguments: args },
        undefined,
        { timeout: CALL_TIMEOUT_MS }
      )
      const { text, truncated } = flattenContent((res as { content?: unknown }).content)
      if ((res as { isError?: boolean }).isError) {
        return { ok: false, output: text, truncated, error: text || 'The tool reported an error.' }
      }
      return { ok: true, output: text, truncated }
    } catch (err) {
      return fail(errText(err))
    }
  }

  /** Close every client and clear state; the next ensureConnected reconnects. */
  async disconnectAll(): Promise<void> {
    const clients = [...this.servers.values()]
      .map((rt) => rt.client)
      .filter((c): c is Client => c !== null)
    this.servers.clear()
    this.connectPromise = null
    await Promise.all(clients.map((c) => c.close().catch(() => {})))
  }

  /**
   * Resolves every server definition for `root` by merging the curated catalog
   * with the user's `mcp.json`. Catalog entries come first (opt-in built-ins);
   * a disk server of the same name overrides the catalog's *config* (so e.g. a
   * `github` entry configured with a token connects for real) while keeping the
   * catalog's display metadata. Unknown disk names are custom servers, appended
   * after. Insertion order is preserved so the UI lists catalog then custom.
   */
  private buildDefs(root: string | null): ResolvedDef[] {
    const map = new Map<string, ResolvedDef>()
    for (const entry of MCP_CATALOG) {
      map.set(entry.name, {
        name: entry.name,
        config: entry.build(root),
        source: 'catalog',
        title: entry.title,
        description: entry.description,
        category: entry.category,
        builtIn: true,
        recommended: entry.recommended,
        local: entry.local,
        risk: entry.risk,
        homepage: entry.homepage,
        requiresApiKey: entry.requiresApiKey,
        defaultOn: entry.defaultOn,
        needsWorkspace: entry.needsWorkspace ?? false,
        usingCatalogConfig: true
      })
    }
    for (const s of loadMcpConfigs(root)) {
      const cat = mcpCatalogEntry(s.name)
      const transport = transportOf(s.config)
      map.set(s.name, {
        name: s.name,
        config: s.config,
        source: s.source,
        title: cat?.title ?? s.name,
        description: cat?.description ?? '',
        category: cat?.category ?? 'development',
        builtIn: !!cat,
        recommended: cat?.recommended ?? false,
        local: cat?.local ?? transport === 'stdio',
        risk: cat?.risk ?? (transport === 'http' ? 'network' : 'local'),
        homepage: cat?.homepage,
        // The disk config carries its own credentials, so it isn't key-blocked.
        requiresApiKey: undefined,
        // An explicitly-configured disk server defaults on.
        defaultOn: true,
        needsWorkspace: false,
        usingCatalogConfig: false
      })
    }
    return [...map.values()]
  }

  /**
   * Initial state for an enabled server before connecting. A catalog server that
   * still needs a workspace root or an API key is deliberately NOT connected —
   * it shows `unconfigured` (what's required) instead of a misleading error.
   */
  private initialState(def: ResolvedDef, enabled: boolean, root: string | null): McpConnectionState {
    if (!enabled) return 'disabled'
    if (def.usingCatalogConfig && def.needsWorkspace && !root) return 'unconfigured'
    if (def.usingCatalogConfig && def.requiresApiKey) return 'unconfigured'
    return 'connecting'
  }

  /** Resolves the catalog + disk, then connects to each enabled, configured server. */
  private async connectAll(): Promise<void> {
    const root = this.projectRoot
    // Seed rows so status reflects every server even mid-connect. Disabled servers
    // are listed but never connected: no client, no tools in the prompt, and any
    // call to one fails upstream in the engine. Unconfigured ones are held back
    // until their key/workspace is supplied.
    this.servers = new Map(
      this.buildDefs(root).map((def) => {
        const enabled = isMcpEnabled(def.name, def.defaultOn)
        const rt: ServerRuntime = {
          def,
          client: null,
          state: this.initialState(def, enabled, root),
          enabled,
          tools: []
        }
        return [def.name, rt]
      })
    )
    await Promise.all(
      [...this.servers.values()]
        .filter((rt) => rt.state === 'connecting')
        .map((rt) => this.connectOne(rt.def.name))
    )
  }

  /** Connects one server, discovers its tools, and records the outcome as status. */
  private async connectOne(name: string): Promise<void> {
    const rt = this.servers.get(name)
    if (!rt) return
    try {
      const client = await openClient(rt.def.config)
      const listed = await client.listTools(undefined, { timeout: LIST_TIMEOUT_MS })
      rt.client = client
      rt.tools = (listed.tools ?? []).map((t) => ({
        server: name,
        name: t.name,
        description: typeof t.description === 'string' ? t.description : ''
      }))
      rt.state = 'connected'
      rt.error = undefined
    } catch (err) {
      rt.state = 'error'
      rt.error = errText(err)
      rt.tools = []
      rt.client = null
    }
  }
}

/** A failed {@link McpCallOutcome} with the given message. */
function fail(error: string): McpCallOutcome {
  return { ok: false, output: '', truncated: false, error }
}

/** Opens + connects a client for a config, dispatching on transport. */
async function openClient(config: McpServerConfig): Promise<Client> {
  if ('url' in config) return openHttpClient(config)
  const client = newClient()
  const transport = new StdioClientTransport({
    command: config.command,
    args: config.args ?? [],
    env: buildEnv(config.env),
    stderr: 'ignore'
  })
  await client.connect(transport, { timeout: CONNECT_TIMEOUT_MS })
  return client
}

/**
 * Opens a remote client, preferring modern Streamable HTTP and falling back to
 * legacy HTTP+SSE for older servers. Reports the primary transport's error if
 * both fail, since that's the one users are most likely configuring for.
 */
async function openHttpClient(config: McpHttpServerConfig): Promise<Client> {
  const url = new URL(config.url)
  const requestInit = config.headers ? { headers: config.headers } : undefined
  try {
    const client = newClient()
    const transport = new StreamableHTTPClientTransport(url, requestInit ? { requestInit } : undefined)
    await client.connect(transport, { timeout: CONNECT_TIMEOUT_MS })
    return client
  } catch (streamErr) {
    try {
      const client = newClient()
      const transport = new SSEClientTransport(url, requestInit ? { requestInit } : undefined)
      await client.connect(transport, { timeout: CONNECT_TIMEOUT_MS })
      return client
    } catch {
      throw streamErr
    }
  }
}

/** The app-wide MCP manager. Initialized on app ready; torn down on quit. */
export const mcpManager = new McpManager()
