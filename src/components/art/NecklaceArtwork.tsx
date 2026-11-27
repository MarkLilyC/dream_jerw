import type { KeyboardEvent } from 'react'
import {
  CHAIN_ENDS,
  CHAIN_PATH,
  NECKLACE_SLOTS,
  STAGE_HEIGHT,
  STAGE_WIDTH,
} from '../../game/necklace'
import { getMaterial } from '../../game/materials'
import type { Design, NecklaceSlot } from '../../game/types'
import { GemArt } from './GemArt'
import { StageBackdrop } from './StageBackdrop'

interface NecklaceArtworkProps {
  design: Design
  interactive?: boolean
  activeMaterialId?: string | null
  selectedSlotId?: string | null
  recentSlotId?: string | null
  onSlotClick?: (slotId: string) => void
  onBackgroundClick?: () => void
  exportMode?: boolean
}

function slotName(slot: NecklaceSlot): string {
  if (slot.side === 'center') return '主石镶嵌位'
  return `${slot.side === 'left' ? '左侧' : '右侧'}第 ${slot.tier} 个镶嵌位`
}

function EmptySlotMark({ index }: { index: number }) {
  return (
    <g className="slot-empty-mark" style={{ animationDelay: `${index * 0.18}s` }}>
      <circle
        r="3"
        fill="#f3e5bc"
        fillOpacity="0.52"
        stroke="none"
      />
      <path
        d="M -10 0 L 10 0 M 0 -10 L 0 10"
        stroke="#f3e5bc"
        strokeOpacity="0.28"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </g>
  )
}

function Prong({ angle, radius }: { angle: number; radius: number }) {
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  const size = Math.max(1.5, radius * 0.075)
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={size} fill="url(#gold-metal)" stroke="#5d3e12" strokeWidth="0.5" />
      <circle
        cx={-size * 0.28}
        cy={-size * 0.28}
        r={size * 0.32}
        fill="#fff7d7"
        opacity="0.82"
      />
    </g>
  )
}

function Setting({ slot, index }: { slot: NecklaceSlot; index: number }) {
  const { radius } = slot
  const settingRadius = radius * 1.2
  return (
    <>
      <circle
        r={settingRadius + 5}
        fill="#020a07"
        opacity="0.52"
        filter="url(#setting-shadow)"
      />
      <circle
        r={settingRadius}
        fill="url(#gold-metal)"
        stroke="#5d3e12"
        strokeOpacity="0.8"
        strokeWidth="0.75"
      />
      <circle
        r={settingRadius - 2.2}
        fill="none"
        stroke="#fff1bb"
        strokeOpacity="0.33"
        strokeWidth="0.65"
      />
      <circle
        r={radius * 0.92}
        fill="#1e140a"
        stroke="#5f421a"
        strokeOpacity="0.9"
        strokeWidth="0.8"
      />
      <circle
        className="slot-empty-ring"
        r={radius * 0.66}
        fill="none"
        stroke="#ecd9a4"
        strokeOpacity="0.22"
        strokeWidth="0.8"
        strokeDasharray="2.4 5.2"
        strokeLinecap="round"
      />
      <EmptySlotMark index={index} />
    </>
  )
}

