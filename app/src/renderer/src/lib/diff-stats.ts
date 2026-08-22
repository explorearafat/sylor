/**
 * Cheap, bounded line-diff statistics for the composer's "+added / −removed"
 * context indicator. These are derived from the *real* `write_file` proposals in
 * a conversation (old vs new file contents), so the numbers reflect actual edits
 * Sylor has applied — not a made-up figure.
 */

/** Line counts changed by a single edit. */
export interface DiffStat {
  added: number
  removed: number
}

/** Above this line count on either side, fall back to a cheap approximation so
 *  the diff never blocks the UI thread on a pathologically large file. */
const LCS_LINE_CAP = 4000

/**
 * Added/removed line counts between two texts via a longest-common-subsequence
 * over lines (the same model `git diff --stat` uses). Falls back to a set-based
 * approximation when either side exceeds {@link LCS_LINE_CAP} lines.
 */
export function lineDiffStats(oldText: string, newText: string): DiffStat {
  if (oldText === newText) return { added: 0, removed: 0 }
  const a = oldText.length === 0 ? [] : oldText.split('\n')
  const b = newText.length === 0 ? [] : newText.split('\n')
  if (a.length === 0) return { added: b.length, removed: 0 }
  if (b.length === 0) return { added: 0, removed: a.length }

  if (a.length > LCS_LINE_CAP || b.length > LCS_LINE_CAP) {
    return approxDiffStats(a, b)
  }

  // LCS length via a rolling 1-D DP row (O(a·b) time, O(b) space).
  const n = a.length
  const m = b.length
  let prev = new Array<number>(m + 1).fill(0)
  let curr = new Array<number>(m + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      curr[j] = a[i - 1] === b[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], curr[j - 1])
    }
    const tmp = prev
    prev = curr
    curr = tmp
  }
  const common = prev[m]
  return { added: m - common, removed: n - common }
}

/**
 * Multiset-based approximation used for very large files: counts lines the new
 * text has beyond the old (added) and lines the old had beyond the new (removed),
 * ignoring order. Cheaper than LCS and good enough for a headline stat.
 */
function approxDiffStats(a: string[], b: string[]): DiffStat {
  const counts = new Map<string, number>()
  for (const line of a) counts.set(line, (counts.get(line) ?? 0) + 1)
  let added = 0
  for (const line of b) {
    const c = counts.get(line) ?? 0
    if (c > 0) counts.set(line, c - 1)
    else added++
  }
  let removed = 0
  for (const c of counts.values()) removed += c
  return { added, removed }
}

/**
 * Rough token estimate for a body of text. Uses the common ~4-chars-per-token
 * heuristic; always presented with a `~` so it's never mistaken for an exact
 * provider-reported count.
 */
export function estimateTokens(text: string): number {
  if (!text) return 0
  return Math.ceil(text.length / 4)
}

/** Compact human-readable count: 1234 → "1.2k", 980 → "980". */
export function formatCount(n: number): string {
  if (n < 1000) return String(n)
  return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}k`
}
