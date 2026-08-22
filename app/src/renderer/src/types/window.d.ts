import type { SylorApi } from '@shared/types'
import 'react'

declare global {
  interface Window {
    sylor: SylorApi
  }
}

// Allow the Electron-only `-webkit-app-region` value in inline styles without casts.
declare module 'react' {
  interface CSSProperties {
    WebkitAppRegion?: 'drag' | 'no-drag'
  }
}

export {}
