import { ipcMain } from 'electron'
import { IpcChannel } from '../shared/ipc'
import type { SkillAddInput, SkillInfo, SkillMutationResult, SkillStatus } from '../shared/types'
import { contextManager } from './context/manager'
import {
  deleteSkillFile,
  globalSkillsDir,
  projectSkillsDir,
  skillsRegistry,
  writeSkill
} from './skills/registry'
import { mergeSkillCatalog } from './skills/catalog'
import { isSkillEnabled, resetSkillOverrides, setSkillEnabled } from './settings'

/**
 * Registers the Skills IPC. Skills come from a curated built-in catalog (see
 * {@link ./skills/catalog}) merged with disk-authored capability folders (see
 * {@link ./skills/registry}); the renderer lists them, toggles them on/off, and
 * asks for a re-scan after editing a SKILL.md. The user-owned state — the
 * enable/disable overrides — is persisted separately from provider settings (see
 * {@link isSkillEnabled}); a skill's default follows the catalog (safe essentials
 * on) or, for disk skills, on.
 *
 * The catalog merge lives here (not in the registry) so the pure disk loader
 * stays trivially testable; this is the single point the IPC layer merges.
 *
 * Every handler resolves the project root from {@link contextManager} — the same
 * source the engine and preview use — so a project's `.sylor/skills` always
 * resolves against the session the user is actually in.
 */
function toStatus(skills: SkillInfo[]): SkillStatus[] {
  return skills.map((s) => ({
    name: s.name,
    title: s.title ?? s.name,
    description: s.description,
    whenToUse: s.whenToUse,
    category: s.category ?? 'coding',
    source: s.source,
    enabled: isSkillEnabled(s.name, s.defaultOn ?? true),
    builtIn: s.builtIn ?? false,
    recommended: s.recommended ?? false,
    requiresMcp: s.requiresMcp ?? []
  }))
}

/** Catalog built-ins merged with the disk skills for `root` (disk shadows by name). */
function mergedSkills(root: string | null): SkillInfo[] {
  return mergeSkillCatalog(skillsRegistry.getSkills(root))
}

export function registerSkillsIpc(): void {
  ipcMain.handle(IpcChannel.SkillsList, () => toStatus(mergedSkills(contextManager.getRoot())))

  // Reload re-scans disk (the user may have added/edited a SKILL.md) and returns
  // the fresh list; enable/disable overrides are preserved across reloads.
  ipcMain.handle(IpcChannel.SkillsReload, () =>
    toStatus(mergeSkillCatalog(skillsRegistry.reload(contextManager.getRoot())))
  )

  ipcMain.handle(IpcChannel.SkillsSetEnabled, (_event, name: string, enabled: boolean) => {
    setSkillEnabled(name, enabled)
    return toStatus(mergedSkills(contextManager.getRoot()))
  })

  // Restore recommended defaults: clear every override so each skill reverts to
  // its catalog/disk default. Never deletes a disk SKILL.md.
  ipcMain.handle(IpcChannel.SkillsRestoreDefaults, () => {
    resetSkillOverrides()
    return toStatus(mergedSkills(contextManager.getRoot()))
  })

  // Author a new skill: render + write a SKILL.md on disk, then re-scan. A blank
  // name/body or an unwritable scope comes back as a friendly error (with the
  // unchanged list) rather than throwing across the IPC bridge.
  ipcMain.handle(IpcChannel.SkillsAdd, (_event, input: SkillAddInput): SkillMutationResult => {
    const root = contextManager.getRoot()
    try {
      writeSkill(
        {
          name: input.name,
          description: input.description,
          whenToUse: input.whenToUse,
          instructions: input.instructions
        },
        input.scope,
        root
      )
      return { ok: true, skills: toStatus(mergeSkillCatalog(skillsRegistry.reload(root))) }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      return { ok: false, error: message, skills: toStatus(mergedSkills(root)) }
    }
  })

  // Remove a disk skill by name: find its SKILL.md path (built-ins have none), delete
  // it plus the now-empty folder, then re-scan. Enable/disable overrides are untouched.
  ipcMain.handle(IpcChannel.SkillsRemove, (_event, name: string) => {
    const root = contextManager.getRoot()
    const disk = skillsRegistry.getSkills(root).find((s) => s.name === name && s.path)
    if (disk?.path) deleteSkillFile(disk.path)
    return toStatus(mergeSkillCatalog(skillsRegistry.reload(root)))
  })

  ipcMain.handle(IpcChannel.SkillsConfigPaths, () => {
    const root = contextManager.getRoot()
    return { global: globalSkillsDir(), project: root ? projectSkillsDir(root) : null }
  })
}
