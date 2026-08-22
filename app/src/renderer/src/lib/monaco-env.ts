/**
 * Monaco offline wiring. This module MUST be imported before any <Editor /> mounts
 * (it is the first import in main.tsx). It does two things:
 *   1. Registers Vite-bundled web workers on self.MonacoEnvironment so Monaco never
 *      tries to fetch workers from a CDN.
 *   2. Points @monaco-editor/react at the locally-installed monaco-editor package via
 *      loader.config, disabling its default jsDelivr download.
 * Together these make the editor work fully offline, in dev (http) and packaged (file://).
 */
import { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
// monaco-editor 0.5x ships an `exports` map whose wildcard prepends `esm/vs/`,
// so worker subpaths are written WITHOUT that prefix (and WITH `.js`) to avoid
// double-nesting to `esm/vs/esm/vs/...`. The `?worker` suffix makes Vite bundle
// each as a dedicated web worker for fully-offline operation.
import editorWorker from 'monaco-editor/editor/editor.worker.js?worker'
import jsonWorker from 'monaco-editor/language/json/json.worker.js?worker'
import cssWorker from 'monaco-editor/language/css/css.worker.js?worker'
import htmlWorker from 'monaco-editor/language/html/html.worker.js?worker'
import tsWorker from 'monaco-editor/language/typescript/ts.worker.js?worker'

self.MonacoEnvironment = {
  getWorker(_workerId: string, label: string) {
    switch (label) {
      case 'json':
        return new jsonWorker()
      case 'css':
      case 'scss':
      case 'less':
        return new cssWorker()
      case 'html':
      case 'handlebars':
      case 'razor':
        return new htmlWorker()
      case 'typescript':
      case 'javascript':
        return new tsWorker()
      default:
        return new editorWorker()
    }
  }
}

// The line that disables the CDN loader and uses the local package instead.
loader.config({ monaco })
