/**
 * MCP configuration loader.
 *
 * Servers are declared on disk in `mcp.json`, mirroring the Claude CLI's
 * `.mcp.json`. Two locations are read and merged:
 *  - global  → `~/.sylor/mcp.json`            (applies everywhere)
 *  - project → `<projectRoot>/.sylor/mcp.json` (overrides global by name)
 *
 * Shape:
 *   { "mcpServers": {
 *       "fs":     { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "."] },
 *       "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } }
 *   } }
 *
 * {@link parseMcpConfig} is a pure validator (unit-tested); {@link loadMcpConfigs}
 * layers the two files. Both are defensive — a missing/garbage file yields no
 * servers rather than throwing, so a typo never breaks app start.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import type {
  ConfigScope,
  McpConfigSource,
  McpHttpServerConfig,
  McpServerConfig,
  McpStdioServerConfig,
  McpTransport
} from '../../shared/types'

/** Sylor's global config directory (`~/.sylor`). */
export function sylorHome(): string {
  return join(homedir(), '.sylor')
}

/** Absolute path of the global MCP config (`~/.sylor/mcp.json`). */
export function globalMcpConfigPath(): string {
  return join(sylorHome(), 'mcp.json')
}

/** Absolute path of a project's MCP config (`<root>/.sylor/mcp.json`). */
export function projectMcpConfigPath(projectRoot: string): string {
  return join(projectRoot, '.sylor', 'mcp.json')
}

/** Which transport a config describes (for the UI badge + manager dispatch). */
export function transportOf(config: McpServerConfig): McpTransport {
  return 'url' in config ? 'http' : 'stdio'
}

/** Narrows an unknown JSON value to a `Record<string,string>`, or undefined. */
function coerceStringRecord(value: unknown): Record<string, string> | undefined {
  if (typeof value !== 'object' || value === null) return undefined
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    if (typeof v === 'string') out[k] = v
  }
  return Object.keys(out).length > 0 ? out : undefined
}

/** Validates one server entry into a {@link McpServerConfig}, or null if invalid. */
function coerceServer(value: unknown): McpServerConfig | null {
  if (typeof value !== 'object' || value === null) return null
  const v = value as Record<string, unknown>

  // Remote HTTP server: identified by a non-empty string `url`. Checked first so
  // a config carrying both fields is treated as remote (url wins, documented).
  if (typeof v.url === 'string' && v.url.trim()) {
    const headers = coerceStringRecord(v.headers)
    const cfg: McpHttpServerConfig = { url: v.url }
    if (headers) cfg.headers = headers
    return cfg
  }

  // Local stdio server: identified by a non-empty string `command`.
  if (typeof v.command === 'string' && v.command.trim()) {
    const cfg: McpStdioServerConfig = { command: v.command }
    if (Array.isArray(v.args)) {
      const args = v.args.filter((a): a is string => typeof a === 'string')
      if (args.length > 0) cfg.args = args
    }
    const env = coerceStringRecord(v.env)
    if (env) cfg.env = env
    return cfg
  }

  return null
}

/**
 * Parses the raw JSON of an `mcp.json` file into a validated server map. Pure and
 * total: any non-conforming input (wrong type, missing `mcpServers`, bad entry)
 * is dropped, yielding only the valid servers. Never throws.
 */
export function parseMcpConfig(raw: unknown): Record<string, McpServerConfig> {
  const out: Record<string, McpServerConfig> = {}
  if (typeof raw !== 'object' || raw === null) return out
  const servers = (raw as Record<string, unknown>).mcpServers
  if (typeof servers !== 'object' || servers === null) return out
  for (const [name, value] of Object.entries(servers as Record<string, unknown>)) {
    if (!name.trim()) continue
    const cfg = coerceServer(value)
    if (cfg) out[name] = cfg
  }
  return out
}

/** A server resolved from disk, tagged with which file it came from. */
export interface LoadedMcpServer {
  name: string
  config: McpServerConfig
  source: McpConfigSource
}

/** Reads + parses one config file; a missing/garbage file yields {}. */
function readConfigFile(path: string): Record<string, McpServerConfig> {
  try {
    return parseMcpConfig(JSON.parse(readFileSync(path, 'utf-8')))
  } catch {
    return {}
  }
}

/**
 * Loads and merges the global + project configs. A project server shadows a
 * global one of the same name (project wins), matching the CLI's precedence.
 */
