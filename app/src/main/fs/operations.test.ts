import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync
} from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { contextManager } from '@main/context/manager'
import {
  PathEscapeError,
  proposeWrite,
  readProjectFile,
  resolveSafe,
  writeProjectFile
} from '@main/fs/operations'

/**
 * These exercise the sandbox against a throwaway project root. The fs operations
 * layer resolves everything relative to `contextManager.getRoot()`, so we point
 * the singleton at a temp dir for the duration of the suite and restore it after.
 */
let root: string
let originalRoot: string

beforeAll(() => {
  originalRoot = contextManager.getRoot()
  root = mkdtempSync(join(tmpdir(), 'sylor-fs-'))
  contextManager.setRoot(root)
})

afterAll(() => {
  contextManager.setRoot(originalRoot)
  rmSync(root, { recursive: true, force: true })
})

describe('resolveSafe (sandbox boundary)', () => {
  it('resolves a project-relative path to an absolute path inside the root', () => {
    const abs = resolveSafe('src/foo.ts')
    expect(abs).toBe(join(root, 'src', 'foo.ts'))
  })

  it('rejects a parent-traversal path that escapes the root', () => {
    expect(() => resolveSafe('../escape.ts')).toThrow(PathEscapeError)
  })

  it('rejects a deep traversal that climbs out of the root', () => {
    expect(() => resolveSafe('src/../../escape.ts')).toThrow(PathEscapeError)
  })

  it('rejects an absolute path outside the root', () => {
    const outside = process.platform === 'win32' ? 'C:\\Windows\\system32' : '/etc/passwd'
    expect(() => resolveSafe(outside)).toThrow(PathEscapeError)
  })

  it('allows an absolute path that is already within the root', () => {
    const inside = join(root, 'nested', 'file.ts')
    expect(resolveSafe(inside)).toBe(inside)
  })

  it('normalises interior traversal that stays within the root', () => {
    expect(resolveSafe('a/b/../c.ts')).toBe(join(root, 'a', 'c.ts'))
  })

  it('rejects a path that escapes through a symlink inside the root', () => {
    // The lexical check alone is fooled by a symlink inside the root that points
    // outside it; the realpath gate must catch it. Symlink creation needs elevated
    // privileges on Windows, so skip cleanly when the OS refuses.
    const outside = mkdtempSync(join(tmpdir(), 'sylor-outside-'))
    const link = join(root, 'link-out')
    let linked = false
    try {
      symlinkSync(outside, link, 'dir')
      linked = true
    } catch {
      // Insufficient privileges (typical on Windows without Developer Mode) — skip.
    }
    if (!linked) return
    try {
      // Lexically "link-out/evil.ts" sits inside the root, but it resolves through
      // the symlink to an out-of-root location.
      expect(() => resolveSafe('link-out/evil.ts')).toThrow(PathEscapeError)
      // An escape via an EXISTING file behind the symlink is caught too.
      writeFileSync(join(outside, 'real.ts'), 'secret')
      expect(() => resolveSafe('link-out/real.ts')).toThrow(PathEscapeError)
    } finally {
      rmSync(link, { force: true })
      rmSync(outside, { recursive: true, force: true })
    }
  })

  it('still allows a real subdirectory that is not a symlink', () => {
    mkdirSync(join(root, 'realdir'), { recursive: true })
    expect(resolveSafe('realdir/ok.ts')).toBe(join(root, 'realdir', 'ok.ts'))
  })
})

describe('writeProjectFile / readProjectFile', () => {
  it('round-trips content, creating parent directories', () => {
    writeProjectFile('deep/nested/dir/hello.txt', 'hi there')
    expect(existsSync(join(root, 'deep', 'nested', 'dir', 'hello.txt'))).toBe(true)
    expect(readProjectFile('deep/nested/dir/hello.txt')).toBe('hi there')
  })

  it('overwrites an existing file', () => {
    writeProjectFile('over.txt', 'first')
    writeProjectFile('over.txt', 'second')
    expect(readProjectFile('over.txt')).toBe('second')
  })

  it('refuses to write outside the sandbox', () => {
    expect(() => writeProjectFile('../evil.txt', 'nope')).toThrow(PathEscapeError)
    expect(existsSync(join(root, '..', 'evil.txt'))).toBe(false)
  })
})

describe('proposeWrite', () => {
  it('reports a new file: exists=false, empty old content, echoed new content', () => {
    const proposal = proposeWrite('brand-new.ts', 'export const x = 1')
    expect(proposal.exists).toBe(false)
    expect(proposal.oldContent).toBe('')
    expect(proposal.newContent).toBe('export const x = 1')
    // proposeWrite must NOT touch disk.
    expect(existsSync(join(root, 'brand-new.ts'))).toBe(false)
  })

  it('reports an existing file: exists=true with current content as old', () => {
    writeFileSync(join(root, 'existing.ts'), 'old body')
    const proposal = proposeWrite('existing.ts', 'new body')
    expect(proposal.exists).toBe(true)
    expect(proposal.oldContent).toBe('old body')
    expect(proposal.newContent).toBe('new body')
    // Unchanged on disk until an actual write.
    expect(readFileSync(join(root, 'existing.ts'), 'utf-8')).toBe('old body')
  })

  it('throws on a sandbox escape before reading anything', () => {
    expect(() => proposeWrite('../../secret.ts', 'x')).toThrow(PathEscapeError)
  })
})
