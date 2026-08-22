import { describe, expect, it, vi } from 'vitest'
import { ToolStreamParser, parseToolBlock, type ParsedTool } from '@main/workflow/toolStream'

// Fence literals (single-quoted so backticks are literal, \n is a real newline).
const OPEN = '```sylor-tool\n'
const CLOSE = '\n```\n'

/** Wraps a tool payload object in a full sylor-tool block. */
function block(payload: unknown): string {
  return OPEN + JSON.stringify(payload) + CLOSE
}

/** Feeds a whole string through a fresh parser and returns emitted prose + tools. */
function run(input: string): { prose: string; tools: ParsedTool[] } {
  const parser = new ToolStreamParser()
  const prose = parser.push(input) + parser.flush()
  return { prose, tools: parser.tools }
}

describe('parseToolBlock', () => {
  it('parses a valid write_file block', () => {
    expect(parseToolBlock('{ "tool": "write_file", "path": "a.ts", "content": "x" }')).toEqual({
      tool: 'write_file',
      path: 'a.ts',
      content: 'x'
    })
  })

  it('parses a valid run_command block', () => {
    expect(parseToolBlock('{ "tool": "run_command", "command": "npm test" }')).toEqual({
      tool: 'run_command',
      command: 'npm test'
    })
  })

  it('rejects malformed JSON', () => {
    expect(parseToolBlock('{ not json')).toBeNull()
  })

  it('rejects a write_file missing content', () => {
    expect(parseToolBlock('{ "tool": "write_file", "path": "a.ts" }')).toBeNull()
  })

  it('rejects a write_file with an empty path', () => {
    expect(parseToolBlock('{ "tool": "write_file", "path": "  ", "content": "x" }')).toBeNull()
  })

  it('rejects a run_command with an empty command', () => {
    expect(parseToolBlock('{ "tool": "run_command", "command": "" }')).toBeNull()
  })

  it('rejects an unknown tool', () => {
    expect(parseToolBlock('{ "tool": "delete_everything" }')).toBeNull()
  })

  it('parses a valid mcp_call block with arguments', () => {
    expect(
      parseToolBlock(
        '{ "tool": "mcp_call", "server": "fs", "name": "read", "arguments": { "path": "a.txt" } }'
      )
    ).toEqual({ tool: 'mcp_call', server: 'fs', name: 'read', arguments: { path: 'a.txt' } })
  })

  it('defaults mcp_call arguments to {} when omitted or not a plain object', () => {
    expect(parseToolBlock('{ "tool": "mcp_call", "server": "fs", "name": "read" }')).toEqual({
      tool: 'mcp_call',
      server: 'fs',
      name: 'read',
      arguments: {}
    })
    // A non-object `arguments` (array/string/null) is treated as "none", not rejected.
    expect(
      parseToolBlock('{ "tool": "mcp_call", "server": "fs", "name": "read", "arguments": [1, 2] }')
    ).toEqual({ tool: 'mcp_call', server: 'fs', name: 'read', arguments: {} })
  })

  it('rejects an mcp_call missing (or blank) server or name', () => {
    expect(parseToolBlock('{ "tool": "mcp_call", "name": "read" }')).toBeNull()
    expect(parseToolBlock('{ "tool": "mcp_call", "server": "fs" }')).toBeNull()
    expect(parseToolBlock('{ "tool": "mcp_call", "server": "  ", "name": "read" }')).toBeNull()
  })

  it('parses a valid use_skill block', () => {
    expect(parseToolBlock('{ "tool": "use_skill", "name": "pdf-tools" }')).toEqual({
      tool: 'use_skill',
      name: 'pdf-tools'
    })
  })

  it('rejects a use_skill missing (or blank) name', () => {
    expect(parseToolBlock('{ "tool": "use_skill" }')).toBeNull()
    expect(parseToolBlock('{ "tool": "use_skill", "name": "   " }')).toBeNull()
  })

  it('parses a valid spawn_agent block', () => {
    expect(
      parseToolBlock('{ "tool": "spawn_agent", "role": "builder", "task": "scaffold the app" }')
    ).toEqual({ tool: 'spawn_agent', role: 'builder', task: 'scaffold the app' })
  })

  it('rejects a spawn_agent with an un-spawnable role or blank/missing task', () => {
    // `lead` is the run itself — never spawnable.
    expect(parseToolBlock('{ "tool": "spawn_agent", "role": "lead", "task": "x" }')).toBeNull()
    expect(parseToolBlock('{ "tool": "spawn_agent", "role": "nope", "task": "x" }')).toBeNull()
    expect(parseToolBlock('{ "tool": "spawn_agent", "role": "builder", "task": "  " }')).toBeNull()
    expect(parseToolBlock('{ "tool": "spawn_agent", "role": "builder" }')).toBeNull()
  })
})

