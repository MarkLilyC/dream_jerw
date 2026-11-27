import { describe, expect, it } from 'vitest'
import {
  commitHistory,
  createHistory,
  redoHistory,
  undoHistory,
} from './history'

describe('design history', () => {
  it('commits, undoes, and redoes a design', () => {
    let history = createHistory({})
    history = commitHistory(history, { center: 'ruby-oval' })

    expect(history.present).toEqual({ center: 'ruby-oval' })
    expect(history.past).toHaveLength(1)

    history = undoHistory(history)
    expect(history.present).toEqual({})
    expect(history.future).toHaveLength(1)

    history = redoHistory(history)
    expect(history.present).toEqual({ center: 'ruby-oval' })
  })

  it('does not record an identical design', () => {
    const initial = { center: 'ruby-oval' }
    const history = createHistory(initial)
    const next = commitHistory(history, { center: 'ruby-oval' })
    expect(next).toBe(history)
  })

  it('clears redo history after a new edit', () => {
    let history = createHistory({})
    history = commitHistory(history, { center: 'ruby-oval' })
    history = undoHistory(history)
    history = commitHistory(history, { center: 'pearl-white' })

    expect(history.future).toEqual([])
    expect(history.present).toEqual({ center: 'pearl-white' })
  })

  it('stays a no-op at the edges', () => {
    const history = createHistory({})
    expect(undoHistory(history)).toBe(history)
    expect(redoHistory(history)).toBe(history)
  })
})
