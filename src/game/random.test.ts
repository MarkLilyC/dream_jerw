import { describe, expect, it } from 'vitest'
import { MATERIALS_BY_ID } from './materials'
import { NECKLACE_SLOTS, SLOT_PAIRS } from './necklace'
import { createRandomDesign, sanitizeDesign } from './random'

describe('createRandomDesign', () => {
  it('fills every slot with a real material', () => {
    const { design } = createRandomDesign(() => 0.42)

    expect(Object.keys(design)).toHaveLength(NECKLACE_SLOTS.length)
    for (const slot of NECKLACE_SLOTS) {
      expect(MATERIALS_BY_ID.has(design[slot.id])).toBe(true)
    }
  })

  it('creates a mirrored composition', () => {
    const { design } = createRandomDesign(() => 0.72)

    for (const { left, right } of SLOT_PAIRS) {
      expect(design[left.id]).toBe(design[right.id])
    }
  })

  it('honours an explicit theme', () => {
    const { theme } = createRandomDesign(() => 0.1, 'ruby-night')
    expect(theme.id).toBe('ruby-night')
  })
})

describe('sanitizeDesign', () => {
  it('keeps only known slots and materials', () => {
    const result = sanitizeDesign({
      center: 'ruby-oval',
      'left-1': 'diamond-round',
      'not-a-slot': 'ruby-oval',
      'right-1': 'not-a-material',
    })

    expect(result).toEqual({
      center: 'ruby-oval',
      'left-1': 'diamond-round',
    })
  })

  it('ignores malformed payloads', () => {
    expect(sanitizeDesign(null)).toEqual({})
    expect(sanitizeDesign([])).toEqual({})
    expect(sanitizeDesign('ruby')).toEqual({})
    expect(sanitizeDesign({ center: 42 })).toEqual({})
  })
})
