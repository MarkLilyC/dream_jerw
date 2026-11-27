import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { NecklaceArtwork } from '../components/art/NecklaceArtwork'
import { STAGE_HEIGHT, STAGE_WIDTH } from './necklace'
import type { Design } from './types'

const OUTPUT_WIDTH = 1800
const OUTPUT_HEIGHT = Math.round(
  (OUTPUT_WIDTH / STAGE_WIDTH) * STAGE_HEIGHT,
)

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('无法读取作品图像'))
    image.src = url
  })
}

export async function createExportPng(design: Design): Promise<Blob> {
  await document.fonts?.ready

  const markup = renderToStaticMarkup(
    createElement(NecklaceArtwork, { design, exportMode: true }),
  )
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n${markup}`
  const svgUrl = URL.createObjectURL(
    new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }),
  )

  try {
    const image = await loadImage(svgUrl)
    const canvas = document.createElement('canvas')
    canvas.width = OUTPUT_WIDTH
    canvas.height = OUTPUT_HEIGHT
    const context = canvas.getContext('2d')
    if (!context) throw new Error('浏览器没有提供绘图画布')

    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'
    context.drawImage(image, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT)

    const png = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/png', 1)
    })
    if (!png) throw new Error('图片生成失败，请重试')
    return png
  } finally {
    URL.revokeObjectURL(svgUrl)
  }
}

export function exportFileName(): string {
  const now = new Date()
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('')
  return `aurelia-necklace-${stamp}.png`
}

export function downloadPng(blob: Blob): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = exportFileName()
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1500)
}

export async function sharePng(blob: Blob): Promise<boolean> {
  if (typeof navigator.share !== 'function') return false

  const file = new File([blob], exportFileName(), { type: 'image/png' })
  const fileList = [file]
  if (
    typeof navigator.canShare !== 'function' ||
    !navigator.canShare({ files: fileList })
  ) {
    return false
  }

  try {
    await navigator.share({
      files: fileList,
      title: 'Aurelia 定制项链',
      text: '我在 Aurelia 工坊设计了一条项链。',
    })
    return true
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return false
    }
    throw error
  }
}
