import { beforeEach, describe, expect, it, vi } from 'vitest'

// `node:fs` is mocked so loadMcpConfigs can be exercised without touching real
// files. `fsState` is hoisted (a vi.mock factory runs before top-level `let`s
// initialize), letting each test stage a path→contents map; an unstaged path
// throws, which the loader swallows into {} — exactly like a missing file. A
// `default` export is provided alongside the named one to satisfy Vitest's ESM
// interop (it probes for a default even though config.ts imports only the named).
const { fsState } = vi.hoisted(() => ({ fsState: { files: {} as Record<string, string> } }))
vi.mock('node:fs', () => {
  const readFileSync = (path: string): string => {
    const hit = fsState.files[path]
    if (hit === undefined) throw new Error(`ENOENT: ${path}`)
    return hit
  }
  return { readFileSync, default: { readFileSync } }
})

import {
  globalMcpConfigPath,
  loadMcpConfigs,
  parseMcpConfig,
  projectMcpConfigPath,
  transportOf
} from '@main/mcp/config'

describe('parseMcpConfig', () => {
  it('parses a stdio server (command + args + env)', () => {
    const out = parseMcpConfig({
      mcpServers: {
        fs: { command: 'npx', args: ['-y', 'server-filesystem', '.'], env: { TOKEN: 'x' } }
      }
    })
    expect(out).toEqual({
      fs: { command: 'npx', args: ['-y', 'server-filesystem', '.'], env: { TOKEN: 'x' } }
    })
  })

  it('parses a remote http server (url + headers)', () => {
    const out = parseMcpConfig({
      mcpServers: { remote: { url: 'https://e.com/mcp', headers: { Authorization: 'Bearer t' } } }
    })
    expect(out).toEqual({
      remote: { url: 'https://e.com/mcp', headers: { Authorization: 'Bearer t' } }
    })
  })

  it('treats a config carrying both url and command as remote (url wins)', () => {
    const out = parseMcpConfig({ mcpServers: { x: { url: 'https://e.com', command: 'npx' } } })
    expect(out.x).toEqual({ url: 'https://e.com' })
  })

  it('drops non-string args, and omits args entirely when none remain', () => {
    const kept = parseMcpConfig({ mcpServers: { a: { command: 'x', args: [1, 'ok', null] } } })
    expect(kept.a).toEqual({ command: 'x', args: ['ok'] })
    const none = parseMcpConfig({ mcpServers: { b: { command: 'x', args: [1, 2] } } })
    expect(none.b).toEqual({ command: 'x' })
  })

  it('omits env when it holds no string values', () => {
    const out = parseMcpConfig({ mcpServers: { a: { command: 'x', env: { N: 5 } } } })
    expect(out.a).toEqual({ command: 'x' })
  })

  it('drops invalid entries (no command/url) and blank names', () => {
    const out = parseMcpConfig({
      mcpServers: { good: { command: 'x' }, bad: { foo: 1 }, '   ': { command: 'y' } }
    })
    expect(Object.keys(out)).toEqual(['good'])
  })

  it('returns {} for non-object input or a missing/invalid mcpServers map', () => {
    expect(parseMcpConfig(null)).toEqual({})
    expect(parseMcpConfig('nope')).toEqual({})
    expect(parseMcpConfig({})).toEqual({})
    expect(parseMcpConfig({ mcpServers: 'x' })).toEqual({})
  })

  it('never throws on garbage entries', () => {
    expect(() => parseMcpConfig({ mcpServers: { a: 42, b: [], c: null } })).not.toThrow()
    expect(parseMcpConfig({ mcpServers: { a: 42, b: [], c: null } })).toEqual({})
  })
})

describe('transportOf', () => {
  it('classifies stdio vs http by shape', () => {
    expect(transportOf({ command: 'npx' })).toBe('stdio')
    expect(transportOf({ url: 'https://e.com' })).toBe('http')
  })
})

describe('config paths', () => {
  it('derive from ~/.sylor and <root>/.sylor', () => {
    // Normalize separators so the assertion holds on Windows and POSIX alike.
    expect(globalMcpConfigPath().replace(/\\/g, '/')).toMatch(/\.sylor\/mcp\.json$/)
    expect(projectMcpConfigPath('/proj').replace(/\\/g, '/')).toBe('/proj/.sylor/mcp.json')
  })
})

describe('loadMcpConfigs', () => {
  beforeEach(() => {
    fsState.files = {}
  })

  it('merges global + project, with project shadowing a same-named global server', () => {
    fsState.files = {
      [globalMcpConfigPath()]: JSON.stringify({
        mcpServers: { g: { command: 'g' }, shared: { command: 'from-global' } }
      }),
      [projectMcpConfigPath('/proj')]: JSON.stringify({
        mcpServers: { p: { url: 'https://e.com' }, shared: { command: 'from-project' } }
      })
    }
    const byName = Object.fromEntries(loadMcpConfigs('/proj').map((s) => [s.name, s]))
    expect(byName.g.source).toBe('global')
    expect(byName.p.source).toBe('project')
    expect(byName.shared.source).toBe('project')
    expect(byName.shared.config).toEqual({ command: 'from-project' })
  })

  it('ignores the project file when projectRoot is null', () => {
    fsState.files = {
      [globalMcpConfigPath()]: JSON.stringify({ mcpServers: { g: { command: 'g' } } })
    }
    expect(loadMcpConfigs(null).map((s) => s.name)).toEqual(['g'])
  })

  it('yields [] when no config files exist (missing files are swallowed)', () => {
    expect(loadMcpConfigs('/proj')).toEqual([])
  })

  it('yields [] when a config file is malformed JSON', () => {
    fsState.files = { [globalMcpConfigPath()]: '{ not json' }
    expect(loadMcpConfigs(null)).toEqual([])
  })
})
