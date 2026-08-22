import { ipcMain, type IpcMainEvent } from 'electron'
import { IpcChannel } from '../shared/ipc'
import type { ToolDecision, WorkflowEvent, WorkflowRunRequest } from '../shared/types'
import { cancelWorkflow, resolveToolDecision, runWorkflow } from './workflow/engine'

/**
 * Registers the workflow IPC handlers. A run is started fire-and-forget; its
 * events stream back to the originating renderer over {@link
 * IpcChannel.WorkflowEvent}, keyed by runId so the renderer can demux.
 *
 * Tool approvals flow the other way: the renderer resolves a pending
 * `tool-request` via {@link IpcChannel.WorkflowToolDecision}, unblocking the
 * engine mid-run.
 */
export function registerWorkflowIpc(): void {
  ipcMain.on(IpcChannel.WorkflowStart, (event: IpcMainEvent, request: WorkflowRunRequest) => {
    const sender = event.sender
    const emit = (payload: WorkflowEvent): void => {
      if (!sender.isDestroyed()) sender.send(IpcChannel.WorkflowEvent, payload)
    }
    // The interactive terminal pane was removed; agent command output now surfaces
    // in the chat's tool-result cards, so there's nowhere to mirror live output.
    const onTerminal = (): void => {}
    // Fire-and-forget: runWorkflow never throws (it reports errors as events).
    void runWorkflow(request, emit, onTerminal)
  })

  ipcMain.on(IpcChannel.WorkflowCancel, (_event, runId: string) => {
    cancelWorkflow(runId)
  })

  ipcMain.on(
    IpcChannel.WorkflowToolDecision,
    (_event, runId: string, toolId: string, decision: ToolDecision) => {
      resolveToolDecision(runId, toolId, decision)
    }
  )
}
