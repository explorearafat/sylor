import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { app } from 'electron'
import { DEFAULT_PROVIDER_SETTINGS } from '../shared/defaults'
import type { AuthSchema, ProviderKind, ProviderSettings, ReasoningEffort, Theme, WorkMode } from '../shared/types'
function settingsPath(): string {
  return join(app.getPath('userData'), 'sylor-settings.json')
}

const VALID_PROVIDERS: ProviderKind[] = ['ollama', 'gateway']
const VALID_SCHEMAS: AuthSchema[] = ['none', 'bearer', 'header']
const VALID_THEMES: Theme[] = ['light', 'dark']
const VALID_EFFORTS: ReasoningEffort[] = ['low', 'medium', 'high', 'max']
const VALID_WORK_MODES: WorkMode[] = ['cowork', 'code']
/**
 * Merges a raw (possibly partial or stale) settings object onto the defaults,
 * validating every field. Exported for unit tests; also the single normalisation
 * point for {@link getSettings} and {@link saveSettings}.
 */
export function normalise(raw: unknown): ProviderSettings {
  const d = DEFAULT_PROVIDER_SETTINGS
  const o = (raw ?? {}) as Partial<ProviderSettings>
  const ollama = (o.ollama ?? {}) as Partial<ProviderSettings['ollama']>
  const gateway = (o.gateway ?? {}) as Partial<ProviderSettings['gateway']>

  const ui = (o.ui ?? {}) as Partial<ProviderSettings['ui']>

  const activeProvider =
    o.activeProvider && VALID_PROVIDERS.includes(o.activeProvider) ? o.activeProvider : d.activeProvider
  const authSchema =
    gateway.authSchema && VALID_SCHEMAS.includes(gateway.authSchema)
      ? gateway.authSchema
      : d.gateway.authSchema
  const theme = ui.theme && VALID_THEMES.includes(ui.theme) ? ui.theme : d.ui.theme
  const effort = ui.effort && VALID_EFFORTS.includes(ui.effort) ? ui.effort : d.ui.effort
  const planFirst = typeof ui.planFirst === 'boolean' ? ui.planFirst : d.ui.planFirst
  const mode = ui.mode && VALID_WORK_MODES.includes(ui.mode) ? ui.mode : d.ui.mode
  // The chosen working folder (requirement A). Kept only when it's a non-empty
  // string; a blank/absent value means "no folder chosen yet" and Code mode
  // stays gated. `undefined` is dropped from the JSON entirely (not persisted).
  const workspaceRoot =
    typeof ui.workspaceRoot === 'string' && ui.workspaceRoot.trim() ? ui.workspaceRoot : undefined

  return {
    activeProvider,
    ollama: {
      baseUrl: typeof ollama.baseUrl === 'string' ? ollama.baseUrl : d.ollama.baseUrl
    },
    gateway: {
      baseUrl: typeof gateway.baseUrl === 'string' ? gateway.baseUrl : d.gateway.baseUrl,
      apiKey: typeof gateway.apiKey === 'string' ? gateway.apiKey : d.gateway.apiKey,
      authSchema,
      authHeaderName:
        typeof gateway.authHeaderName === 'string' && gateway.authHeaderName.trim()
          ? gateway.authHeaderName
          : d.gateway.authHeaderName
    },
    modelName: typeof o.modelName === 'string' ? o.modelName : d.modelName,
    modelId: typeof o.modelId === 'string' ? o.modelId : d.modelId,
    ui: { theme, effort, planFirst, mode, ...(workspaceRoot ? { workspaceRoot } : {}) }
  }
}
let cache: ProviderSettings | null = null
export function getSettings(): ProviderSettings {
  if (cache) return cache
  try {
    const text = readFileSync(settingsPath(), 'utf-8')
    cache = normalise(JSON.parse(text))
  } catch {
    cache = normalise(undefined)
  }
  return cache
}

export function saveSettings(settings: ProviderSettings): ProviderSettings {
  const normalised = normalise(settings)
  const file = settingsPath()
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(normalised, null, 2), 'utf-8')
  cache = normalised
  return normalised
}

/**
 * Enable/disable overrides for skills and MCP servers, persisted separately from
 * {@link ProviderSettings}.
 *
 * Both catalogs are opt-in: an item's *default* on/off state lives in code (the
 * catalog), and this file records only the user's explicit overrides on top. That
 * lets built-ins default off, disk items default on, and a "restore defaults"
 * simply clear the overrides — without a second settings store that could drift.
 *
 * Two override sets are kept per subsystem: `enabled` (turned on despite a
 * default-off) and `disabled` (turned off despite a default-on). Resolution is
 * `enabled ? on : disabled ? off : default`. Legacy files that stored only
 * `{ "disabled": [...] }` still read correctly (missing `enabled` → empty set),
 * so upgrading in place loses nothing.
 *
 * This deliberately lives outside ProviderSettings: the Settings modal saves the
 * whole provider blob it captured when it opened, so folding toggles into that
 * blob would let a later model-Save clobber a toggle made meanwhile via the
 * skills/MCP IPC. Dedicated files keep the two independent.
 */
