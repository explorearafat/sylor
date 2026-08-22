import { describe, expect, it, vi } from 'vitest'

// settings.ts imports `app` from 'electron'; the real package's entry resolves to
// a binary path (and can even trigger a download on import), so we stub it. Only
// `normalise` is under test here and it never touches `app`, so a minimal shim is
// enough to satisfy the import.
vi.mock('electron', () => ({ app: { getPath: () => '/tmp/sylor-test' } }))

import { normalise } from '@main/settings'
import { DEFAULT_PROVIDER_SETTINGS } from '@shared/defaults'

describe('normalise — workspaceRoot (requirement A)', () => {
  it('keeps a non-empty workspaceRoot string', () => {
    const out = normalise({ ui: { workspaceRoot: 'C:\\Users\\me\\proj' } })
    expect(out.ui.workspaceRoot).toBe('C:\\Users\\me\\proj')
  })

  it('drops a blank or whitespace-only workspaceRoot (Code mode stays gated)', () => {
    expect(normalise({ ui: { workspaceRoot: '' } }).ui.workspaceRoot).toBeUndefined()
    expect(normalise({ ui: { workspaceRoot: '   ' } }).ui.workspaceRoot).toBeUndefined()
  })

  it('drops a non-string workspaceRoot', () => {
    expect(normalise({ ui: { workspaceRoot: 42 } }).ui.workspaceRoot).toBeUndefined()
    expect(normalise({ ui: { workspaceRoot: null } }).ui.workspaceRoot).toBeUndefined()
  })

  it('omits workspaceRoot entirely when absent (not persisted as undefined)', () => {
    const out = normalise({ ui: {} })
    expect('workspaceRoot' in out.ui).toBe(false)
  })

  it('preserves the other ui defaults alongside a chosen workspaceRoot', () => {
    const out = normalise({ ui: { workspaceRoot: '/work' } })
    expect(out.ui).toMatchObject({
      theme: DEFAULT_PROVIDER_SETTINGS.ui.theme,
      effort: DEFAULT_PROVIDER_SETTINGS.ui.effort,
      planFirst: DEFAULT_PROVIDER_SETTINGS.ui.planFirst,
      mode: DEFAULT_PROVIDER_SETTINGS.ui.mode,
      workspaceRoot: '/work'
    })
  })
})
