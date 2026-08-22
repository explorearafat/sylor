/**
 * Skills registry.
 *
 * Skills are disk-authored capability folders, mirroring the Claude CLI's skills.
 * Each lives as `<dir>/<skill-name>/SKILL.md`, read from two locations and merged:
 *  - global  → `~/.sylor/skills/*`            (applies everywhere)
 *  - project → `<projectRoot>/.sylor/skills/*` (overrides global by name)
 *
 * A SKILL.md is a Markdown file with a leading `---` frontmatter block:
 *
 *   ---
 *   name: pdf-tools
 *   description: Read, fill, and merge PDF files
 *   when_to_use: When the user asks to work with PDF documents
 *   ---
 *
 *   Step-by-step instructions the model follows once it invokes the skill…
 *
 * {@link parseSkill} is a pure frontmatter reader (unit-tested); {@link loadSkills}
 * scans + merges the two locations. Both are defensive — a missing directory or a
 * malformed file yields no skill rather than throwing, so a typo never breaks the
 * app. The disabled-skill filter lives at the engine/IPC layer, not here, so this
 * module stays free of Electron and settings for easy testing.
 */
import { mkdirSync, readFileSync, readdirSync, rmdirSync, rmSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import type { ConfigScope, SkillInfo, SkillSource } from '../../shared/types'

/** Sylor's global config directory (`~/.sylor`). */
export function sylorHome(): string {
  return join(homedir(), '.sylor')
}

/** Absolute path of the global skills directory (`~/.sylor/skills`). */
export function globalSkillsDir(): string {
  return join(sylorHome(), 'skills')
}

/** Absolute path of a project's skills directory (`<root>/.sylor/skills`). */
export function projectSkillsDir(projectRoot: string): string {
  return join(projectRoot, '.sylor', 'skills')
}

/** The frontmatter fields + body extracted from a SKILL.md. */
export interface ParsedSkill {
  /** The `name:` field, when present (else the caller falls back to the folder). */
  name?: string
  description: string
  whenToUse: string
  /** Everything after the frontmatter block (trimmed). */
  instructions: string
}

/** Strips a single layer of matching surrounding quotes from a frontmatter value. */
function stripQuotes(value: string): string {
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    return value.slice(1, -1)
  }
  return value
}

/**
 * Parses a SKILL.md's text into frontmatter fields + instruction body. The
 * frontmatter is a leading `---`-fenced block of simple `key: value` lines — a
 * tiny subset of YAML (no nesting or lists needed), so no dependency is required.
 * Recognized keys: `name`, `description`, and `when_to_use` (also accepts
 * `whenToUse`/`when-to-use`). Everything after the closing `---` is the body.
 * When there's no frontmatter, the whole text is treated as the body. Total and
 * defensive — unknown keys and non-`key: value` lines are ignored; never throws.
 */
export function parseSkill(raw: string): ParsedSkill {
  const text = raw.replace(/^\uFEFF/, '') // drop a leading BOM if present
  const fm = /^\s*---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?([\s\S]*)$/.exec(text)
  if (!fm) {
    return { description: '', whenToUse: '', instructions: text.trim() }
  }
  const [, front, body] = fm
  let name: string | undefined
  let description = ''
  let whenToUse = ''
  for (const line of front.split(/\r?\n/)) {
    const m = /^([A-Za-z0-9_-]+)[ \t]*:[ \t]*(.*)$/.exec(line.trim())
    if (!m) continue
    const key = m[1].toLowerCase().replace(/-/g, '_')
    const value = stripQuotes(m[2].trim())
    if (!value) continue
    if (key === 'name') name = value
    else if (key === 'description') description = value
    else if (key === 'when_to_use' || key === 'whentouse') whenToUse = value
  }
  return { name, description, whenToUse, instructions: body.trim() }
}

/**
 * Scans one skills directory for `<folder>/SKILL.md` files. Reads entries by name
 * and probes each folder for a SKILL.md — a non-directory entry (or a folder with
 * no SKILL.md) simply fails the read and is skipped, so no `stat`/Dirent handling
 * is needed. A skill with no usable instructions is dropped. Returns [] when the
 * directory is missing.
 */
function readSkillsDir(dir: string, source: SkillSource): SkillInfo[] {
  let folders: string[]
  try {
    folders = readdirSync(dir)
  } catch {
    return [] // directory doesn't exist → no skills here
  }
  const out: SkillInfo[] = []
  for (const folder of folders) {
    const skillPath = join(dir, folder, 'SKILL.md')
    let text: string
    try {
      text = readFileSync(skillPath, 'utf-8')
    } catch {
      continue // not a directory, or no SKILL.md inside it
    }
    const parsed = parseSkill(text)
    const name = (parsed.name && parsed.name.trim()) || folder.trim()
    if (!name || !parsed.instructions) continue // nameless or empty → not a usable skill
    out.push({
      name,
      description: parsed.description,
      whenToUse: parsed.whenToUse,
      instructions: parsed.instructions,
      source,
      path: skillPath
    })
  }
  return out
}

