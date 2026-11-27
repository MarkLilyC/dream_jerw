import type { Material, MaterialShape } from '../../game/types'

interface GemArtProps {
  material: Material
  uid: string
}

const SILHOUETTES: Record<
  Exclude<MaterialShape, 'star' | 'flower' | 'bow' | 'leaf'>,
  string
> = {
  round: 'M 0 -47 A 47 47 0 1 1 0 47 A 47 47 0 1 1 0 -47 Z',
  oval: 'M 0 -48 C 25 -48 37 -27 37 0 C 37 27 25 48 0 48 C -25 48 -37 27 -37 0 C -37 -27 -25 -48 0 -48 Z',
  pear: 'M 0 -49 C 17 -38 38 -18 38 11 C 38 36 22 49 0 49 C -22 49 -38 36 -38 11 C -38 -18 -17 -38 0 -49 Z',
  emerald:
    'M -29 -46 L 29 -46 L 44 -31 L 44 31 L 29 46 L -29 46 L -44 31 L -44 -31 Z',
  pearl: 'M 0 -47 A 47 47 0 1 1 0 47 A 47 47 0 1 1 0 -47 Z',
}

function polylinePath(
  count: number,
  inner: number,
  outer: number,
  offset = 0,
): string {
  const points: string[] = []
  const step = (Math.PI * 2) / count
  for (let index = 0; index < count; index += 1) {
    const angle = offset + index * step
    points.push(
      `${(Math.cos(angle) * outer).toFixed(2)} ${(
        Math.sin(angle) * outer
      ).toFixed(2)}`,
    )
    const innerAngle = angle + step / 2
    points.push(
      `${(Math.cos(innerAngle) * inner).toFixed(2)} ${(
        Math.sin(innerAngle) * inner
      ).toFixed(2)}`,
    )
  }
  return `M ${points.join(' L ')} Z`
}

function starPath(points = 5, outer = 43, inner = 18): string {
  const coordinates: string[] = []
  for (let index = 0; index < points * 2; index += 1) {
    const radius = index % 2 === 0 ? outer : inner
    const angle = -Math.PI / 2 + (index * Math.PI) / points
    coordinates.push(
      `${(Math.cos(angle) * radius).toFixed(2)} ${(
        Math.sin(angle) * radius
      ).toFixed(2)}`,
    )
  }
  return `M ${coordinates.join(' L ')} Z`
}

