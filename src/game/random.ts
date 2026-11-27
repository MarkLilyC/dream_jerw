import { SLOT_BY_ID, SLOT_PAIRS, CENTER_SLOT } from './necklace'
import { MATERIALS_BY_ID } from './materials'
import { THEMES, THEME_BY_ID } from './themes'
import type { Design, Theme } from './types'

type RandomSource = () => number

function pick<T>(values: T[], random: RandomSource): T {
  return values[Math.floor(random() * values.length)] ?? values[0]
}

/**
 * Builds a mirrored, fully-set necklace from one of the curated palettes.
 * Symmetry is deliberate: it makes even a random result look composed.
 */
export function createRandomDesign(
  random: RandomSource = Math.random,
  themeId?: string,
): { design: Design; theme: Theme } {
  const theme =
    (themeId ? THEME_BY_ID.get(themeId) : undefined) ?? pick(THEMES, random)

  const design: Design = {
    [CENTER_SLOT.id]: pick(theme.center, random),
  }

  for (const { tier, left, right } of SLOT_PAIRS) {
    const row = theme.rows[tier - 1]
    if (!row?.length) continue
    const materialId = pick(row, random)
    design[left.id] = materialId
    design[right.id] = materialId
  }

  return { design, theme }
}

/** Keeps saved / imported designs from referencing stale slot or material ids. */
export function sanitizeDesign(candidate: unknown): Design {
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
    return {}
  }

  const allowedSlots = new Set([...SLOT_BY_ID.keys()])
  const design: Design = {}

  for (const [slotId, materialId] of Object.entries(candidate)) {
    if (
      allowedSlots.has(slotId) &&
      typeof materialId === 'string' &&
      MATERIALS_BY_ID.has(materialId)
    ) {
      design[slotId] = materialId
    }
  }

  return design
}

export function isSameDesign(a: Design, b: Design): boolean {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) return false
  return aKeys.every((key) => a[key] === b[key])
}