/**
 * Loads and merges the global + project skills. A project skill shadows a global
 * one of the same name (project wins), matching the CLI's precedence and the MCP
 * loader's behavior.
 */
export function loadSkills(projectRoot: string | null): SkillInfo[] {
  const merged = new Map<string, SkillInfo>()
  for (const skill of readSkillsDir(globalSkillsDir(), 'global')) {
    merged.set(skill.name, skill)
  }
  if (projectRoot) {
    for (const skill of readSkillsDir(projectSkillsDir(projectRoot), 'project')) {
      merged.set(skill.name, skill)
    }
  }
  return [...merged.values()]
}

// ---------------------------------------------------------------------------
// Writers — used by the in-app "Add a skill" and "Remove" actions. Kept beside
// the reader/parser so the on-disk SKILL.md shape has one owner and round-trips
// (only the keys {@link parseSkill} reads are written).
// ---------------------------------------------------------------------------

/** Slugifies a skill name into a safe folder name (lowercase, ascii, dashed). */
export function skillFolderName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '')
    .slice(0, 64)
}

/** Fields the UI supplies to author a new skill (rendered into a SKILL.md). */
export interface NewSkillInput {
  name: string
  description?: string
  whenToUse?: string
  instructions: string
}

/** Renders a SKILL.md: a frontmatter block (only the parsed keys) + the body. */
function renderSkillMd(input: NewSkillInput): string {
  const lines = ['---', `name: ${input.name.trim()}`]
  const description = input.description?.trim()
  const whenToUse = input.whenToUse?.trim()
  if (description) lines.push(`description: ${description}`)
  if (whenToUse) lines.push(`when_to_use: ${whenToUse}`)
  lines.push('---', '', input.instructions.trim(), '')
  return lines.join('\n')
}

/**
 * Authors a new skill on disk at `<scope>/skills/<slug>/SKILL.md` and returns the
 * file path. Throws a friendly error when the name/body is blank or the slug is
 * empty, or when a project scope is requested with no open project.
 */
export function writeSkill(
  input: NewSkillInput,
  scope: ConfigScope,
  projectRoot: string | null
): string {
  if (!input.name.trim()) throw new Error('Enter a name for the skill.')
  if (!input.instructions.trim()) throw new Error('Enter the skill instructions.')
  const folder = skillFolderName(input.name)
  if (!folder) throw new Error('The name must contain a letter or number.')
  if (scope === 'project' && !projectRoot) {
    throw new Error('Open a project folder first to add a project-scoped skill.')
  }
  const baseDir = scope === 'project' ? projectSkillsDir(projectRoot as string) : globalSkillsDir()
  const skillDir = join(baseDir, folder)
  mkdirSync(skillDir, { recursive: true })
  const path = join(skillDir, 'SKILL.md')
  writeFileSync(path, renderSkillMd(input), 'utf-8')
  return path
}

/**
 * Deletes a disk skill's SKILL.md, then removes its now-empty folder. The folder
 * removal is non-recursive (`rmdirSync` only succeeds when empty), so a folder
 * holding other files the user added is left in place — never a blind wipe.
 */
export function deleteSkillFile(skillMdPath: string): void {
  rmSync(skillMdPath, { force: true })
  try {
    rmdirSync(dirname(skillMdPath))
  } catch {
    // Folder not empty (or already gone) → leave it; only the SKILL.md is ours.
  }
}

/**
 * Caches the skills discovered for a project root. Skills are cheap to read, but
 * caching keeps a turn's repeated lookups consistent and lets the engine and the
 * settings IPC share one view. The cache invalidates when the root changes (a
 * project's `.sylor/skills` is root-specific) or on an explicit {@link reload}
 * (the settings "Reload" button, after the user edits a SKILL.md on disk).
 */
class SkillsRegistry {
  private cache: SkillInfo[] | null = null
  private cachedRoot: string | null = null

  /** Skills for `root`, loaded from disk and cached until the root changes. */
  getSkills(root: string | null): SkillInfo[] {
    if (this.cache && root === this.cachedRoot) return this.cache
    this.cachedRoot = root
    this.cache = loadSkills(root)
    return this.cache
  }

  /** Force a fresh disk scan for `root` (used by the settings Reload button). */
  reload(root: string | null): SkillInfo[] {
    this.cachedRoot = root
    this.cache = loadSkills(root)
    return this.cache
  }
}

/** The app-wide skills registry, shared by the engine and the skills IPC. */
export const skillsRegistry = new SkillsRegistry()
