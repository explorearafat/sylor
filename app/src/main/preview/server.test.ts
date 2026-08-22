import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { contextManager } from '@main/context/manager'
import { DEV_SERVER_RE, looksLikeDevServer, startStatic, stopPreview } from '@main/preview/server'

/**
 * The preview back-end resolves everything relative to `contextManager.getRoot()`
 * (via the same sandbox check the file tools use), so each test points the
 * singleton at a fresh temp dir and tears the server down afterward. The
 * dev-server detection tests are pure and need no root.
 */
let root: string
let originalRoot: string

beforeEach(() => {
  originalRoot = contextManager.getRoot()
  root = mkdtempSync(join(tmpdir(), 'sylor-preview-'))
  contextManager.setRoot(root)
})

afterEach(() => {
  // Free the port + file watcher before the next case; then restore the root.
  stopPreview()
  contextManager.setRoot(originalRoot)
  rmSync(root, { recursive: true, force: true })
})

describe('looksLikeDevServer (dev-server command detection)', () => {
  it('matches long-running dev servers that never exit', () => {
    for (const command of [
      'npm run dev',
      'npm start',
      'pnpm dev',
      'yarn dev',
      'bun run dev',
      'npm run serve',
      'npm run preview',
      'vite',
      'npx vite',
      'vite preview',
      'next dev',
      'next start',
      'astro dev'
    ]) {
      expect(looksLikeDevServer(command), command).toBe(true)
    }
  })

  it('does NOT match one-shot commands, including framework builds', () => {
    // `vite build` / `next build` are one-shot: they must run through the normal
    // runner, not startDev (which would wait for a dev URL that never prints).
    for (const command of [
      'npm run build',
      'vite build',
      'next build',
      'astro build',
      'npm test',
      'npm install',
      'git status',
      'ls -la',
      'tsc --noEmit'
    ]) {
      expect(looksLikeDevServer(command), command).toBe(false)
    }
  })

  it('is stateless across calls (no global-flag lastIndex bug)', () => {
    // A `/g` regex would alternate true/false on repeated .test() calls; DEV_SERVER_RE
    // must not, since the engine tests each proposed command independently.
    expect(DEV_SERVER_RE.test('npm run dev')).toBe(true)
    expect(DEV_SERVER_RE.test('npm run dev')).toBe(true)
  })
})

describe('startStatic (built-output entry resolution)', () => {
  it('serves nothing when no built HTML exists (silent no-op)', async () => {
    const result = await startStatic()
    expect(result.ok).toBe(false)
    expect(result.error).toBeTruthy()
    expect(result.url).toBeUndefined()
  })

  it('auto-serves dist/index.html when only a built output is present', async () => {
    mkdirSync(join(root, 'dist'), { recursive: true })
    writeFileSync(join(root, 'dist', 'index.html'), '<!doctype html><title>built</title>')

    const result = await startStatic()
    expect(result.ok).toBe(true)
    expect(result.url).toMatch(/^http:\/\/127\.0\.0\.1:\d+\//)
    expect(result.url).toMatch(/\/dist\/index\.html$/)
  })

  it('prefers a root index.html over a built output', async () => {
    writeFileSync(join(root, 'index.html'), '<!doctype html><title>root</title>')
    mkdirSync(join(root, 'dist'), { recursive: true })
    writeFileSync(join(root, 'dist', 'index.html'), '<!doctype html><title>built</title>')

    const result = await startStatic()
    expect(result.ok).toBe(true)
    expect(result.url).toMatch(/\/index\.html$/)
    expect(result.url).not.toMatch(/\/dist\//)
  })

  it('serves an explicit entry verbatim', async () => {
    writeFileSync(join(root, 'index.html'), '<!doctype html>')
    const result = await startStatic('nested/page.html')
    expect(result.ok).toBe(true)
    expect(result.url).toMatch(/\/nested\/page\.html$/)
  })
})
