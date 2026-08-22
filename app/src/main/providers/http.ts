export class TimeoutError extends Error {
  constructor(ms: number) {
    super(`Request timed out after ${ms}ms`)
    this.name = 'TimeoutError'
  }
}
export function toErrorMessage(err: unknown): string {
  if (err instanceof TimeoutError) return err.message
  if (err instanceof Error) {
    const cause = (err as { cause?: { code?: string } }).cause
    if (cause?.code === 'ECONNREFUSED') return 'Connection refused — is the server running?'
    if (cause?.code === 'ENOTFOUND') return 'Host not found — check the Base URL.'
    if (cause?.code === 'ECONNRESET') return 'Connection reset by the server.'
    return err.message
  }
  return String(err)
}
export function normaliseBaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, '')
}

interface FetchOptions {
  method?: 'GET' | 'POST'
  headers?: Record<string, string>
  body?: unknown
  timeoutMs?: number
  signal?: AbortSignal
}
export async function httpFetch(url: string, options: FetchOptions = {}): Promise<Response> {
  const { method = 'GET', headers = {}, body, timeoutMs = 15_000, signal } = options
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(new TimeoutError(timeoutMs)), timeoutMs)
  if (signal) {
    if (signal.aborted) controller.abort()
    else signal.addEventListener('abort', () => controller.abort(), { once: true })
  }

  try {
    return await fetch(url, {
      method,
      headers: body != null ? { 'content-type': 'application/json', ...headers } : headers,
      body: body != null ? JSON.stringify(body) : undefined,
      signal: controller.signal
    })
  } catch (err) {
    if (controller.signal.reason instanceof TimeoutError) throw controller.signal.reason
    throw err
  } finally {
    clearTimeout(timer)
  }
}
export async function httpJson<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const res = await httpFetch(url, options)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} ${res.statusText}${text ? ` — ${text.slice(0, 200)}` : ''}`)
  }
  return (await res.json()) as T
}
