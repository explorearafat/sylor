import { ipcMain } from 'electron'
import { IpcChannel } from '../shared/ipc'
import type { Project, ProjectKnowledge } from '../shared/types'
import {
  addProjectKnowledge,
  assignSessionToProject,
  createProject,
  deleteProject,
  listProjectKnowledge,
  listProjects,
  removeProjectKnowledge,
  renameProject,
  setProjectInstructions,
  setProjectMemory
} from './db/projects'

/**
 * Wires the projects IPC (chat-first redesign). All ops are query-style
 * (handle/invoke) — projects change far less often than chat messages, so the
 * fire-and-forget append pattern used for messages/terminal isn't needed here.
 * Projects are global (not root-scoped), mirroring {@link file://./db/projects.ts}.
 */
export function registerProjectIpc(): void {
  ipcMain.handle(IpcChannel.ProjectsList, (): Project[] => listProjects())

  ipcMain.handle(IpcChannel.ProjectsCreate, (_event, name: string): Project => {
    return createProject(name, Date.now())
  })

  ipcMain.handle(IpcChannel.ProjectsRename, (_event, id: string, name: string): void => {
    renameProject(id, name, Date.now())
  })

  ipcMain.handle(
    IpcChannel.ProjectsSetInstructions,
    (_event, id: string, instructions: string): void => {
      setProjectInstructions(id, instructions, Date.now())
    }
  )

  ipcMain.handle(IpcChannel.ProjectsSetMemory, (_event, id: string, memory: string): void => {
    setProjectMemory(id, memory, Date.now())
  })

  ipcMain.handle(IpcChannel.ProjectsRemove, (_event, id: string): void => {
    deleteProject(id)
  })

  ipcMain.handle(
    IpcChannel.ProjectsAssignSession,
    (_event, sessionId: string, projectId: string | null): void => {
      assignSessionToProject(sessionId, projectId, Date.now())
    }
  )

  ipcMain.handle(
    IpcChannel.ProjectsKnowledgeList,
    (_event, projectId: string): ProjectKnowledge[] => listProjectKnowledge(projectId)
  )

  ipcMain.handle(
    IpcChannel.ProjectsKnowledgeAdd,
    (_event, projectId: string, name: string, content: string): ProjectKnowledge => {
      return addProjectKnowledge(projectId, name, content, Date.now())
    }
  )

  ipcMain.handle(IpcChannel.ProjectsKnowledgeRemove, (_event, id: string): void => {
    removeProjectKnowledge(id)
  })
}
