import { describe, expect, it } from 'vitest'
import type { PermissionMode, ToolKind } from '@shared/types'
import { decideAuto } from '@main/workflow/permission'

/**
 * The full permission matrix. `auto` = runs without asking (but still surfaced
 * to the UI); `ask` = pauses for an explicit user decision.
 *
 * | mode         | write_file | run_command | mcp_call |
 * |--------------|------------|-------------|----------|
 * | `ask`        | ask        | ask         | ask      |
 * | `auto-edit`  | auto       | ask         | ask      |
 * | `autonomous` | auto       | auto        | auto     |
 */
const cases: Array<[PermissionMode, ToolKind, 'auto' | 'ask']> = [
  ['ask', 'write_file', 'ask'],
  ['ask', 'run_command', 'ask'],
  ['ask', 'mcp_call', 'ask'],
  ['auto-edit', 'write_file', 'auto'],
  ['auto-edit', 'run_command', 'ask'],
  ['auto-edit', 'mcp_call', 'ask'],
  ['autonomous', 'write_file', 'auto'],
  ['autonomous', 'run_command', 'auto'],
  ['autonomous', 'mcp_call', 'auto']
]

describe('decideAuto (permission matrix)', () => {
  it.each(cases)('mode=%s kind=%s → %s', (mode, kind, expected) => {
    expect(decideAuto(mode, kind)).toBe(expected)
  })
})