function Defs({ material, uid }: GemArtProps) {
  const { colors } = material
  return (
    <defs>
      <linearGradient
        id={`${uid}-body`}
        x1="0.12"
        y1="0.05"
        x2="0.82"
        y2="0.95"
      >
        <stop offset="0" stopColor={colors.dark} />
        <stop offset="0.3" stopColor={colors.mid} />
        <stop offset="0.58" stopColor={colors.light} />
        <stop offset="0.8" stopColor={colors.mid} />
        <stop offset="1" stopColor={colors.dark} />
      </linearGradient>
      <radialGradient id={`${uid}-table`} cx="0.4" cy="0.32" r="0.75">
        <stop offset="0" stopColor={colors.light} stopOpacity="0.98" />
        <stop offset="0.55" stopColor={colors.rim} stopOpacity="0.76" />
        <stop offset="1" stopColor={colors.mid} stopOpacity="0.42" />
      </radialGradient>
      <radialGradient id={`${uid}-glint`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.28" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${uid}-pearl`} cx="0.34" cy="0.26" r="0.84">
        <stop offset="0" stopColor={colors.rim} />
        <stop offset="0.26" stopColor={colors.light} />
        <stop offset="0.62" stopColor={colors.mid} />
        <stop offset="0.88" stopColor={colors.dark} />
        <stop offset="1" stopColor={colors.dark} />
      </radialGradient>
      <linearGradient id={`${uid}-iridescence`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#a9e8d8" stopOpacity="0.5" />
        <stop offset="0.42" stopColor="#fff4d8" stopOpacity="0.06" />
        <stop offset="0.72" stopColor="#f6c5d8" stopOpacity="0.38" />
        <stop offset="1" stopColor="#c8d8ff" stopOpacity="0.22" />
      </linearGradient>
      <linearGradient
        id={`${uid}-gold`}
        x1="0.12"
        y1="0.06"
        x2="0.84"
        y2="0.96"
      >
        <stop offset="0" stopColor="#7b5419" />
        <stop offset="0.22" stopColor="#c79a47" />
        <stop offset="0.48" stopColor="#fff1b6" />
        <stop offset="0.7" stopColor="#d0a454" />
        <stop offset="1" stopColor="#6d4714" />
      </linearGradient>
      <filter
        id={`${uid}-shadow`}
        x="-45%"
        y="-45%"
        width="190%"
        height="190%"
      >
        <feDropShadow
          dx="0"
          dy="1.8"
          stdDeviation="2.2"
          floodColor="#020a08"
          floodOpacity="0.45"
        />
      </filter>
      {!['pearl', 'star', 'flower', 'bow', 'leaf'].includes(
        material.shape,
      ) && (
        <clipPath id={`${uid}-clip`}>
          <path
            d={
              SILHOUETTES[
                material.shape as Exclude<
                  MaterialShape,
                  'star' | 'flower' | 'bow' | 'leaf'
                >
              ]
            }
          />
        </clipPath>
      )}
    </defs>
  )
}

function GemSparkle({ x = -24, y = -27, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="#ffffff">
      <path
        d="M 0 -8 L 1.3 -1.3 L 8 0 L 1.3 1.3 L 0 8 L -1.3 1.3 L -8 0 L -1.3 -1.3 Z"
        opacity="0.96"
      />
      <circle cx="8.5" cy="-7.5" r="1.35" opacity="0.78" />
    </g>
  )
}

function FacetedGem({ material, uid }: GemArtProps) {
  const shape = material.shape as Exclude<
    MaterialShape,
    'star' | 'flower' | 'bow' | 'leaf' | 'pearl'
  >
  const silhouette = SILHOUETTES[shape]
  const { colors } = material
  const rayCount = shape === 'emerald' ? 8 : shape === 'round' ? 14 : 12

  return (
    <>
      <path
        d={silhouette}
        fill={`url(#${uid}-body)`}
        stroke={colors.rim}
        strokeOpacity="0.72"
        strokeWidth="1.6"
      />

      <g clipPath={`url(#${uid}-clip)`}>
        {shape === 'emerald' ? (
          <>
            <path
              d={silhouette}
              transform="scale(0.82)"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.28"
              strokeWidth="1.1"
            />
            <path
              d={silhouette}
              transform="scale(0.64)"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.34"
              strokeWidth="1.2"
            />
            <path
              d={silhouette}
              transform="scale(0.46)"
              fill={`url(#${uid}-table)`}
              stroke="#ffffff"
              strokeOpacity="0.42"
              strokeWidth="1.2"
            />
            <path
              d="M -44 -31 L 0 -31 L 44 -31 M -44 31 L 0 31 L 44 31 M -29 -46 L -29 46 M 29 -46 L 29 46"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.12"
              strokeWidth="1"
            />
          </>
        ) : (
          <>
            <g
              stroke="#ffffff"
              strokeOpacity="0.2"
              strokeWidth="0.95"
              fill="none"
            >
              {Array.from({ length: rayCount }, (_, index) => {
                const angle = (Math.PI * 2 * index) / rayCount
                const inner = 23
                const outer = 52
                return (
                  <line
                    key={index}
                    x1={Math.cos(angle) * inner}
                    y1={Math.sin(angle) * inner}
                    x2={Math.cos(angle) * outer}
                    y2={Math.sin(angle) * outer}
                  />
                )
              })}
            </g>
            <path
              d={polylinePath(rayCount, 20, 25, -Math.PI / rayCount)}
              fill={`url(#${uid}-table)`}
              stroke="#ffffff"
              strokeOpacity="0.46"
              strokeWidth="1"
            />
            <ellipse
              cx="-14"
              cy="-20"
              rx="29"
              ry="12"
              transform="rotate(-34 -14 -20)"
              fill={`url(#${uid}-glint)`}
              opacity="0.7"
            />
          </>
        )}

        <path
          d="M -50 22 C -25 43 25 47 48 22"
          fill="none"
          stroke={colors.dark}
          strokeOpacity="0.2"
          strokeWidth="8"
        />
        <GemSparkle />
      </g>
    </>
  )
}

function PearlArt({ material, uid }: GemArtProps) {
  const { colors } = material
  return (
    <>
      <circle
        r="46"
        fill={`url(#${uid}-pearl)`}
        stroke={colors.rim}
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <circle r="46" fill={`url(#${uid}-iridescence)`} opacity="0.65" />
      <ellipse
        cx="-15"
        cy="-18"
        rx="22"
        ry="13"
        transform="rotate(-32 -15 -18)"
        fill={`url(#${uid}-glint)`}
      />
      <ellipse
        cx="17"
        cy="23"
        rx="19"
        ry="10"
        transform="rotate(32 17 23)"
        fill={colors.rim}
        opacity="0.14"
      />
      <circle cx="-13" cy="-17" r="3.8" fill="#ffffff" opacity="0.48" />
    </>
  )
}

function StarCharm({ uid }: { uid: string }) {
  return (
    <>
      <circle
        cx="0"
        cy="-49"
        r="6"
        fill="none"
        stroke={`url(#${uid}-gold)`}
        strokeWidth="3"
      />
      <path
        d={starPath(5, 43, 18)}
        fill={`url(#${uid}-gold)`}
        stroke="#6b4412"
        strokeOpacity="0.65"
        strokeWidth="1.2"
      />
      <path
        d={starPath(5, 28, 11)}
        fill="none"
        stroke="#fff5ca"
        strokeOpacity="0.55"
        strokeWidth="1.1"
      />
      <circle cx="-8" cy="-13" r="2" fill="#fff8d6" opacity="0.82" />
    </>
  )
}

function FlowerCharm({ uid }: { uid: string }) {
  return (
    <>
      <circle
        cx="0"
        cy="-49"
        r="6"
        fill="none"
        stroke={`url(#${uid}-gold)`}
        strokeWidth="3"
      />
      {Array.from({ length: 5 }, (_, index) => (
        <path
          key={index}
          d="M 0 -5 C 14 -17 29 -13 29 -1 C 29 12 14 16 0 5 Z"
          transform={`rotate(${index * 72})`}
          fill={`url(#${uid}-gold)`}
          stroke="#6b4412"
          strokeOpacity="0.52"
          strokeWidth="1"
        />
      ))}
      <circle r="11" fill={`url(#${uid}-gold)`} stroke="#6b4412" strokeOpacity="0.5" />
      <circle r="5.4" fill="#fff7d9" stroke="#a3752b" strokeOpacity="0.4" />
      <circle cx="-3.4" cy="-3.4" r="1.9" fill="#ffffff" opacity="0.72" />
    </>
  )
}

function BowCharm({ uid }: { uid: string }) {
  const stroke = { stroke: '#6b4412', strokeOpacity: 0.55, strokeWidth: 1.1 }
  return (
    <>
      <circle cx="0" cy="-48" r="6" fill="none" stroke={`url(#${uid}-gold)`} strokeWidth="3" />
      <g fill={`url(#${uid}-gold)`} {...stroke}>
        <path d="M -4 3 C -22 -27 -48 -21 -45 -2 C -42 18 -20 20 -3 8 Z" />
        <path d="M 4 3 C 22 -27 48 -21 45 -2 C 42 18 20 20 3 8 Z" />
        <path d="M -4 10 C -16 27 -20 37 -28 46 C -12 42 -4 32 1 18 Z" />
        <path d="M 4 10 C 16 27 20 37 28 46 C 12 42 4 32 -1 18 Z" />
      </g>
      <ellipse cx="0" cy="4" rx="10" ry="12" fill={`url(#${uid}-gold)`} {...stroke} />
      <path
        d="M -30 -10 C -22 -14 -12 -10 -6 -2 M 30 -10 C 22 -14 12 -10 6 -2"
        fill="none"
        stroke="#fff4c9"
        strokeOpacity="0.58"
        strokeWidth="1.4"
      />
      <circle cx="-1" cy="3" r="2.4" fill="#fff9df" opacity="0.8" />
    </>
  )
}

function LeafCharm({ uid }: { uid: string }) {
  return (
    <>
      <circle cx="0" cy="-49" r="6" fill="none" stroke={`url(#${uid}-gold)`} strokeWidth="3" />
      <path
        d="M 0 -44 C 33 -27 41 7 0 47 C -41 7 -33 -27 0 -44 Z"
        fill={`url(#${uid}-gold)`}
        stroke="#6b4412"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
      <path
        d="M 0 -34 C 3 -12 1 20 0 38 M 0 -8 L -19 -16 M 0 2 L 18 -8 M -1 13 L -14 5 M 1 18 L 13 10"
        fill="none"
        stroke="#fff4c9"
        strokeOpacity="0.52"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse
        cx="-12"
        cy="-16"
        rx="8"
        ry="16"
        transform="rotate(-28 -12 -16)"
        fill="#ffffff"
        opacity="0.12"
      />
    </>
  )
}

export function GemArt({ material, uid }: GemArtProps) {
  return (
    <g className={`gem-art gem-art--${material.shape}`}>
      <Defs material={material} uid={uid} />
      <g filter={`url(#${uid}-shadow)`}>
        {material.shape === 'pearl' ? (
          <PearlArt material={material} uid={uid} />
        ) : material.shape === 'star' ? (
          <StarCharm uid={uid} />
        ) : material.shape === 'flower' ? (
          <FlowerCharm uid={uid} />
        ) : material.shape === 'bow' ? (
          <BowCharm uid={uid} />
        ) : material.shape === 'leaf' ? (
          <LeafCharm uid={uid} />
        ) : (
          <FacetedGem material={material} uid={uid} />
        )}
      </g>
    </g>
  )
}

export function MaterialThumbnail({
  material,
  className,
}: {
  material: Material
  className?: string
}) {
  return (
    <svg
      viewBox="-56 -58 112 112"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <GemArt material={material} uid={`thumb-${material.id}`} />
    </svg>
  )
}
