import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  clearSavedDesign,
  loadDesign,
  saveDesign,
} from './storage'

const store = new Map<string, string>()

const localStorageMock = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => void store.set(key, value),
  removeItem: (key: string) => void store.delete(key),
}

beforeEach(() => {
  store.clear()
  vi.stubGlobal('window', { localStorage: localStorageMock })
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('design storage', () => {
  it('round-trips a design and its save time', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000)

    const savedAt = saveDesign({
      center: 'ruby-oval',
      'left-1': 'diamond-round',
    })
    const loaded = loadDesign()

    expect(savedAt).toBe(1_700_000_000_000)
    expect(loaded.design).toEqual({
      center: 'ruby-oval',
      'left-1': 'diamond-round',
    })
    expect(loaded.savedAt).toBe(1_700_000_000_000)
  })

  it('drops stale material ids on load', () => {
    store.set(
      'aurelia-necklace-design-v1',
      JSON.stringify({
        version: 1,
        savedAt: 123,
        design: { center: 'ruby-oval', 'left-1': 'retired-gem' },
      }),
    )

    expect(loadDesign().design).toEqual({ center: 'ruby-oval' })
  })

  it('recovers from corrupt storage', () => {
    store.set('aurelia-necklace-design-v1', '{invalid json')
    expect(loadDesign()).toEqual({ design: {}, savedAt: null })
  })

  it('clears a saved design', () => {
    saveDesign({ center: 'pearl-white' })
    clearSavedDesign()
    expect(loadDesign()).toEqual({ design: {}, savedAt: null })
  })
})
