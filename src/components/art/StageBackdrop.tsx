import { STAGE_HEIGHT, STAGE_WIDTH } from '../../game/necklace'

const SPARKLES = [
  { x: 133, y: 104, scale: 0.72, opacity: 0.38 },
  { x: 756, y: 138, scale: 0.48, opacity: 0.28 },
  { x: 105, y: 438, scale: 0.38, opacity: 0.24 },
  { x: 797, y: 402, scale: 0.62, opacity: 0.3 },
  { x: 334, y: 736, scale: 0.34, opacity: 0.22 },
  { x: 610, y: 96, scale: 0.28, opacity: 0.2 },
]

function Sparkle({
  x,
  y,
  scale,
  opacity,
}: {
  x: number
  y: number
  scale: number
  opacity: number
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      fill="#eedaa4"
      opacity={opacity}
    >
      <path d="M 0 -12 L 1.1 -1.1 L 12 0 L 1.1 1.1 L 0 12 L -1.1 1.1 L -12 0 L -1.1 -1.1 Z" />
    </g>
  )
}

function CornerOrnament({
  x,
  flip = false,
}: {
  x: number
  flip?: boolean
}) {
  return (
    <g
      transform={`translate(${x} 34) scale(${flip ? -1 : 1} 1)`}
      fill="none"
      stroke="#d9bb75"
      strokeOpacity="0.35"
      strokeWidth="0.8"
    >
      <path d="M 0 0 L 54 0 M 0 0 L 0 54 M 10 10 L 40 10 M 10 10 L 10 40" />
      <path d="M 18 18 L 31 18 L 18 31 Z" strokeOpacity="0.5" />
      <circle cx="48" cy="6" r="1.8" fill="#d9bb75" stroke="none" />
      <circle cx="6" cy="48" r="1.8" fill="#d9bb75" stroke="none" />
    </g>
  )
}

export function StageBackdrop({ signature = true }: { signature?: boolean }) {
  return (
    <>
      <defs>
        <radialGradient id="stage-velvet" cx="0.5" cy="0.46" r="0.72">
          <stop offset="0" stopColor="#18463b" />
          <stop offset="0.42" stopColor="#0e3029" />
          <stop offset="0.74" stopColor="#091f1b" />
          <stop offset="1" stopColor="#06130f" />
        </radialGradient>
        <radialGradient id="stage-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d8bd7d" stopOpacity="0.12" />
          <stop offset="0.5" stopColor="#7eb9a1" stopOpacity="0.04" />
          <stop offset="1" stopColor="#7eb9a1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="stage-silk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#d8e8dd" stopOpacity="0.035" />
          <stop offset="0.55" stopColor="#d8e8dd" stopOpacity="0.012" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="stage-vignette" cx="0.5" cy="0.47" r="0.75">
          <stop offset="0" stopColor="#000000" stopOpacity="0" />
          <stop offset="0.72" stopColor="#000000" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.46" />
        </radialGradient>
        <linearGradient id="stage-gold-text" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b7924d" />
          <stop offset="0.45" stopColor="#f2dea8" />
          <stop offset="1" stopColor="#a67c35" />
        </linearGradient>
      </defs>

      <rect
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        fill="url(#stage-velvet)"
      />

      <g opacity="0.75">
        <ellipse
          cx="450"
          cy="362"
          rx="378"
          ry="342"
          fill="url(#stage-glow)"
        />
        <ellipse
          cx="450"
          cy="418"
          rx="286"
          ry="270"
          fill="none"
          stroke="#dfc383"
          strokeOpacity="0.07"
          strokeWidth="1"
        />
        <ellipse
          cx="450"
          cy="418"
          rx="330"
          ry="310"
          fill="none"
          stroke="#dfc383"
          strokeOpacity="0.035"
          strokeWidth="0.8"
        />
        <path
          d="M -80 610 C 170 430 300 710 530 550 C 720 420 810 520 990 380 L 990 880 L -80 880 Z"
          fill="url(#stage-silk)"
        />
        <path
          d="M -60 240 C 220 390 340 110 560 240 C 740 346 850 170 980 250"
          fill="none"
          stroke="#d9e7de"
          strokeOpacity="0.035"
          strokeWidth="42"
        />
        <path
          d="M -40 690 C 200 560 390 790 610 660 C 780 560 880 630 960 580"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.028"
          strokeWidth="70"
        />
      </g>

      <g opacity="0.52">
        {SPARKLES.map((sparkle) => (
          <Sparkle key={`${sparkle.x}-${sparkle.y}`} {...sparkle} />
        ))}
      </g>

      <CornerOrnament x={38} />
      <CornerOrnament x={STAGE_WIDTH - 38} flip />

      <rect
        x="20"
        y="20"
        width={STAGE_WIDTH - 40}
        height={STAGE_HEIGHT - 40}
        rx="16"
        fill="none"
        stroke="#d7b872"
        strokeOpacity="0.16"
        strokeWidth="0.8"
      />
      <rect
        x="26"
        y="26"
        width={STAGE_WIDTH - 52}
        height={STAGE_HEIGHT - 52}
        rx="12"
        fill="none"
        stroke="#d7b872"
        strokeOpacity="0.07"
        strokeWidth="0.6"
      />

      <rect
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        fill="url(#stage-vignette)"
        pointerEvents="none"
      />

      {signature && (
        <g
          transform="translate(450 775)"
          textAnchor="middle"
          fill="url(#stage-gold-text)"
        >
          <path
            d="M -72 -6 L -60 6 L -48 -6 M -72 6 L -48 6"
            fill="none"
            stroke="#c7a65e"
            strokeOpacity="0.56"
            strokeWidth="0.8"
          />
          <path
            d="M 48 -6 L 60 6 L 72 -6 M 48 6 L 72 6"
            fill="none"
            stroke="#c7a65e"
            strokeOpacity="0.56"
            strokeWidth="0.8"
          />
          <text
            x="0"
            y="2"
            fontFamily="'Didot', 'Bodoni 72', 'Times New Roman', serif"
            fontSize="16"
            letterSpacing="6"
          >
            AURELIA
          </text>
          <text
            x="0"
            y="21"
            fill="#e4d3a5"
            fillOpacity="0.48"
            fontFamily="'Avenir Next', 'Helvetica Neue', sans-serif"
            fontSize="6.5"
            letterSpacing="4.4"
          >
            BESPOKE NECKLACE · No. 01
          </text>
        </g>
      )}
    </>
  )
}