function JewelSlot({
  slot,
  index,
  design,
  interactive,
  activeMaterialId,
  selectedSlotId,
  recentSlotId,
  onSlotClick,
  exportMode,
}: {
  slot: NecklaceSlot
  index: number
  design: Design
  interactive: boolean
  activeMaterialId?: string | null
  selectedSlotId?: string | null
  recentSlotId?: string | null
  onSlotClick?: (slotId: string) => void
  exportMode: boolean
}) {
  const material = getMaterial(design[slot.id])
  const selected = selectedSlotId === slot.id
  const recent = recentSlotId === slot.id
  const label = `${slotName(slot)}${material ? `，已镶嵌${material.name}` : '，空置'}`

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSlotClick?.(slot.id)
    }
  }

  return (
    <g
      transform={`translate(${slot.x} ${slot.y})`}
      className={[
        'jewel-slot',
        material ? 'is-filled' : 'is-empty',
        selected ? 'is-selected' : '',
        activeMaterialId ? 'is-armed' : '',
        recent ? 'is-recent' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={
        interactive
          ? (event) => {
              event.stopPropagation()
              onSlotClick?.(slot.id)
            }
          : undefined
      }
      onKeyDown={interactive ? handleKeyDown : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      data-slot-id={slot.id}
      aria-label={interactive ? label : undefined}
      aria-pressed={interactive ? Boolean(material) : undefined}
      style={interactive ? { cursor: 'pointer' } : undefined}
    >
      <circle r={slot.radius * 1.55} fill="transparent" />
      {!exportMode && (
        <>
          <g className="slot-hover-ring">
            <circle
              r={slot.radius * 1.38}
              fill="none"
              stroke="#f7e5b5"
              strokeOpacity="0.7"
              strokeWidth="1.2"
            />
          </g>
          <circle
            className="slot-focus-ring"
            r={slot.radius * 1.48}
            fill="none"
            stroke="#f6dfa4"
            strokeWidth="1.6"
            strokeDasharray="3 4"
          />
        </>
      )}

      {material ? (
        <>
          <circle r={slot.radius * 1.32} fill="#f5d98e" opacity="0.07" />
          <circle r={slot.radius * 1.2} fill="url(#gold-metal)" stroke="#5d3e12" strokeOpacity="0.8" strokeWidth="0.75" />
          <circle r={slot.radius * 0.95} fill="#160e06" />
          <g transform={`scale(${(slot.radius / 50) * 0.96})`}>
            <GemArt material={material} uid={`slot-${slot.id}`} />
          </g>
          <Prong angle={Math.PI / 4} radius={slot.radius * 1.07} />
          <Prong angle={(Math.PI * 3) / 4} radius={slot.radius * 1.07} />
          <Prong angle={(Math.PI * 5) / 4} radius={slot.radius * 1.07} />
          <Prong angle={(Math.PI * 7) / 4} radius={slot.radius * 1.07} />
        </>
      ) : (
        <Setting slot={slot} index={index} />
      )}

      {!exportMode && (
        <g className="slot-selected-ring">
          <circle
            r={slot.radius * 1.56}
            fill="none"
            stroke="#ffe7ac"
            strokeWidth="1.4"
            strokeDasharray="5 6"
            strokeLinecap="round"
          />
        </g>
      )}

      {recent && (
        <g className="placement-burst" fill="#fff0c2">
          <path d="M 0 -42 L 0 -30 M 0 30 L 0 42 M -42 0 L -30 0 M 30 0 L 42 0" stroke="#fff0c2" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M -30 -30 L -23 -23 M 23 23 L 30 30 M -30 30 L -23 23 M 30 -30 L 23 -23" stroke="#fff0c2" strokeWidth="1" strokeLinecap="round" />
          <circle cx="-34" cy="-18" r="1.5" />
          <circle cx="35" cy="19" r="1.2" />
          <circle cx="-25" cy="30" r="1" />
        </g>
      )}
    </g>
  )
}

function ChainEnd({ x, y, flip }: { x: number; y: number; flip: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip} 1)`}>
      <circle r="8.5" fill="#071711" opacity="0.65" />
      <circle
        r="7.2"
        fill="url(#gold-metal)"
        stroke="#644515"
        strokeOpacity="0.8"
        strokeWidth="0.7"
      />
      <circle r="4.1" fill="#0b211a" />
      <path
        d="M 0 -16 C 9 -22 14 -15 9 -9"
        fill="none"
        stroke="#e1c37f"
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />
      <circle cx="9" cy="-9" r="2.2" fill="url(#gold-metal)" />
    </g>
  )
}

function CenterOrnament() {
  return (
    <g className="center-filigree">
      <g
        transform="translate(450 610)"
        fill="none"
        stroke="#e1c583"
        strokeOpacity="0.28"
        strokeWidth="0.8"
      >
        {Array.from({ length: 8 }, (_, index) => (
          <path
            key={index}
            d="M 0 -59 C 18 -77 38 -77 48 -58 C 54 -47 44 -39 35 -47 C 27 -54 31 -68 44 -74"
            transform={`rotate(${index * 45})`}
            opacity={index % 2 === 0 ? 0.9 : 0.45}
          />
        ))}
        {Array.from({ length: 16 }, (_, index) => {
          const angle = (Math.PI * 2 * index) / 16
          const radius = 65
          return (
            <circle
              key={index}
              cx={Math.cos(angle) * radius}
              cy={Math.sin(angle) * radius}
              r={index % 2 === 0 ? 1.55 : 1.05}
              fill="#e7cc8c"
              stroke="none"
              opacity={index % 2 === 0 ? 0.55 : 0.32}
            />
          )
        })}
      </g>
      <g transform="translate(450 660)" fill="none" stroke="#d9bb78" strokeOpacity="0.5" strokeWidth="1">
        <path d="M 0 0 L 0 18" />
        <circle cx="0" cy="4" r="2.5" fill="#d9bb78" stroke="none" opacity="0.65" />
        <path
          d="M 0 20 C 12 29 12 43 0 53 C -12 43 -12 29 0 20 Z"
          fill="url(#gold-metal)"
          stroke="#5d3e12"
          strokeOpacity="0.7"
        />
        <circle cx="0" cy="34" r="4.2" fill="#17352c" stroke="#f2ddab" strokeOpacity="0.45" />
      </g>
    </g>
  )
}

export function NecklaceArtwork({
  design,
  interactive = false,
  activeMaterialId,
  selectedSlotId,
  recentSlotId,
  onSlotClick,
  onBackgroundClick,
  exportMode = false,
}: NecklaceArtworkProps) {
  return (
    <svg
      viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
      width={STAGE_WIDTH}
      height={STAGE_HEIGHT}
      className="necklace-artwork"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      role={interactive ? 'application' : 'img'}
      aria-label={interactive ? '可交互的定制项链设计画布' : '定制项链作品'}
      onClick={interactive ? onBackgroundClick : undefined}
    >
      <defs>
        <linearGradient id="gold-metal" x1="0.08" y1="0.02" x2="0.86" y2="0.98">
          <stop offset="0" stopColor="#694412" />
          <stop offset="0.16" stopColor="#b98536" />
          <stop offset="0.38" stopColor="#f5db96" />
          <stop offset="0.52" stopColor="#fff3c6" />
          <stop offset="0.68" stopColor="#d1a355" />
          <stop offset="0.86" stopColor="#9c6c27" />
          <stop offset="1" stopColor="#5b380c" />
        </linearGradient>
        <linearGradient id="chain-gold" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0" stopColor="#8f672b" />
          <stop offset="0.24" stopColor="#e4c276" />
          <stop offset="0.48" stopColor="#fff0b7" />
          <stop offset="0.73" stopColor="#c99b4b" />
          <stop offset="1" stopColor="#7d561e" />
        </linearGradient>
        <filter id="setting-shadow" x="-65%" y="-65%" width="230%" height="230%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id="chain-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.2" floodColor="#000000" floodOpacity="0.55" />
        </filter>
      </defs>

      <StageBackdrop />

      <g aria-hidden="true">
        <path
          d={CHAIN_PATH}
          fill="none"
          stroke="#020a07"
          strokeOpacity="0.38"
          strokeWidth="15"
          filter="url(#chain-shadow)"
        />
        <path
          d={CHAIN_PATH}
          fill="none"
          stroke="#5f4016"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d={CHAIN_PATH}
          fill="none"
          stroke="url(#chain-gold)"
          strokeWidth="5.1"
          strokeLinecap="round"
        />
        <path
          d={CHAIN_PATH}
          fill="none"
          stroke="#fff5cc"
          strokeOpacity="0.58"
          strokeWidth="1.15"
          strokeLinecap="round"
        />

        {CHAIN_ENDS.map((end) => (
          <ChainEnd key={`${end.x}-${end.y}`} {...end} />
        ))}

        <CenterOrnament />
      </g>

      <g className="slots">
        {NECKLACE_SLOTS.map((slot, index) => (
          <JewelSlot
            key={slot.id}
            slot={slot}
            index={index}
            design={design}
            interactive={interactive}
            activeMaterialId={activeMaterialId}
            selectedSlotId={selectedSlotId}
            recentSlotId={exportMode ? null : recentSlotId}
            onSlotClick={onSlotClick}
            exportMode={exportMode}
          />
        ))}
      </g>
    </svg>
  )
}