export interface EnableOverrides {
  /** Names turned ON despite a default-off. */
  enabled: Set<string>
  /** Names turned OFF despite a default-on. */
  disabled: Set<string>
}

/** Coerces an unknown JSON value to a set of non-empty strings. */
function toStringSet(value: unknown): Set<string> {
  return new Set(
    Array.isArray(value) ? value.filter((n): n is string => typeof n === 'string' && !!n) : []
  )
}

/** Reads an override file; a missing/garbage file yields empty sets (defensive). */
function readOverrides(path: string): EnableOverrides {
  try {
    const parsed = JSON.parse(readFileSync(path, 'utf-8')) as {
      enabled?: unknown
      disabled?: unknown
    }
    return { enabled: toStringSet(parsed.enabled), disabled: toStringSet(parsed.disabled) }
  } catch {
    return { enabled: new Set(), disabled: new Set() }
  }
}

/** Persists an override file as `{ "disabled": [...], "enabled": [...] }`. */
function writeOverrides(path: string, o: EnableOverrides): void {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(
    path,
    JSON.stringify({ disabled: [...o.disabled], enabled: [...o.enabled] }, null, 2),
    'utf-8'
  )
}

/** Resolves effective enabled state: an explicit override wins over the default. */
function resolveEnabled(o: EnableOverrides, name: string, defaultOn: boolean): boolean {
  if (o.enabled.has(name)) return true
  if (o.disabled.has(name)) return false
  return defaultOn
}

/** Records an explicit on/off override for `name` (moves it between the two sets). */
function applyEnabled(o: EnableOverrides, name: string, enabled: boolean): EnableOverrides {
  const next: EnableOverrides = { enabled: new Set(o.enabled), disabled: new Set(o.disabled) }
  if (enabled) {
    next.enabled.add(name)
    next.disabled.delete(name)
  } else {
    next.disabled.add(name)
    next.enabled.delete(name)
  }
  return next
}

// ── Skills overrides (`sylor-skills.json`) ─────────────────────────────────

function skillsStatePath(): string {
  return join(app.getPath('userData'), 'sylor-skills.json')
}

let skillOverridesCache: EnableOverrides | null = null

/** The user's skill enable/disable overrides. Cached; defensive on read. */
export function getSkillOverrides(): EnableOverrides {
  if (!skillOverridesCache) skillOverridesCache = readOverrides(skillsStatePath())
  return skillOverridesCache
}

/** Effective enabled state of a skill, given its catalog/disk default. */
export function isSkillEnabled(name: string, defaultOn: boolean): boolean {
  return resolveEnabled(getSkillOverrides(), name, defaultOn)
}

/** Toggles a skill on/off and persists the override; returns the updated overrides. */
export function setSkillEnabled(name: string, enabled: boolean): EnableOverrides {
  const next = applyEnabled(getSkillOverrides(), name, enabled)
  writeOverrides(skillsStatePath(), next)
  skillOverridesCache = next
  return next
}

/** Clears all skill overrides (restore defaults) without touching disk skills. */
export function resetSkillOverrides(): void {
  const empty: EnableOverrides = { enabled: new Set(), disabled: new Set() }
  writeOverrides(skillsStatePath(), empty)
  skillOverridesCache = empty
}

// ── MCP overrides (`sylor-mcp.json`) ───────────────────────────────────────

function mcpStatePath(): string {
  return join(app.getPath('userData'), 'sylor-mcp.json')
}

let mcpOverridesCache: EnableOverrides | null = null

/** The user's MCP server enable/disable overrides. Cached; defensive on read. */
export function getMcpOverrides(): EnableOverrides {
  if (!mcpOverridesCache) mcpOverridesCache = readOverrides(mcpStatePath())
  return mcpOverridesCache
}

/** Effective enabled state of an MCP server, given its catalog/disk default. */
export function isMcpEnabled(name: string, defaultOn: boolean): boolean {
  return resolveEnabled(getMcpOverrides(), name, defaultOn)
}

/** Toggles an MCP server on/off and persists the override; returns the updated overrides. */
export function setMcpEnabled(name: string, enabled: boolean): EnableOverrides {
  const next = applyEnabled(getMcpOverrides(), name, enabled)
  writeOverrides(mcpStatePath(), next)
  mcpOverridesCache = next
  return next
}

/** Clears all MCP overrides (restore defaults) without touching `mcp.json`. */
export function resetMcpOverrides(): void {
  const empty: EnableOverrides = { enabled: new Set(), disabled: new Set() }
  writeOverrides(mcpStatePath(), empty)
  mcpOverridesCache = empty
}
