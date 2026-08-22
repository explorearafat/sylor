import { describe, it, expect, vi } from 'vitest'
import type { Provider } from '@main/providers'
import type { ProviderSettings } from '@shared/types'
import { DEFAULT_PROVIDER_SETTINGS } from '@shared/defaults'

// Mock the provider factory so classifyIntent's LLM path is fully controllable.
const getCompletion = vi.fn<Provider['getCompletion']>()
vi.mock('@main/providers', () => ({
  createProvider: (): Provider =>
    ({
      getCompletion,
      listModels: vi.fn(),
      testConnection: vi.fn(),
      streamCompletion: vi.fn()
    }) as unknown as Provider
}))

// Imported after the mock is registered.
const { classifyIntent, classifyIntentHeuristic } = await import('@main/workflow/intent')

const settings: ProviderSettings = DEFAULT_PROVIDER_SETTINGS

describe('classifyIntentHeuristic', () => {
  it('classifies an action request as an edit that needs context', () => {
    const result = classifyIntentHeuristic('Add a logout button to the top nav')
    expect(result.kind).toBe('edit')
    expect(result.needsContext).toBe(true)
  })

  it('classifies a plain question as a question that needs no context', () => {
    const result = classifyIntentHeuristic('What is the difference between props and state?')
    expect(result.kind).toBe('question')
    expect(result.needsContext).toBe(false)
  })

  it('treats an explain-flavoured request as a question even with an edit keyword', () => {
    // "explain" (EXPLAIN_MARKER) suppresses the "add"/"build" edit signal.
    const result = classifyIntentHeuristic('Explain how the build step adds the bundle')
    expect(result.kind).toBe('question')
  })

  it('classifies a bare greeting as chat that needs no context', () => {
    for (const greeting of ['hi', 'Hello', 'hey there', 'thanks!', 'Good morning', 'ok']) {
      const result = classifyIntentHeuristic(greeting)
      expect(result.kind, `"${greeting}" should be chat`).toBe('chat')
      expect(result.needsContext).toBe(false)
    }
  })

  it('does not mistake a word that merely starts with a greeting for chat', () => {
    // "hidden" starts with "hi" but is not a greeting (no word boundary).
    expect(classifyIntentHeuristic('hidden files in the tree').kind).toBe('question')
  })

  it('lets an edit keyword override a leading greeting', () => {
    // "hey, add a button" is real work despite the greeting.
    expect(classifyIntentHeuristic('hey, add a logout button').kind).toBe('edit')
  })
})

describe('classifyIntent', () => {
  it('short-circuits to the heuristic for very short prompts (no LLM call)', async () => {
    // Order-independent: assert no *new* provider call happens for a short prompt.
    const before = getCompletion.mock.calls.length
    const result = await classifyIntent('fix it', settings)
    expect(result.kind).toBe('edit')
    expect(getCompletion.mock.calls.length).toBe(before)
  })

  it('short-circuits to the heuristic for a confident edit prompt (no LLM call)', async () => {
    // A clear edit marker ("add") with no explain marker — the heuristic is
    // confident, so no round-trip is spent classifying it.
    const before = getCompletion.mock.calls.length
    const result = await classifyIntent('Please add a dark mode toggle to settings', settings)
    expect(result.kind).toBe('edit')
    expect(result.needsContext).toBe(true)
    expect(getCompletion.mock.calls.length).toBe(before)
  })

  it('short-circuits to the heuristic for a confident question prompt (no LLM call)', async () => {
    // "how does" is a clear explain marker — classified without the LLM.
    const before = getCompletion.mock.calls.length
    const result = await classifyIntent('How does the routing layer work here?', settings)
    expect(result.kind).toBe('question')
    expect(getCompletion.mock.calls.length).toBe(before)
  })

  it('parses valid JSON returned by the model for an ambiguous prompt', async () => {
    getCompletion.mockResolvedValue(
      '{"kind":"edit","summary":"Add a dark mode toggle","needsContext":true}'
    )
    // No edit/explain/chat markers → ambiguous → the LLM decides.
    const result = await classifyIntent('The settings screen could feel more polished', settings)
    expect(result).toEqual({
      kind: 'edit',
      summary: 'Add a dark mode toggle',
      needsContext: true
    })
  })

  it('tolerates markdown fences around the JSON', async () => {
    getCompletion.mockResolvedValue(
      'Sure!\n```json\n{"kind":"question","summary":"Understand routing","needsContext":false}\n```'
    )
    const result = await classifyIntent('I keep getting lost in the routing layer', settings)
    expect(result.kind).toBe('question')
    expect(result.summary).toBe('Understand routing')
  })

  it('parses a chat classification from the model', async () => {
    getCompletion.mockResolvedValue(
      '{"kind":"chat","summary":"You want to say hello","needsContext":false}'
    )
    const result = await classifyIntent('Sylor, I appreciate the help so far', settings)
    expect(result.kind).toBe('chat')
    expect(result.needsContext).toBe(false)
  })

  it('falls back to the heuristic when the model returns unparseable output', async () => {
    getCompletion.mockResolvedValue('I cannot answer that.')
    // Ambiguous prompt → LLM path → unparseable → heuristic fallback (question).
    const result = await classifyIntent('The provider abstraction layer bugs me', settings)
    expect(result.kind).toBe('question')
  })

  it('falls back to the heuristic when the provider throws', async () => {
    getCompletion.mockImplementationOnce(() => {
      throw new Error('network down')
    })
    const result = await classifyIntent('What does the workflow engine do?', settings)
    expect(result.kind).toBe('question')
  })
})
