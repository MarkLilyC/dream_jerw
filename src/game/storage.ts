import { sanitizeDesign } from './random'
import type { Design } from './types'

const STORAGE_KEY = 'aurelia-necklace-design-v1'

interface SavedDesign {
  version: 1
  design: Design
  savedAt: number
}

export interface LoadedDesign {
  design: Design
  savedAt: number | null
}

export function loadDesign(): LoadedDesign {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { design: {}, savedAt: null }

    const parsed = JSON.parse(raw) as Partial<SavedDesign>
    const design = sanitizeDesign(parsed.design)
    return {
      design,
      savedAt:
        typeof parsed.savedAt === 'number' && Number.isFinite(parsed.savedAt)
          ? parsed.savedAt
          : null,
    }
  } catch {
    return { design: {}, savedAt: null }
  }
}

export function saveDesign(design: Design): number | null {
  const savedAt = Date.now()
  try {
    const payload: SavedDesign = { version: 1, design, savedAt }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    return savedAt
  } catch {
    // Private browsing or a full quota should never interrupt the atelier.
    return null
  }
}

export function clearSavedDesign(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage may be unavailable; the in-memory design still works.
  }
}