describe('ToolStreamParser', () => {
  it('passes prose through untouched when there are no blocks', () => {
    const { prose, tools } = run('Just a normal explanation with no tools.')
    expect(prose).toBe('Just a normal explanation with no tools.')
    expect(tools).toHaveLength(0)
  })

  it('extracts a single block and separates surrounding prose', () => {
    const { prose, tools } = run(
      'Let me create that file.\n' +
        block({ tool: 'write_file', path: 'src/x.ts', content: 'export const x = 1' }) +
        'All set.'
    )
    expect(prose).toBe('Let me create that file.\nAll set.')
    expect(tools).toEqual([{ tool: 'write_file', path: 'src/x.ts', content: 'export const x = 1' }])
  })

  it('extracts multiple blocks in stream order', () => {
    const { tools } = run(
      block({ tool: 'write_file', path: 'a.ts', content: 'a' }) +
        'then\n' +
        block({ tool: 'run_command', command: 'npm test' })
    )
    expect(tools).toEqual([
      { tool: 'write_file', path: 'a.ts', content: 'a' },
      { tool: 'run_command', command: 'npm test' }
    ])
  })

  it('extracts an mcp_call block and separates surrounding prose', () => {
    const { prose, tools } = run(
      'Calling the tool.\n' +
        block({ tool: 'mcp_call', server: 'fs', name: 'read', arguments: { path: 'a.txt' } }) +
        'Done.'
    )
    expect(prose).toBe('Calling the tool.\nDone.')
    expect(tools).toEqual([
      { tool: 'mcp_call', server: 'fs', name: 'read', arguments: { path: 'a.txt' } }
    ])
  })

  it('extracts a use_skill block and separates surrounding prose', () => {
    const { prose, tools } = run(
      'Loading the skill.\n' + block({ tool: 'use_skill', name: 'pdf-tools' }) + 'Done.'
    )
    expect(prose).toBe('Loading the skill.\nDone.')
    expect(tools).toEqual([{ tool: 'use_skill', name: 'pdf-tools' }])
  })

  it('handles a fence marker split across chunks', () => {
    const parser = new ToolStreamParser()
    let prose = ''
    // The open fence is split mid-marker; the parser must not leak "```sylor".
    prose += parser.push('Here goes ```sylor')
    prose += parser.push('-tool\n{ "tool": "run_command", "command": "ls" }\n``')
    prose += parser.push('`\nDone')
    prose += parser.flush()
    expect(prose).toBe('Here goes Done')
    expect(parser.tools).toEqual([{ tool: 'run_command', command: 'ls' }])
  })

  it('does not treat backticks inside file content as a closing fence', () => {
    // Content holds a Markdown code fence; JSON encodes its newlines as \n, so no
    // raw-newline+``` appears until the real close fence.
    const content = '# Readme\n```\nconst y = 2\n```\n'
    const { prose, tools } = run(block({ tool: 'write_file', path: 'README.md', content }))
    expect(prose).toBe('')
    expect(tools).toEqual([{ tool: 'write_file', path: 'README.md', content }])
  })

  it('recognizes a closing fence with trailing whitespace and keeps following prose', () => {
    // A fence like "```  \n" (trailing spaces before the newline) must close the
    // block — otherwise the op AND all trailing prose get swallowed into a failed
    // JSON parse. This matches what flush() already tolerates.
    const { prose, tools } = run(
      'Before.\n' + OPEN + '{ "tool": "run_command", "command": "ls" }' + '\n```  \n' + 'After.'
    )
    expect(tools).toEqual([{ tool: 'run_command', command: 'ls' }])
    expect(prose).toBe('Before.\nAfter.')
  })

  it('does not leak a stray newline when a CRLF close fence splits at the CR', () => {
    const parser = new ToolStreamParser()
    let prose = ''
    // Chunk boundary falls exactly between '\r' and '\n' of the close fence.
    prose += parser.push(OPEN + '{ "tool": "run_command", "command": "ls" }' + '\n```\r')
    prose += parser.push('\nDone')
    prose += parser.flush()
    expect(parser.tools).toEqual([{ tool: 'run_command', command: 'ls' }])
    // The '\n' after '\r' is consumed by the fence, not leaked into the prose.
    expect(prose).toBe('Done')
  })

  it('drops a malformed block with a warning instead of throwing', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { prose, tools } = run('Before\n' + OPEN + 'this is not json' + CLOSE + 'After')
    // Prose before/after the block is preserved verbatim (incl. the leading newline).
    expect(prose).toBe('Before\nAfter')
    expect(tools).toHaveLength(0)
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })

  it('salvages a trailing block whose close fence never arrived', () => {
    const parser = new ToolStreamParser()
    const emitted = parser.push(
      'Editing…\n' + OPEN + '{ "tool": "write_file", "path": "z.ts", "content": "z" }'
    )
    // In-block bytes are suppressed while streaming.
    expect(emitted).toBe('Editing…\n')
    // flush() salvages the unterminated block.
    parser.flush()
    expect(parser.tools).toEqual([{ tool: 'write_file', path: 'z.ts', content: 'z' }])
  })
})
