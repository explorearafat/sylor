import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { IPty } from '@lydell/node-pty'
import { __setPtyBackendForTest, createPty, killAllPtys, writePty } from '@main/terminal/pty'

/**
 * Deterministic unit tests for the interactive pty registry — specifically the
 * identity guard in `onExit` that stops a replaced session's delayed exit from
 * evicting its replacement (regression for a real orphaned-pty defect). Uses a
 * controllable fake backend because the real ConPTY does NOT deliver an exit
 * event for a *killed* session under the headless test runner (only a natural
 * process exit fires it), so the replace-then-old-session-exits race can't be
 * reproduced with a real pty here. Real end-to-end pty I/O and exit-code handling
 * is covered against an ACTUAL pty in `runner.test.ts`.
 */

interface FakePty {
  onData: (cb: (data: string) => void) => void
  onExit: (cb: (ev: { exitCode: number }) => void) => void
  write: (data: string) => void
  resize: (cols: number, rows: number) => void
  kill: () => void
  // Test controls / spies:
  writes: string[]
  killed: boolean
  fireData: (data: string) => void
  fireExit: (code: number) => void
}

function makeFakePty(): FakePty {
  let dataCb: (data: string) => void = () => {}
  let exitCb: (ev: { exitCode: number }) => void = () => {}
  const p: FakePty = {
    onData: (cb) => {
      dataCb = cb
    },
    onExit: (cb) => {
      exitCb = cb
    },
    write: (data) => {
      p.writes.push(data)
    },
    resize: () => {},
    kill: () => {
      p.killed = true
    },
    writes: [],
    killed: false,
    fireData: (data) => dataCb(data),
    fireExit: (code) => exitCb({ exitCode: code })
  }
  return p
}

/** A fake backend that records every pty it spawns so tests can drive them. */
let spawned: FakePty[]
const fakeBackend = {
  spawn: (): IPty => {
    const p = makeFakePty()
    spawned.push(p)
    return p as unknown as IPty
  }
}

beforeEach(() => {
  spawned = []
  __setPtyBackendForTest(fakeBackend)
})

afterEach(() => {
  killAllPtys()
  __setPtyBackendForTest(null)
})

describe('pty registry', () => {
  it('spawns a session and forwards its data to the handler', () => {
    const seen: string[] = []
    const err = createPty('t', 80, 24, { onData: (d) => seen.push(d), onExit: () => {} })
    expect(err).toBeNull()
    expect(spawned).toHaveLength(1)

    spawned[0].fireData('hello')
    expect(seen).toEqual(['hello'])
  })

  it('forwards a natural exit to the handler and de-registers the session', () => {
    let exited = false
    createPty('t', 80, 24, { onData: () => {}, onExit: () => (exited = true) })
    const [term] = spawned

    // A natural exit: the session is still the registered one, so the guard passes.
    term.fireExit(0)
    expect(exited).toBe(true)

    // Session was removed: further input is a no-op (nothing reaches the pty).
    writePty('t', 'ignored')
    expect(term.writes).toEqual([])
  })

  it('keeps the replacement reachable after the replaced session exits late', () => {
    // Session A on id 'slot'.
    let aExited = false
    createPty('slot', 80, 24, { onData: () => {}, onExit: () => (aExited = true) })

    // Replace it with B on the same id. createPty kills A first (deleting it from
    // the registry) but A's exit does NOT fire yet — that's the race.
    let bExited = false
    createPty('slot', 80, 24, { onData: () => {}, onExit: () => (bExited = true) })

    const [a, b] = spawned
    expect(a.killed).toBe(true) // replacing killed the old session

    // A's exit fires LATE, after B took the slot. Without the identity guard, A's
    // onExit would `sessions.delete('slot')` and evict B, orphaning the live pty.
    // The guard sees `sessions.get('slot') !== termA` and returns early instead.
    a.fireExit(1)
    expect(aExited).toBe(false) // suppressed: A was already replaced

    // Proof B survived and is still the registered session: input routes to B.
    writePty('slot', 'alive')
    expect(b.writes).toEqual(['alive'])
    expect(a.writes).toEqual([]) // nothing leaked to the dead session

    // B's own natural exit still forwards and de-registers normally.
    b.fireExit(0)
    expect(bExited).toBe(true)
    writePty('slot', 'gone')
    expect(b.writes).toEqual(['alive']) // no new write; B was removed
  })

  it('returns an error and spawns nothing when the backend is unavailable', () => {
    __setPtyBackendForTest(null)
    const err = createPty('x', 80, 24, { onData: () => {}, onExit: () => {} })
    expect(err).toBeTruthy()
    expect(spawned).toHaveLength(0)
  })
})
