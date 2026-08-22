import type { PermissionMode, ToolKind } from '../../shared/types'

/** Whether a proposal is auto-approved by the mode or must be asked. */
export type PermissionOutcome = 'auto' | 'ask'

/**
 * The permission matrix. Governs whether a given tool op runs without asking:
 *
 * | mode         | write_file | run_command | mcp_call |
 * |--------------|------------|-------------|----------|
 * | `ask`        | ask        | ask         | ask      |
 * | `auto-edit`  | auto       | ask         | ask      |
 * | `autonomous` | auto       | auto        | auto     |
 *
 * `autonomous` is an explicit, opt-in, hands-free posture (requirement D): it
 * auto-approves everything so a build runs without prompts. Even an `auto`
 * outcome still surfaces a (flagged) tool-request + tool-result to the UI, and
 * every write/command stays sandbox-scoped — silent or unsandboxed side effects
 * are never allowed. `ask` and `auto-edit` still never auto-run commands.
 */
export function decideAuto(mode: PermissionMode, kind: ToolKind): PermissionOutcome {
  switch (mode) {
    case 'autonomous':
      // Hands-free: auto-approve edits, commands, AND mcp calls (still shown & sandboxed).
      return 'auto'
    case 'auto-edit':
      return kind === 'write_file' ? 'auto' : 'ask'
    case 'ask':
    default:
      return 'ask'
  }
}
