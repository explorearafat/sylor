import type { ChatMessage, IntentAnalysis, ProviderSettings } from '../../shared/types'
import { createProvider } from '../providers'

/** Keywords suggesting an edit/change request vs. a question. */
const EDIT_MARKERS = [
  'fix',
  'build',
  'write',
  'create',
  'add',
  'update',
  'edit',
  'refactor',
  'implement',
  'change',
  'install',
  'rename',
  'delete',
  'remove',
  'convert',
  'migrate',
  'test',
  'debug',
  'configure',
  'optimize'
]

const EXPLAIN_MARKERS = [
  'explain',
  'what is',
  'why',
  'how does',
  'how do',
  'difference',
  'meaning',
  'describe',
  'summarize'
]

/**
 * Greetings / social pleasantries that should get a plain conversational reply —
 * no project scan, no code. Matched against the whole prompt with a word
 * boundary (exact or leading-token) so short words like "hi" don't match inside
 * "hidden". An edit keyword anywhere in the prompt overrides this.
 */
const CHAT_MARKERS = [
  'hi',
  'hello',
  'hey',
  'yo',
  'sup',
  'hiya',
  'howdy',
  'good morning',
  'good afternoon',
  'good evening',
  'good night',
  'how are you',
  "how's it going",
  'how do you do',
  'thanks',
  'thank you',
  'thx',
  'ty',
  'cheers',
  'who are you',
  'what are you',
  'what can you do',
  'what do you do',
  'help',
  'ok',
  'okay',
  'cool',
  'nice',
  'great',
  'bye',
  'goodbye'
]

/**
 * True when the prompt is a greeting / social message: it leads with a chat
 * marker (as a whole word, optionally followed by punctuation or more words)
 * and carries no edit keyword. Kept deliberately conservative — anything that
 * smells like real work falls through to question/edit.
 */
function isChitChat(lower: string): boolean {
  if (!lower) return false
  if (EDIT_MARKERS.some((marker) => lower.includes(marker))) return false
  return CHAT_MARKERS.some((m) => {
    if (lower === m) return true
    // A leading marker followed by a word boundary (space or punctuation).
    return lower.startsWith(m) && /[\s,.!?]/.test(lower.charAt(m.length))
  })
}

/**
 * Heuristic intent classification used when the LLM is unavailable or the
 * prompt is too short to justify a round trip. Cheap and deterministic.
 */
export function classifyIntentHeuristic(prompt: string): IntentAnalysis {
  const lower = prompt.toLowerCase().trim()

  // Greetings / small talk get a conversational reply — never a scan or an edit.
  if (isChitChat(lower)) {
    return { kind: 'chat', summary: 'You want to chat with Sylor.', needsContext: false }
  }

  const isEdit =
    EDIT_MARKERS.some((marker) => lower.includes(marker)) &&
    !EXPLAIN_MARKERS.some((marker) => lower.includes(marker))

  const needsContext = isEdit

  return {
    kind: isEdit ? 'edit' : 'question',
    summary: isEdit
      ? `You want to make a change to the project (${lower.slice(0, 60)}…).`
      : `You want to know something about ${lower.slice(0, 60) || 'the project'}.`,
    needsContext
  }
}

/**
 * Classifies intent using the active provider (a cheap 1-turn completion).
 * Falls back to the heuristic on any failure so the chat never blocks on this.
 */
export async function classifyIntent(
  prompt: string,
  settings: ProviderSettings
): Promise<IntentAnalysis> {
  if (prompt.trim().length < 12) return classifyIntentHeuristic(prompt)

  const provider = createProvider(
    settings.activeProvider,
    settings.activeProvider === 'ollama' ? settings.ollama : settings.gateway
  )

  const system =
    "You are Sylor's intent analyzer. Classify the user's latest message into exactly one kind: " +
    '"chat" (a greeting, small talk, or social message needing no project work), ' +
    '"question" (they want an explanation or answer about the code/project), or ' +
    '"edit" (they want you to change, build, run, or fix something). ' +
    'Respond with ONLY valid JSON: ' +
    '{"kind":"chat"|"question"|"edit","summary":"<short one-sentence restatement of what the user wants>","needsContext":true|false}. ' +
    'Set needsContext true only when answering requires reading the project files.'
  const messages: ChatMessage[] = [
    { role: 'system', content: system },
    { role: 'user', content: prompt }
  ]

  try {
    const raw = await provider.getCompletion(settings.modelId, messages)
    const parsed = parseIntentJson(raw)
    if (parsed) return parsed
  } catch {
    // Fall through to the heuristic on any provider error.
  }
  return classifyIntentHeuristic(prompt)
}

/** Tolerantly parses the model's JSON, stripping any markdown fence noise. */
function parseIntentJson(raw: string): IntentAnalysis | null {
  try {
    const start = raw.indexOf('{')
    const end = raw.lastIndexOf('}')
    if (start === -1 || end === -1) return null
    const obj = JSON.parse(raw.slice(start, end + 1)) as Partial<IntentAnalysis>
    if (obj.kind !== 'chat' && obj.kind !== 'question' && obj.kind !== 'edit') return null
    return {
      kind: obj.kind,
      summary:
        typeof obj.summary === 'string' && obj.summary.trim()
          ? obj.summary.trim()
          : classifyIntentHeuristic('').summary,
      needsContext: typeof obj.needsContext === 'boolean' ? obj.needsContext : obj.kind === 'edit'
    }
  } catch {
    return null
  }
}
