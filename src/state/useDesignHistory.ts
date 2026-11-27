import { useCallback, useState } from 'react'
import type { Design } from '../game/types'
import {
  commitHistory,
  createHistory,
  redoHistory,
  undoHistory,
} from './history'

type DesignUpdate = Design | ((current: Design) => Design)

export function useDesignHistory(initialDesign: Design) {
  const [history, setHistory] = useState(() => createHistory(initialDesign))

  const commit = useCallback((update: DesignUpdate) => {
    setHistory((current) => {
      const next =
        typeof update === 'function' ? update(current.present) : update
      return commitHistory(current, next)
    })
  }, [])

  const undo = useCallback(() => {
    setHistory((current) => undoHistory(current))
  }, [])

  const redo = useCallback(() => {
    setHistory((current) => redoHistory(current))
  }, [])

  return {
    design: history.present,
    commit,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    revision: history.past.length,
  }
}
