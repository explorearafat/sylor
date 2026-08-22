import type { Theme } from '@shared/types'

/**
 * Maps the app's theme to a built-in Monaco theme id. Monaco ships `vs` (light)
 * and `vs-dark`; we key both the file editor and the inline diff cards off this
 * so they follow the warm-light / dark toggle instead of hardcoding `vs-dark`.
 * (A bespoke warm-tinted Monaco theme via `monaco.editor.defineTheme` can be
 * layered on later; `vs` is a clean, readable baseline for the light palette.)
 */
export function monacoThemeFor(theme: Theme): 'vs' | 'vs-dark' {
  return theme === 'dark' ? 'vs-dark' : 'vs'
}
