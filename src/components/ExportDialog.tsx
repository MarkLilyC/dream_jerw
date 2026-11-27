import { useEffect, useRef, useState } from 'react'
import {
  createExportPng,
  downloadPng,
  sharePng,
} from '../game/exportImage'
import type { Design } from '../game/types'
import {
  IconClose,
  IconDownload,
  IconShare,
  IconSparkles,
} from './Icons'

interface ExportDialogProps {
  open: boolean
  design: Design
  onClose: () => void
  onToast: (message: string) => void
}

type ExportState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; blob: Blob }

export function ExportDialog({
  open,
  design,
  onClose,
  onToast,
}: ExportDialogProps) {
  const [state, setState] = useState<ExportState>({ status: 'loading' })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    let cancelled = false
    const previousFocus = document.activeElement as HTMLElement | null
    restoreFocusRef.current = previousFocus
    setState({ status: 'loading' })
    setPreviewUrl(null)

    const timer = window.setTimeout(() => closeRef.current?.focus(), 60)

    createExportPng(design)
      .then((blob) => {
        if (cancelled) return
        setState({ status: 'ready', blob })
        setPreviewUrl(URL.createObjectURL(blob))
      })
      .catch((error: unknown) => {
        if (cancelled) return
        setState({
          status: 'error',
          message:
            error instanceof Error ? error.message : '图片生成失败，请重试',
        })
      })

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      restoreFocusRef.current?.focus()
    }
  }, [open, design])

  useEffect(() => {
    if (!previewUrl) return
    return () => URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const handleSave = () => {
    if (state.status !== 'ready') return
    downloadPng(state.blob)
    onToast('图片已开始下载')
  }

  const handleShare = async () => {
    if (state.status !== 'ready' || busy) return
    setBusy(true)
    try {
      const shared = await sharePng(state.blob)
      if (!shared) onToast('长按图片即可保存到相册')
    } catch {
      onToast('分享没有完成，请重试或长按图片保存')
    } finally {
      setBusy(false)
    }
  }

  const shareSupported =
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function'

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="export-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-title"
      >
        <button
          ref={closeRef}
          type="button"
          className="dialog-close"
          onClick={onClose}
          aria-label="关闭作品预览"
        >
          <IconClose size={20} />
        </button>

        <header className="export-heading">
          <span className="export-kicker">
            <IconSparkles size={14} />
            ATELIER PRESENTATION
          </span>
          <h2 id="export-title">你的项链，已经装裱完成</h2>
          <p>保存这张作品图，或直接分享给朋友。</p>
        </header>

        <div className="export-preview">
          {state.status === 'loading' && (
            <div className="export-loading" role="status">
              <span className="gold-spinner" />
              <p>正在为项链装裱</p>
            </div>
          )}

          {state.status === 'error' && (
            <div className="export-error" role="alert">
              <p>{state.message}</p>
              <button type="button" onClick={onClose}>
                返回画布
              </button>
            </div>
          )}

          {state.status === 'ready' && previewUrl && (
            <img
              src={previewUrl}
              alt="你的定制项链作品"
              className="export-image"
            />
          )}
        </div>

        <footer className="export-actions">
          <p className="export-hint">在 iPad 上长按图片，也可以直接存入「照片」。</p>
          <div className="export-buttons">
            {shareSupported && (
              <button
                type="button"
                className="button button--secondary"
                onClick={handleShare}
                disabled={state.status !== 'ready' || busy}
              >
                <IconShare size={18} />
                分享
              </button>
            )}
            <button
              type="button"
              className="button button--primary"
              onClick={handleSave}
              disabled={state.status !== 'ready'}
            >
              <IconDownload size={18} />
              保存图片
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
