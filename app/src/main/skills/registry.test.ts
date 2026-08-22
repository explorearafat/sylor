import { beforeEach, describe, expect, it, vi } from 'vitest'
import { join } from 'node:path'

// `node:fs` is mocked so the disk scan runs without touching real files. `dirs`
// maps a directory to its entry names (readdirSync); `files` maps a full path to
// its contents (readFileSync). An unstaged dir/file throws — exactly like a
// missing directory or an absent SKILL.md, both of which the scanner swallows.
// A `default` export accompanies the named ones for Vitest's ESM interop.
const { fsState } = vi.hoisted(() => ({
  fsState: { files: {} as Record<string, string>, dirs: {} as Record<string, string[]> }
}))
vi.mock('node:fs', () => {
  const readFileSync = (path: string): string => {
    const hit = fsState.files[path]
    if (hit === undefined) throw new Error(`ENOENT: ${path}`)
    return hit
  }
  const readdirSync = (path: string): string[] => {
    const hit = fsState.dirs[path]
    if (hit === undefined) throw new Error(`ENOENT dir: ${path}`)
    return hit
  }
  return { readFileSync, readdirSync, default: { readFileSync, readdirSync } }
})

import {
  globalSkillsDir,
  loadSkills,
  parseSkill,
  projectSkillsDir,
  skillsRegistry
} from '@main/skills/registry'

/** Builds the SKILL.md path the scanner probes for a folder, using the real join. */
const skillPath = (dir: string, folder: string): string => join(dir, folder, 'SKILL.md')

describe('parseSkill', () => {
  it('parses frontmatter fields + body', () => {
    const out = parseSkill(
      '---\nname: pdf-tools\ndescription: Work with PDFs\nwhen_to_use: When asked about PDFs\n---\nStep 1. Do the thing.'
    )
    expect(out).toEqual({
      name: 'pdf-tools',
      description: 'Work with PDFs',
      whenToUse: 'When asked about PDFs',
      instructions: 'Step 1. Do the thing.'
    })
  })

  it('strips a single layer of surrounding quotes from values', () => {
    const out = parseSkill('---\nname: "pdf"\ndescription: \'quoted\'\n---\nbody')
    expect(out.name).toBe('pdf')
    expect(out.description).toBe('quoted')
  })

  it('accepts when-to-use / whenToUse aliases and ignores unknown keys', () => {
    expect(parseSkill('---\nwhen-to-use: X\nfoo: bar\n---\nb').whenToUse).toBe('X')
    expect(parseSkill('---\nwhenToUse: Y\n---\nb').whenToUse).toBe('Y')
  })

  it('treats a file with no frontmatter as all body', () => {
    expect(parseSkill('Just instructions, no frontmatter.')).toEqual({
      name: undefined,
      description: '',
      whenToUse: '',
      instructions: 'Just instructions, no frontmatter.'
    })
  })

  it('tolerates CRLF, a leading BOM, and blank values', () => {
    const out = parseSkill('﻿---\r\nname: n\r\ndescription:\r\n---\r\nbody\r\n')
    expect(out.name).toBe('n')
    expect(out.description).toBe('') // blank value is ignored, not captured
    expect(out.instructions).toBe('body')
  })
})

describe('skill directory paths', () => {
  it('derive from ~/.sylor/skills and <root>/.sylor/skills', () => {
    // Normalize separators so the assertion holds on Windows and POSIX alike.
    expect(globalSkillsDir().replace(/\\/g, '/')).toMatch(/\.sylor\/skills$/)
    expect(projectSkillsDir('/proj').replace(/\\/g, '/')).toBe('/proj/.sylor/skills')
  })
})