export function loadMcpConfigs(projectRoot: string | null): LoadedMcpServer[] {
  const merged = new Map<string, LoadedMcpServer>()
  for (const [name, config] of Object.entries(readConfigFile(globalMcpConfigPath()))) {
    merged.set(name, { name, config, source: 'global' })
  }
  if (projectRoot) {
    for (const [name, config] of Object.entries(readConfigFile(projectMcpConfigPath(projectRoot)))) {
      merged.set(name, { name, config, source: 'project' })
    }
  }
  return [...merged.values()]
}

// ---------------------------------------------------------------------------
// Writers — used by the in-app "Add / Import server" and "Remove" actions. Kept
// here (beside the reader/validator) so the on-disk shape has one owner. Every
// write goes through {@link parseMcpConfig}'s validator, so a malformed paste is
// rejected before it ever touches disk.
// ---------------------------------------------------------------------------

/** Validates one server object into a {@link McpServerConfig}, or null if invalid. */
export function parseServerConfig(value: unknown): McpServerConfig | null {
  // Reuse the audited validator by probing it with a single-entry map.
  return parseMcpConfig({ mcpServers: { __probe__: value } }).__probe__ ?? null
}

/** Resolves the config path for a scope; throws a friendly error if unavailable. */
function scopePath(scope: ConfigScope, projectRoot: string | null): string {
  if (scope === 'project') {
    if (!projectRoot) throw new Error('Open a project folder first to add a project-scoped server.')
    return projectMcpConfigPath(projectRoot)
  }
  return globalMcpConfigPath()
}

/** Reads a config file's raw object, preserving unknown top-level keys; {} if absent. */
function readRawConfig(path: string): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(readFileSync(path, 'utf-8'))
    return typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

/**
 * The three shapes a user might paste when importing, normalized to name→config
 * entries: a full `{ "mcpServers": { … } }` block, a bare name→server map, or a
 * single unnamed server object (`{ "command": … }` / `{ "url": … }`) — the last
 * needs the `name` field to key it. Returns a friendly error when nothing valid
 * is found so the modal can surface it instead of writing garbage.
 */
export function extractServers(
  parsed: unknown,
  name: string
): { entries: [string, McpServerConfig][]; error?: string } {
  if (typeof parsed !== 'object' || parsed === null) {
    return { entries: [], error: 'Configuration must be a JSON object.' }
  }
  const obj = parsed as Record<string, unknown>

  // Shape 1: a full { mcpServers: { … } } block copied from a server's docs.
  if ('mcpServers' in obj) {
    const entries = Object.entries(parseMcpConfig(obj))
    return entries.length
      ? { entries }
      : { entries: [], error: 'No valid server found under "mcpServers".' }
  }

  // Shape 3: a single unnamed server object → key it by the name field.
  if (typeof obj.command === 'string' || typeof obj.url === 'string') {
    const cfg = parseServerConfig(obj)
    if (!cfg) return { entries: [], error: 'Server needs a "command" or "url".' }
    const key = name.trim()
    if (!key) return { entries: [], error: 'Enter a name for this server.' }
    return { entries: [[key, cfg]] }
  }

  // Shape 2: a bare name→server map.
  const entries = Object.entries(parseMcpConfig({ mcpServers: obj }))
  return entries.length
    ? { entries }
    : { entries: [], error: 'No valid server found in the configuration.' }
}

/** Writes (creates or overwrites) one server entry into a scope's file; returns the path. */
export function upsertMcpServer(
  name: string,
  config: McpServerConfig,
  scope: ConfigScope,
  projectRoot: string | null
): string {
  const path = scopePath(scope, projectRoot)
  const raw = readRawConfig(path)
  const servers =
    typeof raw.mcpServers === 'object' && raw.mcpServers !== null
      ? (raw.mcpServers as Record<string, unknown>)
      : {}
  servers[name] = config
  raw.mcpServers = servers
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(raw, null, 2)}\n`, 'utf-8')
  return path
}

/**
 * Removes a server entry from both the global and project files (a name may live
 * in either), rewriting only the files that actually held it. Returns true if any
 * entry was removed. A catalog server configured on disk thereby reverts to its
 * built-in default; a purely-custom one disappears.
 */
export function deleteMcpServer(name: string, projectRoot: string | null): boolean {
  const paths = [globalMcpConfigPath(), ...(projectRoot ? [projectMcpConfigPath(projectRoot)] : [])]
  let removed = false
  for (const path of paths) {
    const raw = readRawConfig(path)
    const servers = raw.mcpServers
    if (typeof servers !== 'object' || servers === null) continue
    const map = servers as Record<string, unknown>
    if (!(name in map)) continue
    delete map[name]
    writeFileSync(path, `${JSON.stringify(raw, null, 2)}\n`, 'utf-8')
    removed = true
  }
  return removed
}
