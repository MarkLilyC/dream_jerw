import {
  CATEGORIES,
  MATERIALS_BY_CATEGORY,
  getMaterial,
} from '../game/materials'
import type { Material, MaterialCategory } from '../game/types'
import { BrandMark } from './art/BrandMark'
import { MaterialThumbnail } from './art/GemArt'
import {
  IconCharm,
  IconCheck,
  IconDiamond,
  IconGem,
  IconPearl,
  IconSparkles,
  IconTrash,
} from './Icons'

interface MaterialTrayProps {
  activeCategory: MaterialCategory
  selectedMaterialId: string | null
  hasDesign: boolean
  savedAtLabel: string | null
  onCategoryChange: (category: MaterialCategory) => void
  onMaterialSelect: (material: Material) => void
  onRandom: () => void
  onClear: () => void
}

const CATEGORY_ICONS = {
  diamond: IconDiamond,
  gem: IconGem,
  pearl: IconPearl,
  charm: IconCharm,
}

function CategoryIcon({ category }: { category: MaterialCategory }) {
  const Icon = CATEGORY_ICONS[category]
  return <Icon size={15} />
}

export function MaterialTray({
  activeCategory,
  selectedMaterialId,
  hasDesign,
  savedAtLabel,
  onCategoryChange,
  onMaterialSelect,
  onRandom,
  onClear,
}: MaterialTrayProps) {
  const materials = MATERIALS_BY_CATEGORY[activeCategory]
  const selectedMaterial = getMaterial(selectedMaterialId ?? undefined)

  return (
    <section className="material-tray" aria-label="珠宝材质库">
      <div className="tray-top">
        <div className="tray-tabs" role="tablist" aria-label="材质分类">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === category.id}
              className={`tray-tab ${
                activeCategory === category.id ? 'is-active' : ''
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <CategoryIcon category={category.id} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        <div className="tray-actions">
          {savedAtLabel && (
            <span className="save-status" aria-label={`已自动保存于${savedAtLabel}`}>
              <IconCheck size={13} />
              <span>{savedAtLabel} 已保存</span>
            </span>
          )}
          <button
            type="button"
            className="tray-action tray-action--surprise"
            onClick={onRandom}
          >
            <IconSparkles size={17} />
            <span>随机搭配</span>
          </button>
          <button
            type="button"
            className="tray-action tray-action--icon"
            onClick={onClear}
            disabled={!hasDesign}
            aria-label="清空项链"
            title="清空项链"
          >
            <IconTrash size={17} />
          </button>
        </div>
      </div>

      <div
        className="material-scroller"
        role="tabpanel"
        aria-label={`${activeCategory} 材质`}
      >
        <div className="material-list">
          {materials.map((material) => {
            const selected = selectedMaterialId === material.id
            return (
              <button
                key={material.id}
                type="button"
                className={`material-card ${
                  selected ? 'is-selected' : ''
                }`}
                onClick={() => onMaterialSelect(material)}
                aria-pressed={selected}
                title={material.description}
              >
                <span className="material-art">
                  <span className="material-halo" aria-hidden="true" />
                  <MaterialThumbnail
                    material={material}
                    className="material-thumb"
                  />
                </span>
                <span className="material-name">{material.name}</span>
                {selected && (
                  <span className="material-check" aria-hidden="true">
                    <IconCheck size={11} />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <aside className="tray-note" aria-live="polite">
        <span className="tray-note-art">
          {selectedMaterial ? (
            <MaterialThumbnail
              material={selectedMaterial}
              className="tray-note-thumb"
            />
          ) : (
            <BrandMark className="tray-note-mark" />
          )}
        </span>
        <span className="tray-note-copy">
          <span className="tray-note-kicker">
            {selectedMaterial ? 'CURRENT DETAIL' : 'ATELIER NOTE'}
          </span>
          <strong>
            {selectedMaterial ? selectedMaterial.name : '从一颗主石开始'}
          </strong>
          <p>
            {selectedMaterial
              ? selectedMaterial.description
              : '先点亮主石，再向两侧慢慢铺陈，让整条项链有呼吸。'}
          </p>
        </span>
      </aside>
    </section>
  )
}
