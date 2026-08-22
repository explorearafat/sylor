import { describe, expect, it } from 'vitest'
import { useChatStore } from './useChatStore'
import type { PersistedSession } from '@shared/types'

describe('useChatStore hydration', () => {
  it('reconciles id counters past the highest rehydrated msg/run id', () => {
    // Simulate loading a session that had msg-5, msg-8 and run-3.
    const loaded: PersistedSession = {
      session: {
        id: 'sess-test',
        title: 'Restored',
        projectRoot: '/test',
        projectId: null,
        createdAt: 0,
        updatedAt: 0,
        messageCount: 2
      },
      messages: [
        { id: 'msg-5', role: 'user', content: 'first' },
        { id: 'msg-8', role: 'assistant', content: 'second' }
      ],
      tools: [
        {
          id: 'tool-1',
          afterMessageId: 'msg-8',
          runId: 'run-3',
          auto: false,
          proposal: { id: 'tool-1', kind: 'run_command', command: 'ls' }
        }
      ],
      terminal: [],
      attachments: []
    }

    // Each read re-fetches getState() — the snapshot is replaced on every mutation.
    useChatStore.getState().applyLoaded(loaded)

    // The store should have 2 messages.
    expect(useChatStore.getState().messages).toHaveLength(2)
    expect(useChatStore.getState().messages[0].id).toBe('msg-5')
    expect(useChatStore.getState().messages[1].id).toBe('msg-8')

    // Now send a new message (which internally mints a new user + assistant id).
    // The new ids must be msg-9, msg-10 (not collide with msg-5/msg-8).
    useChatStore.getState().send('test')
    const after = useChatStore.getState().messages
    expect(after).toHaveLength(4) // 2 old + 2 new
    const newUserMsg = after[2]
    const newAssistantMsg = after[3]
    expect(newUserMsg.id).toMatch(/^msg-\d+$/)
    expect(newAssistantMsg.id).toMatch(/^msg-\d+$/)

    // Parse the numeric suffix to confirm it's > 8.
    const userNum = Number(newUserMsg.id.replace('msg-', ''))
    const assistantNum = Number(newAssistantMsg.id.replace('msg-', ''))
    expect(userNum).toBeGreaterThan(8)
    expect(assistantNum).toBeGreaterThan(8)

    // The runId should be > 3.
    const newRunId = useChatStore.getState().runId
    expect(newRunId).toMatch(/^run-\d+$/)
    const runNum = Number(newRunId?.replace('run-', '') ?? '0')
    expect(runNum).toBeGreaterThan(3)
  })
})
