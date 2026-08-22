import type { Attachment } from '../../shared/types'
import { getDb } from './db'

/**
 * Typed CRUD over the `attachments` table (chat-first redesign). Mirrors the
 * shape of {@link file://./projects.ts projects.ts}: the main process is the
 * single writer and ids are minted from an injected clock so the layer stays
 * electron-free and unit-testable.
 *
 * Only metadata lives here — the file bytes are written to disk by the IPC layer
 * under `userData/attachments/<sessionId>/`. Rows are created "pending"
 * (`message_id = NULL`) at compose time and bound to a user message on send via
 * {@link attachToMessage}. Deleting a session cascades its rows away
 * (`session_id` FK); the disk files are cleaned up by the IPC layer.
 */

let idCounter = 0

/** Generate a unique attachment id. Time-free (now is passed in) for tests. */
function nextId(now: number): string {
  idCounter += 1
  return `att-${now}-${idCounter}`
}

/**
 * Record a stored attachment (pending — not yet tied to a message) and return
 * its metadata. The caller has already written the bytes to `path`.
 */
export function createAttachment(
  sessionId: string,
  name: string,
  mime: string,
  path: string,
  size: number,
  now: number
): Attachment {
  const id = nextId(now)
  getDb()
    .prepare(
      `INSERT INTO attachments (id, session_id, message_id, name, mime, path, size, created_at)
       VALUES (?, ?, NULL, ?, ?, ?, ?, ?)`
    )
    .run(id, sessionId, name, mime, path, size, now)
  return { id, sessionId, messageId: null, name, mime, path, size, createdAt: now }
}

/** Load a single attachment by id, or null if unknown. */
export function getAttachment(id: string): Attachment | null {
  const r = getDb()
    .prepare(
      `SELECT id, session_id, message_id, name, mime, path, size, created_at
       FROM attachments WHERE id = ?`
    )
    .get(id) as
    | {
        id: string
        session_id: string
        message_id: string | null
        name: string
        mime: string
        path: string
        size: number
        created_at: number
      }
    | undefined
  if (!r) return null
  return {
    id: r.id,
    sessionId: r.session_id,
    messageId: r.message_id,
    name: r.name,
    mime: r.mime,
    path: r.path,
    size: r.size,
    createdAt: r.created_at
  }
}

/** Attachments for a session (both pending and bound), oldest first. */
export function listAttachmentsBySession(sessionId: string): Attachment[] {
  const rows = getDb()
    .prepare(
      `SELECT id, session_id, message_id, name, mime, path, size, created_at
       FROM attachments WHERE session_id = ? ORDER BY created_at`
    )
    .all(sessionId) as Array<{
    id: string
    session_id: string
    message_id: string | null
    name: string
    mime: string
    path: string
    size: number
    created_at: number
  }>
  return rows.map((r) => ({
    id: r.id,
    sessionId: r.session_id,
    messageId: r.message_id,
    name: r.name,
    mime: r.mime,
    path: r.path,
    size: r.size,
    createdAt: r.created_at
  }))
}

/**
 * Bind pending attachments (by id) to the user message they were sent with.
 * A no-op for an empty id list. `message_id` is a plain column (not a FK), so
 * this never races the fire-and-forget user-message append.
 */
export function attachToMessage(ids: string[], messageId: string): void {
  if (ids.length === 0) return
  const placeholders = ids.map(() => '?').join(', ')
  getDb()
    .prepare(`UPDATE attachments SET message_id = ? WHERE id IN (${placeholders})`)
    .run(messageId, ...ids)
}

/** Delete an attachment row by id (its disk file is removed by the caller). */
export function removeAttachment(id: string): void {
  getDb().prepare(`DELETE FROM attachments WHERE id = ?`).run(id)
}
