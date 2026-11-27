import { NECKLACE_SLOTS, SLOT_BY_ID } from '../game/necklace'
import { getMaterial } from '../game/materials'
import type { Design, Material } from '../game/types'
import { NecklaceArtwork } from './art/NecklaceArtwork'
import { MaterialThumbnail } from './art/GemArt'
import { IconClose, IconSparkles, IconTrash } from './Icons'

interface StageProps {
  design: Design
  activeMaterial: Material | null
  selectedSlotId: string | null
  recentSlotId: string | null
  onSlotClick: (slotId: string) => void
  onBackgroundClick: () => void
  onRemoveSelectedSlot: () => void
  onCancelMaterial: () => void
}

export function Stage({
  design,
  activeMaterial,
  selectedSlotId,
  recentSlotId,
  onSlotClick,
  onBackgroundClick,
  onRemoveSelectedSlot,
  onCancelMaterial,
}: StageProps) {
  const filledCount = Object.keys(design).length
  const selectedSlot = selectedSlotId ? SLOT_BY_ID.get(selectedSlotId) : null
  const selectedMaterial = selectedSlot
    ? getMaterial(design[selectedSlot.id])
    : undefined

  const mode = activeMaterial
    ? 'armed'
    : selectedMaterial
      ? 'slot'
      : 'idle'

  return (
    <section className="stage" aria-label="项链设计画布">
      <div className="stage-art">
        <NecklaceArtwork
          design={design}
          interactive
          activeMaterialId={activeMaterial?.id}
          selectedSlotId={selectedSlotId}
          recentSlotId={recentSlotId}
          onSlotClick={onSlotClick}
          onBackgroundClick={onBackgroundClick}
        />
      </div>

      <div className="stage-meta" aria-hidden="true">
        <div className="stage-eyebrow">
          <span>THE NECKLACE</span>
          <i />
          <span className="stage-eyebrow-cn">主石项链</span>
        </div>
        <div className="stage-count">
          <span className="stage-count-dot" />
          <span>
            {filledCount} / {NECKLACE_SLOTS.length} 已镶嵌
          </span>
        </div>
      </div>

      <div className={`stage-context stage-context--${mode}`} aria-live="polite">
        {mode === 'armed' && activeMaterial && (
          <>
            <span className="context-thumb">
              <MaterialThumbnail material={activeMaterial} />
            </span>
            <span className="context-copy">
              <strong>{activeMaterial.name}</strong>
              <small>点击任意镶嵌位放置</small>
            </span>
            <span className="context-tip">
              <IconSparkles size={15} />
              可连续镶嵌
            </span>
            <button
              type="button"
              className="context-close"
              onClick={onCancelMaterial}
              aria-label="取消选择材质"
            >
              <IconClose size={17} />
            </button>
          </>
        )}

        {mode === 'slot' && selectedMaterial && (
          <>
            <span className="context-thumb">
              <MaterialThumbnail material={selectedMaterial} />
            </span>
            <span className="context-copy">
              <strong>{selectedMaterial.name}</strong>
              <small>{selectedMaterial.description}</small>
            </span>
            <button
              type="button"
              className="context-remove"
              onClick={onRemoveSelectedSlot}
            >
              <IconTrash size={15} />
              取下
            </button>
            <button
              type="button"
              className="context-close"
              onClick={onBackgroundClick}
              aria-label="关闭镶嵌位信息"
            >
              <IconClose size={17} />
            </button>
          </>
        )}

        {mode === 'idle' && (
          <>
            <span className="context-orbit" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="context-copy context-copy--idle">
              <strong>
                {filledCount === 0
                  ? '从一件材质开始'
                  : filledCount === NECKLACE_SLOTS.length
                    ? '全部镶嵌完成'
                    : '继续完善你的作品'}
              </strong>
              <small>
                {filledCount === 0
                  ? '选择下方材质，再点亮项链上的镶嵌位'
                  : '点击任意材质，或点选槽位查看细节'}
              </small>
            </span>
          </>
        )}
      </div>
    </section>
  )
}
