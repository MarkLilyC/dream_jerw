import type { Design } from '../game/types'

export interface HistoryState {
  past: Design[]
  present: Design
  future: Design[]
}

const HISTORY_LIMIT = 60

export function createHistory(initial: Design = {}): HistoryState {
  return { past: [], present: initial, future: [] }
}

function designsEqual(a: Design, b: Design): boolean {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) return false
  return aKeys.every((key) => a[key] === b[key])
}

export function commitHistory(
  history: HistoryState,
  next: Design,
): HistoryState {
  if (designsEqual(history.present, next)) return history

  return {
    past: [...history.past, history.present].slice(-HISTORY_LIMIT),
    present: next,
    future: [],
  }
}

export function undoHistory(history: HistoryState): HistoryState {
  const previous = history.past.at(-1)
  if (!previous) return history

  return {
    past: history.past.slice(0, -1),
    present: previous,
    future: [history.present, ...history.future],
  }
}

export function redoHistory(history: HistoryState): HistoryState {
  const next = history.future[0]
  if (!next) return history

  return {
    past: [...history.past, history.present],
    present: next,
    future: history.future.slice(1),
  }
}
