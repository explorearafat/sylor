import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'node:path'
import { IpcChannel } from '../shared/ipc'
import { createWindow } from './window'
import { cancelAllStreams, registerProviderIpc } from './provider-ipc'
import { registerWorkflowIpc } from './workflow-ipc'
import { registerSessionIpc } from './session-ipc'
import { registerProjectIpc } from './project-ipc'
import { registerAttachmentIpc } from './attachment-ipc'
import { registerPreviewIpc } from './preview-ipc'
import { registerMcpIpc } from './mcp-ipc'
import { registerSkillsIpc } from './skills-ipc'
import { registerWorkspaceIpc } from './workspace-ipc'
import { cancelAllWorkflows } from './workflow/engine'
import { killAllPtys } from './terminal/pty'
import { stopPreview } from './preview/server'
import { mcpManager } from './mcp/manager'
import { contextManager } from './context/manager'
import { closeDb, setDbPath } from './db/db'
import { getSettings } from './settings'

/** Registers window-control IPC handlers used by the custom title bar. */
function registerWindowControls(): void {
  ipcMain.on(IpcChannel.WindowMinimize, (event) => {
    BrowserWindow.fromWebContents(event.sender)?.minimize()
  })

  ipcMain.on(IpcChannel.WindowToggleMaximize, (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (!window) return
    if (window.isMaximized()) {
      window.unmaximize()
    } else {
      window.maximize()
    }
  })

  ipcMain.on(IpcChannel.WindowClose, (event) => {
    BrowserWindow.fromWebContents(event.sender)?.close()
  })

  ipcMain.handle(IpcChannel.WindowIsMaximized, (event) => {
    return BrowserWindow.fromWebContents(event.sender)?.isMaximized() ?? false
  })
}

app.whenReady().then(() => {
  // Inject the DB path here (not inside db.ts) so the DB layer stays electron-free
  // and unit-testable. Local-only, outside any OneDrive-synced project dir.
  setDbPath(join(app.getPath('userData'), 'sylor.db'))

  // Restore the persisted working folder (requirement A) before any window or
  // subsystem reads the root, so the engine/preview/MCP/skills all start scoped
  // to the folder the user last chose. Absent on first launch → cwd default.
  const savedRoot = getSettings().ui.workspaceRoot
  if (savedRoot) {
    contextManager.setRoot(savedRoot)
    mcpManager.setProjectRoot(savedRoot)
  }

  registerWindowControls()
  registerProviderIpc()
  registerWorkflowIpc()
  registerSessionIpc()
  registerProjectIpc()
  registerAttachmentIpc()
  registerPreviewIpc()
  registerMcpIpc()
  registerSkillsIpc()
  registerWorkspaceIpc()
  createWindow()

  app.on('activate', () => {
    // On macOS, re-create a window when the dock icon is clicked and none are open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  // On macOS it's conventional to keep the app running until Cmd+Q.
  if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', () => {
  // Abort any in-flight provider streams and workflow runs, tear down the
  // preview server, disconnect MCP servers, and kill live ptys, so nothing
  // outlives the app.
  cancelAllStreams()
  cancelAllWorkflows()
  stopPreview()
  void mcpManager.disconnectAll()
  killAllPtys()
  closeDb()
})
