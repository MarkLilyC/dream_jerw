import { useCallback, useEffect, useRef, useState } from 'react'
import { ExportDialog } from './components/ExportDialog'
import {
  IconDownload,
  IconRedo,
  IconUndo,
} from './components/Icons'
import { MaterialTray } from './components/MaterialTray'
import { Stage } from './components/Stage'
import { Toast } from './components/Toast'
import { BrandMark } from './components/art/BrandMark'
import { getMaterial } from './game/materials'
import { NECKLACE_SLOTS } from './game/necklace'
import { createRandomDesign } from './game/random'
import { loadDesign, saveDesign } from './game/storage'
import type { Material, MaterialCategory } from './game/types'
import { useDesignHistory } from './state/useDesignHistory'

function formatTime(timestamp: number | null): string | null {
  if (!timestamp) return null
  const date = new Date(timestamp)
  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes(),
  ).padStart(2, '0')}`
}

interface ToastState {
  id: number
  message: string
}

export default function App() {
  const [initial] = useState(() => loadDesign())
  const {
    design,
    commit,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useDesignHistory(initial.design)

  const [activeCategory, setActiveCategory] =
    useState<MaterialCategory>('diamond')
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(
    null,
  )
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const [recentSlotId, setRecentSlotId] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<number | null>(initial.savedAt)
  const [toast, setToast] = useState<ToastState | null>(null)
  const [exportOpen, setExportOpen] = useState(false)

  const toastIdRef = useRef(0)
  const recentTimerRef = useRef<number | null>(null)

  const activeMaterial = getMaterial(selectedMaterialId ?? undefined) ?? null
  const hasDesign = Object.keys(design).length > 0

  const showToast = useCallback((message: string) => {
    toastIdRef.current += 1
    setToast({ id: toastIdRef.current, message })
  }, [])

  const flashSlot = useCallback((slotId: string) => {
    setRecentSlotId(slotId)
    if (recentTimerRef.current) {
      window.clearTimeout(recentTimerRef.current)
    }
    recentTimerRef.current = window.setTimeout(() => {
      setRecentSlotId(null)
      recentTimerRef.current = null
    }, 680)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSavedAt(saveDesign(design))
    }, 420)
    return () => window.clearTimeout(timer)
  }, [design])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => {
      setToast((current) => (current?.id === toast.id ? null : current))
    }, 3600)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    return () => {
      if (recentTimerRef.current) {
        window.clearTimeout(recentTimerRef.current)
      }
    }
  }, [])

  const handleMaterialSelect = useCallback((material: Material) => {
    setSelectedMaterialId((current) =>
      current === material.id ? null : material.id,
    )
    setSelectedSlotId(null)
  }, [])

  const handleCategoryChange = useCallback((category: MaterialCategory) => {
    setActiveCategory(category)
    setSelectedMaterialId(null)
    setSelectedSlotId(null)
  }, [])

  const handleSlotClick = useCallback(
    (slotId: string) => {
      const material = getMaterial(design[slotId])
      if (!activeMaterial) {
        if (material) {
          setSelectedSlotId(slotId)
        } else {
          setSelectedSlotId(null)
          showToast('先从下方选择一件材质，再点亮镶嵌位')
        }
        return
      }

      if (material?.id === activeMaterial.id) {
        flashSlot(slotId)
        return
      }

      const isFinalSlot =
        Object.keys(design).length === NECKLACE_SLOTS.length - 1 &&
        !design[slotId]

      commit((current) => ({
        ...current,
        [slotId]: activeMaterial.id,
      }))
      setSelectedSlotId(null)
      flashSlot(slotId)

      if (isFinalSlot) {
        showToast(`全部 ${NECKLACE_SLOTS.length} 个镶嵌位都已完成`)
      }
    },
    [activeMaterial, commit, design, flashSlot, showToast],
  )

  const handleBackgroundClick = useCallback(() => {
    setSelectedSlotId(null)
  }, [])

  const handleCancelMaterial = useCallback(() => {
    setSelectedMaterialId(null)
  }, [])

  const handleRemoveSelectedSlot = useCallback(() => {
    if (!selectedSlotId) return
    const material = getMaterial(design[selectedSlotId])
    commit((current) => {
      const next = { ...current }
      delete next[selectedSlotId]
      return next
    })
    setSelectedSlotId(null)
    if (material) showToast(`${material.name} 已取下`)
  }, [commit, design, selectedSlotId, showToast])

  const handleRandom = useCallback(() => {
    const result = createRandomDesign()
    commit(result.design)
    setSelectedSlotId(null)
    showToast(`「${result.theme.name}」灵感落笔 · ${result.theme.note}`)
  }, [commit, showToast])

  const handleClear = useCallback(() => {
    if (!hasDesign) return
    commit({})
    setSelectedSlotId(null)
    showToast('作品已清空，可随时撤销')
  }, [commit, hasDesign, showToast])

  const handleUndo = useCallback(() => {
    if (!canUndo) return
    undo()
    setSelectedSlotId(null)
  }, [canUndo, undo])

  const handleRedo = useCallback(() => {
    if (!canRedo) return
    redo()
    setSelectedSlotId(null)
  }, [canRedo, redo])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (exportOpen) return
      const target = event.target as HTMLElement | null
      if (
        target?.closest(
          'input, textarea, select, [contenteditable="true"]',
        )
      ) {
        return
      }

      const modifier = event.metaKey || event.ctrlKey
      const key = event.key.toLowerCase()

      if (modifier && key === 'z') {
        event.preventDefault()
        if (event.shiftKey) handleRedo()
        else handleUndo()
        return
      }
      if (modifier && key === 'y') {
        event.preventDefault()
        handleRedo()
        return
      }
      if (event.key === 'Escape') {
        setSelectedMaterialId(null)
        setSelectedSlotId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [exportOpen, handleRedo, handleUndo])

  const savedAtLabel = formatTime(savedAt)

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">
            <BrandMark />
          </span>
          <span className="brand-copy">
            <span className="brand-name">AURELIA</span>
            <span className="brand-tagline">私人珠宝工坊 · JEWELRY ATELIER</span>
          </span>
        </div>

        <div className="header-legend" aria-hidden="true">
          <span>DESIGN YOUR OWN</span>
          <i />
          <span>NO. 01</span>
        </div>

        <div className="header-actions">
          <div className="history-actions">
            <button
              type="button"
              className="icon-button"
              onClick={handleUndo}
              disabled={!canUndo}
              aria-label="撤销"
              title="撤销 (⌘Z)"
            >
              <IconUndo size={20} />
            </button>
            <button
              type="button"
              className="icon-button"
              onClick={handleRedo}
              disabled={!canRedo}
              aria-label="重做"
              title="重做 (⇧⌘Z)"
            >
              <IconRedo size={20} />
            </button>
          </div>
          <button
            type="button"
            className="export-button"
            onClick={() => setExportOpen(true)}
            disabled={!hasDesign}
            title={hasDesign ? '预览并保存作品' : '先镶嵌一件材质'}
          >
            <IconDownload size={19} />
            <span>保存作品</span>
          </button>
        </div>
      </header>

      <main className="workspace">
        <Stage
          design={design}
          activeMaterial={activeMaterial}
          selectedSlotId={selectedSlotId}
          recentSlotId={recentSlotId}
          onSlotClick={handleSlotClick}
          onBackgroundClick={handleBackgroundClick}
          onRemoveSelectedSlot={handleRemoveSelectedSlot}
          onCancelMaterial={handleCancelMaterial}
        />

        <MaterialTray
          activeCategory={activeCategory}
          selectedMaterialId={selectedMaterialId}
          hasDesign={hasDesign}
          savedAtLabel={savedAtLabel}
          onCategoryChange={handleCategoryChange}
          onMaterialSelect={handleMaterialSelect}
          onRandom={handleRandom}
          onClear={handleClear}
        />
      </main>

      {toast && <Toast key={toast.id} message={toast.message} />}

      <ExportDialog
        open={exportOpen}
        design={design}
        onClose={() => setExportOpen(false)}
        onToast={showToast}
      />
    </div>
  )
}
