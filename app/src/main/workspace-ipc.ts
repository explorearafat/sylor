import { BrowserWindow, dialog, ipcMain } from 'electron'
import { IpcChannel } from '../shared/ipc'
import type { WorkspaceInfo } from '../shared/types'
import { contextManager } from './context/manager'
import { mcpManager } from './mcp/manager'
import { skillsRegistry } from './skills/registry'
import { getSettings, saveSettings } from './settings'

/**
 * Workspace (folder-first Code mode; requirement A).
 *
 * Code mode is a folder agent, but until this subsystem there was no way to
 * choose that folder — {@link contextManager} silently defaulted to
 * `process.cwd()` (the install dir in a packaged build). Selecting a folder here
 * retargets the single source of truth for the project root, which the engine,
 * live preview, fs sandbox, and pty all read at call time; MCP and skills are
 * pointed at the new project too so their root-specific `.sylor/*` config
 * reloads on the next turn. The choice is persisted so the workspace is restored
 * next launch (see {@link ./settings} + {@link applyRoot}).
 *
 * Everything stays sandbox-scoped to the chosen root — this only *moves* the
 * sandbox; it never widens it.
 */

/** Broadcast the new workspace to every renderer so stores can react. */
function broadcastWorkspace(info: WorkspaceInfo): void {
  for (const win of BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) win.webContents.send(IpcChannel.WorkspaceChanged, info)
  }
}

/** The current root + whether it was explicitly chosen (persisted) vs the cwd default. */
function currentInfo(): WorkspaceInfo {
  return { root: contextManager.getRoot(), chosen: !!getSettings().ui.workspaceRoot }
}

/**
 * Applies a chosen root everywhere and persists it. Retargets the context manager
 * (engine/preview/fs/pty read it live), repoints MCP + re-scans skills so their
 * project `.sylor/*` config reloads, saves `workspaceRoot`, then broadcasts. MCP
 * is only repointed (cheap + sync) — the actual reconnect is lazy, happening on
 * the next agent turn via `ensureConnected(root)`, so picking a folder never
 * blocks on a slow server handshake.
 */
export function applyRoot(dir: string): WorkspaceInfo {
  contextManager.setRoot(dir)
  mcpManager.setProjectRoot(dir)
  skillsRegistry.reload(dir)
  const settings = getSettings()
  saveSettings({ ...settings, ui: { ...settings.ui, workspaceRoot: dir } })
  const info: WorkspaceInfo = { root: dir, chosen: true }
  broadcastWorkspace(info)
  return info
}

export function registerWorkspaceIpc(): void {
  ipcMain.handle(IpcChannel.WorkspaceGet, () => currentInfo())

  ipcMain.handle(IpcChannel.WorkspaceSelect, async (event): Promise<WorkspaceInfo | null> => {
    const win = BrowserWindow.fromWebContents(event.sender)
    const options: Electron.OpenDialogOptions = {
      title: 'Select a folder to work in',
      properties: ['openDirectory', 'createDirectory']
    }
    const result = win
      ? await dialog.showOpenDialog(win, options)
      : await dialog.showOpenDialog(options)
    if (result.canceled || result.filePaths.length === 0) return null
    return applyRoot(result.filePaths[0])
  })
}
