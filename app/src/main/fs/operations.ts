import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { basename, dirname, isAbsolute, relative, resolve, sep } from 'node:path'
import { contextManager } from '../context/manager'

/**
 * Sandbox violation: a requested path resolved outside the project root. This is
 * the security boundary for Phase 4 — the engine may only touch files under the
 * active project, never arbitrary locations on disk.
 */
export class PathEscapeError extends Error {
  constructor(requested: string) {
    super(`Path escapes the project root: ${requested}`)
    this.name = 'PathEscapeError'
  }
}

/**
 * Resolves a project-relative (or absolute-within-root) path to an absolute path,
 * guaranteeing the result stays inside the project root. Throws
 * {@link PathEscapeError} for any `..` traversal, absolute path, or symlink-style
 * escape that lands outside the sandbox.
 *
 * Two gates: (1) a cheap lexical check on the normalized path, then (2) a
 * `realpath` check that resolves symlinks along the existing portion of the
 * path — so a symlink *inside* the root that points outside it cannot be used to
 * escape. Because the target may not exist yet (a create), the realpath gate is
 * applied to the nearest existing ancestor.
 */
export function resolveSafe(requested: string): string {
  const root = contextManager.getRoot()
  // Reject absolute inputs unless they're already within the root.
  const abs = isAbsolute(requested) ? resolve(requested) : resolve(root, requested)

  // Gate 1 — lexical: `rel` starting with '..' (or an absolute path on another
  // drive) means the normalized path escapes the root.
  const rel = relative(root, abs)
  if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    throw new PathEscapeError(requested)
  }

  // Gate 2 — physical: resolve symlinks. `abs` may not exist yet, so walk up to
  // the nearest existing ancestor and verify its real path is still inside the
  // root's real path. A symlink inside the root pointing elsewhere fails here.
  const realRoot = realpathSyncSafe(root)
  const realAbs = realpathNearest(abs)
  const realRel = relative(realRoot, realAbs)
  if (realRel === '..' || realRel.startsWith(`..${sep}`) || isAbsolute(realRel)) {
    throw new PathEscapeError(requested)
  }

  return abs
}

/** realpath that tolerates a not-yet-existing root (returns the input as-is). */
function realpathSyncSafe(p: string): string {
  try {
    return realpathSync(p)
  } catch {
    return p
  }
}

/**
 * Real (symlink-resolved) path of the nearest existing ancestor of `abs`,
 * re-joined with the non-existent trailing segments. Lets us sandbox-check a
 * path whose final components don't exist yet (a file we're about to create).
 */
function realpathNearest(abs: string): string {
  let dir = abs
  const trailing: string[] = []
  for (;;) {
    if (existsSync(dir)) return resolve(realpathSync(dir), ...trailing.reverse())
    const parent = dirname(dir)
    if (parent === dir) return abs // reached the filesystem root without a hit
    trailing.push(basename(dir))
    dir = parent
  }
}

/** Reads a project file (sandbox-checked). Throws on escape or read failure. */
export function readProjectFile(relPath: string): string {
  const abs = resolveSafe(relPath)
  return readFileSync(abs, 'utf-8')
}

/**
 * Writes `content` to a project file (sandbox-checked), creating parent
 * directories as needed. Throws {@link PathEscapeError} on escape.
 */
export function writeProjectFile(relPath: string, content: string): void {
  const abs = resolveSafe(relPath)
  mkdirSync(dirname(abs), { recursive: true })
  writeFileSync(abs, content, 'utf-8')
}

/** A prospective write, resolved for diff display before anything touches disk. */
export interface WriteProposal {
  /** Whether the target file already exists (edit vs create). */
  exists: boolean
  /** Current contents, or '' when the file is new. */
  oldContent: string
  /** The proposed new contents (unchanged input, echoed for convenience). */
  newContent: string
}

/**
 * Prepares a write for approval: reads the current contents (if any) so the UI
 * can render an old-vs-new diff. Sandbox-checked but does NOT write. Throws
 * {@link PathEscapeError} on escape.
 */
export function proposeWrite(relPath: string, newContent: string): WriteProposal {
  const abs = resolveSafe(relPath)
  const exists = existsSync(abs)
  const oldContent = exists ? readFileSync(abs, 'utf-8') : ''
  return { exists, oldContent, newContent }
}
