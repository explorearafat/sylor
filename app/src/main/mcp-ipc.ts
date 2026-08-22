import { ipcMain } from 'electron'
import { IpcChannel } from '../shared/ipc'
import type { McpAddServerInput, McpMutationResult } from '../shared/types'
import { contextManager } from './context/manager'
import {
  deleteMcpServer,
  extractServers,
  globalMcpConfigPath,
  projectMcpConfigPath,
  upsertMcpServer
} from './mcp/config'
import { mcpManager } from './mcp/manager'

/**
 * Registers the MCP client IPC. Servers are configured on disk (see
 * {@link ./mcp/config}); the renderer only reads status, lists tools, and asks
 * for a reconnect after editing `mcp.json`. `list`/`tools` await the initial
 * connect so the settings panel shows settled state rather than a flash of
 * "connecting"; `reconnect` reloads from disk against the current project root.
 *
 * Every handler resolves the project root from {@link contextManager} — the same
 * source the engine and preview server use — so a project's `.sylor/mcp.json`
 * always resolves against the session the user is actually in.
 */
export function registerMcpIpc(): void {
  // Warm up connections in the background so servers are ready (or visibly
  // failed) by the first turn / first settings open. Non-blocking; per-server
  // errors are captured as status, so this never rejects.
  void mcpManager.ensureConnected(contextManager.getRoot())

  ipcMain.handle(IpcChannel.McpListServers, async () => {
    await mcpManager.ensureConnected(contextManager.getRoot())
    return mcpManager.listServers()
  })

  ipcMain.handle(IpcChannel.McpListTools, async () => {
    await mcpManager.ensureConnected(contextManager.getRoot())
    return mcpManager.getTools()
  })

  ipcMain.handle(IpcChannel.McpReconnect, () => mcpManager.reconnect(contextManager.getRoot()))

  ipcMain.handle(IpcChannel.McpSetEnabled, (_event, name: string, enabled: boolean) =>
    mcpManager.setEnabled(name, enabled, contextManager.getRoot())
  )

  ipcMain.handle(IpcChannel.McpRestoreDefaults, () =>
    mcpManager.restoreDefaults(contextManager.getRoot())
  )

  // Add/import: validate the pasted JSON, merge each server into the chosen
  // scope's mcp.json, then reconnect. Malformed input returns a friendly error
  // (with the unchanged server list) rather than throwing across the IPC bridge.
  ipcMain.handle(
    IpcChannel.McpAddServer,
    async (_event, input: McpAddServerInput): Promise<McpMutationResult> => {
      const root = contextManager.getRoot()
      try {
        let parsed: unknown
        try {
          parsed = JSON.parse(input.json)
        } catch {
          throw new Error("That isn't valid JSON — paste the server block exactly as shown.")
        }
        const { entries, error } = extractServers(parsed, input.name)
        if (error || entries.length === 0) throw new Error(error ?? 'No valid server found.')
        for (const [name, config] of entries) upsertMcpServer(name, config, input.scope, root)
        const servers = await mcpManager.reconnect(root)
        return { ok: true, added: entries.length, servers }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        return { ok: false, error: message, servers: mcpManager.listServers() }
      }
    }
  )

  // Remove a custom server's disk entry (both scopes), then reconnect. A catalog
  // server configured on disk reverts to its built-in default automatically.
  ipcMain.handle(IpcChannel.McpRemoveServer, async (_event, name: string) => {
    const root = contextManager.getRoot()
    deleteMcpServer(name, root)
    return mcpManager.reconnect(root)
  })

  ipcMain.handle(IpcChannel.McpConfigPaths, () => {
    const root = contextManager.getRoot()
    return { global: globalMcpConfigPath(), project: root ? projectMcpConfigPath(root) : null }
  })
}
