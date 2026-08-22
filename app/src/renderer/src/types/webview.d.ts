/**
 * JSX + DOM typing for the Electron `<webview>` tag used by the live-preview panel.
 *
 * `<webview>` is a custom element Electron injects when `webviewTag: true` is set
 * (see window.ts) — it is not a standard HTML element, so React's JSX namespace
 * has no built-in definition for it. We declare only the handful of attributes and
 * imperative methods PreviewPanel actually touches. React 19 scopes the JSX
 * namespace inside the `react` module, so we augment it with `declare module`.
 */
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

/** Attributes we set on `<webview>` in JSX. */
interface WebviewHTMLAttributes<T> extends HTMLAttributes<T> {
  /** Localhost URL to load in the guest page. */
  src?: string
  /** Session partition; `preview` keeps the guest outside the strict app CSP. */
  partition?: string
  /** Present (as "true") to allow popups — we deny them and open externally. */
  allowpopups?: string
}

/** The subset of Electron's WebviewTag DOM API the panel calls imperatively. */
export interface WebviewElement extends HTMLElement {
  reload(): void
  loadURL(url: string): Promise<void>
  getURL(): string
  stop(): void
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      webview: DetailedHTMLProps<WebviewHTMLAttributes<WebviewElement>, WebviewElement>
    }
  }
}
