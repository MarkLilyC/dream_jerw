export type MaterialCategory = 'diamond' | 'gem' | 'pearl' | 'charm'

export type MaterialShape =
  | 'round'
  | 'oval'
  | 'pear'
  | 'emerald'
  | 'pearl'
  | 'star'
  | 'flower'
  | 'bow'
  | 'leaf'

export interface MaterialColors {
  light: string
  mid: string
  dark: string
  rim: string
}

export interface Material {
  id: string
  name: string
  category: MaterialCategory
  shape: MaterialShape
  colors: MaterialColors
  description: string
}

export type SlotSide = 'left' | 'right' | 'center'

export interface NecklaceSlot {
  id: string
  x: number
  y: number
  radius: number
  tier: number
  side: SlotSide
}

/** Maps a slot id to the material id set in it. */
export type Design = Record<string, string>

export interface Theme {
  id: string
  name: string
  note: string
  center: string[]
  rows: string[][]
}

export interface CategoryMeta {
  id: MaterialCategory
  label: string
  latin: string
}