describe('loadSkills', () => {
  beforeEach(() => {
    fsState.files = {}
    fsState.dirs = {}
  })

  it('scans a folder, using the frontmatter name and falling back to the folder', () => {
    const dir = globalSkillsDir()
    fsState.dirs = { [dir]: ['pdf', 'no-name'] }
    fsState.files = {
      [skillPath(dir, 'pdf')]: '---\nname: pdf-tools\ndescription: d\n---\nbody',
      [skillPath(dir, 'no-name')]: 'just a body, no frontmatter'
    }
    const byName = Object.fromEntries(loadSkills(null).map((s) => [s.name, s]))
    expect(byName['pdf-tools'].source).toBe('global')
    expect(byName['pdf-tools'].description).toBe('d')
    // The folder name is the fallback when frontmatter omits `name`.
    expect(byName['no-name'].instructions).toBe('just a body, no frontmatter')
  })

  it('skips folders with no readable SKILL.md and skills with empty instructions', () => {
    const dir = globalSkillsDir()
    fsState.dirs = { [dir]: ['ok', 'not-a-skill', 'empty'] }
    fsState.files = {
      [skillPath(dir, 'ok')]: 'body',
      // 'not-a-skill' has no SKILL.md staged → readFileSync throws → skipped.
      [skillPath(dir, 'empty')]: '---\nname: e\n---\n   ' // only whitespace body
    }
    expect(loadSkills(null).map((s) => s.name)).toEqual(['ok'])
  })

  it('merges global + project, with project shadowing a same-named global skill', () => {
    const g = globalSkillsDir()
    const p = projectSkillsDir('/proj')
    fsState.dirs = { [g]: ['a', 'shared'], [p]: ['b', 'shared'] }
    fsState.files = {
      [skillPath(g, 'a')]: '---\nname: a\n---\nglobal-a',
      [skillPath(g, 'shared')]: '---\nname: shared\n---\nfrom-global',
      [skillPath(p, 'b')]: '---\nname: b\n---\nproject-b',
      [skillPath(p, 'shared')]: '---\nname: shared\n---\nfrom-project'
    }
    const byName = Object.fromEntries(loadSkills('/proj').map((s) => [s.name, s]))
    expect(byName.a.source).toBe('global')
    expect(byName.b.source).toBe('project')
    expect(byName.shared.source).toBe('project')
    expect(byName.shared.instructions).toBe('from-project')
  })

  it('ignores project skills when projectRoot is null', () => {
    const g = globalSkillsDir()
    fsState.dirs = { [g]: ['a'] }
    fsState.files = { [skillPath(g, 'a')]: '---\nname: a\n---\nbody' }
    expect(loadSkills(null).map((s) => s.name)).toEqual(['a'])
  })

  it('yields [] when no skills directories exist', () => {
    expect(loadSkills('/proj')).toEqual([])
  })
})

describe('skillsRegistry (caching)', () => {
  it('caches per root, invalidates on root change, and reloads on demand', () => {
    const g = globalSkillsDir()
    fsState.dirs = { [g]: ['a'] }
    fsState.files = { [skillPath(g, 'a')]: '---\nname: a\n---\nbody' }

    expect(skillsRegistry.getSkills(null).map((s) => s.name)).toEqual(['a'])

    // Mutate disk, then re-request the SAME root: the cached result is returned.
    fsState.dirs = { [g]: ['a', 'b'] }
    fsState.files[skillPath(g, 'b')] = '---\nname: b\n---\nbody'
    expect(skillsRegistry.getSkills(null).map((s) => s.name)).toEqual(['a'])

    // reload() forces a fresh scan for the root.
    expect(skillsRegistry.reload(null).map((s) => s.name)).toEqual(['a', 'b'])

    // A different root re-scans (a project's skills dir is root-specific).
    const p = projectSkillsDir('/proj')
    fsState.dirs[p] = ['c']
    fsState.files[skillPath(p, 'c')] = '---\nname: c\n---\nbody'
    expect(
      skillsRegistry
        .getSkills('/proj')
        .map((s) => s.name)
        .sort()
    ).toEqual(['a', 'b', 'c'])
  })
})
