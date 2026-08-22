import { app, ipcMain } from 'electron'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve, sep } from 'node:path'
import { randomUUID } from 'node:crypto'
import { IpcChannel } from '../shared/ipc'
import type { Attachment, AttachmentAddInput } from '../shared/types'
import {
  attachToMessage,
  createAttachment,
  getAttachment,
  removeAttachment
} from './db/attachments'

/**
 * Wires the attachments IPC (chat-first redesign). File bytes cross the bridge as
 * base64 (a browser `File` can't) and are written to disk under
 * `userData/attachments/<sessionId>/`; only metadata lands in SQLite. All ops are
 * query-style (handle/invoke) — attachments are added at compose time, far less
 * often than chat messages.
 *
 * Security: bytes are only ever written **inside** the attachments root. The
 * filename is sanitized to a safe basename before it touches the filesystem, and
 * every write/read/delete re-checks that the resolved path stays under the root
 * (defense in depth against path traversal).
 */
export function registerAttachmentIpc(): void {
  ipcMain.handle(
    IpcChannel.AttachmentsAdd,
    async (_event, input: AttachmentAddInput): Promise<Attachment> => {
      const safeName = sanitizeName(input.name)
      const dir = join(attachmentsRoot(), sanitizeName(input.sessionId))
      const filePath = join(dir, `${randomUUID()}-${safeName}`)
      assertInsideRoot(filePath)

      const bytes = Buffer.from(input.data, 'base64')
      mkdirSync(dir, { recursive: true })
      writeFileSync(filePath, bytes)

      return createAttachment(
        input.sessionId,
        safeName,
        input.mime,
        filePath,
        bytes.byteLength,
        Date.now()
      )
    }
  )

  ipcMain.handle(
    IpcChannel.AttachmentsAttachToMessage,
    (_event, ids: string[], messageId: string): void => {
      attachToMessage(ids, messageId)
    }
  )

  ipcMain.handle(IpcChannel.AttachmentsRead, (_event, id: string): string | null => {
    const att = getAttachment(id)
    if (!att || !isInsideRoot(att.path)) return null
    try {
      const bytes = readFileSync(att.path)
      return `data:${att.mime};base64,${bytes.toString('base64')}`
    } catch {
      // File missing (e.g. userData wiped out from under us): degrade to null.
      return null
    }
  })

  ipcMain.handle(IpcChannel.AttachmentsRemove, (_event, id: string): void => {
    const att = getAttachment(id)
    if (att && isInsideRoot(att.path)) {
      try {
        rmSync(att.path, { force: true })
      } catch {
        // Best-effort: the row is removed regardless.
      }
    }
    removeAttachment(id)
  })
}

/** Absolute path of the attachments sandbox: `userData/attachments`. */
function attachmentsRoot(): string {
  return join(app.getPath('userData'), 'attachments')
}

/**
 * Reduce an arbitrary string to a safe path segment: basename only, dropping any
 * directory separators and characters that could enable traversal. Prevents
 * `../`, absolute paths, and drive letters from ever reaching the filesystem.
 */
function sanitizeName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? 'file'
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/^\.+/, '')
  return cleaned === '' ? 'file' : cleaned.slice(0, 128)
}

/** True when `p` resolves to a location inside (or equal to) the attachments root. */
function isInsideRoot(p: string): boolean {
  const root = resolve(attachmentsRoot())
  const target = resolve(p)
  return target === root || target.startsWith(root + sep)
}

/** Throw if `p` would land outside the attachments root (belt-and-suspenders). */
function assertInsideRoot(p: string): void {
  if (!isInsideRoot(p)) throw new Error('attachment path escaped the sandbox')
}
