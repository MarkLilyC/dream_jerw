import type { NecklaceSlot } from './types'

export const STAGE_WIDTH = 900
export const STAGE_HEIGHT = 820

export const NECKLACE_SLOTS: NecklaceSlot[] = [
  { id: 'left-1', x: 206, y: 158, radius: 17, tier: 1, side: 'left' },
  { id: 'left-2', x: 169, y: 250, radius: 19, tier: 2, side: 'left' },
  { id: 'left-3', x: 157, y: 347, radius: 21, tier: 3, side: 'left' },
  { id: 'left-4', x: 176, y: 440, radius: 24, tier: 4, side: 'left' },
  { id: 'left-5', x: 223, y: 519, radius: 27, tier: 5, side: 'left' },
  { id: 'left-6', x: 296, y: 576, radius: 31, tier: 6, side: 'left' },
  { id: 'center', x: 450, y: 610, radius: 48, tier: 0, side: 'center' },
  { id: 'right-6', x: 604, y: 576, radius: 31, tier: 6, side: 'right' },
  { id: 'right-5', x: 677, y: 519, radius: 27, tier: 5, side: 'right' },
  { id: 'right-4', x: 724, y: 440, radius: 24, tier: 4, side: 'right' },
  { id: 'right-3', x: 743, y: 347, radius: 21, tier: 3, side: 'right' },
  { id: 'right-2', x: 731, y: 250, radius: 19, tier: 2, side: 'right' },
  { id: 'right-1', x: 694, y: 158, radius: 17, tier: 1, side: 'right' },
]

export const SLOT_BY_ID = new Map(
  NECKLACE_SLOTS.map((slot) => [slot.id, slot]),
)

export const SLOT_PAIRS = Array.from({ length: 6 }, (_, index) => {
  const tier = index + 1
  return {
    tier,
    left: NECKLACE_SLOTS.find(
      (slot) => slot.tier === tier && slot.side === 'left',
    )!,
    right: NECKLACE_SLOTS.find(
      (slot) => slot.tier === tier && slot.side === 'right',
    )!,
  }
})

export const CENTER_SLOT = SLOT_BY_ID.get('center')!

export interface Point {
  x: number
  y: number
}

export const CHAIN_POINTS: Point[] = [
  { x: 250, y: 74 },
  ...NECKLACE_SLOTS.filter((slot) => slot.side === 'left')
    .sort((a, b) => a.tier - b.tier)
    .map(({ x, y }) => ({ x, y })),
  { x: 450, y: 610 },
  ...NECKLACE_SLOTS.filter((slot) => slot.side === 'right')
    .sort((a, b) => b.tier - a.tier)
    .map(({ x, y }) => ({ x, y })),
  { x: 650, y: 74 },
]

/**
 * Converts an open Catmull-Rom spline into cubic Bezier path data.
 * It keeps the chain buttery smooth through every gem setting.
 */
export function smoothPath(points: Point[], tension = 1): string {
  if (points.length < 2) return ''

  const line = (point: Point) => `${point.x.toFixed(2)} ${point.y.toFixed(2)}`
  const at = (index: number) =>
    points[Math.max(0, Math.min(points.length - 1, index))]

  let path = `M ${line(points[0])}`
  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = at(index - 1)
    const p1 = at(index)
    const p2 = at(index + 1)
    const p3 = at(index + 2)
    const control1 = {
      x: p1.x + ((p2.x - p0.x) / 6) * tension,
      y: p1.y + ((p2.y - p0.y) / 6) * tension,
    }
    const control2 = {
      x: p2.x - ((p3.x - p1.x) / 6) * tension,
      y: p2.y - ((p3.y - p1.y) / 6) * tension,
    }
    path += ` C ${line(control1)}, ${line(control2)}, ${line(p2)}`
  }
  return path
}

export const CHAIN_PATH = smoothPath(CHAIN_POINTS)

export const CHAIN_ENDS = [
  { x: CHAIN_POINTS[0].x, y: CHAIN_POINTS[0].y, flip: 1 },
  {
    x: CHAIN_POINTS[CHAIN_POINTS.length - 1].x,
    y: CHAIN_POINTS[CHAIN_POINTS.length - 1].y,
    flip: -1,
  },
]
