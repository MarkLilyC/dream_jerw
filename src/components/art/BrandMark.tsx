export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeLinejoin="round">
        <path
          d="M 24 4 L 36 16 L 24 44 L 12 16 Z"
          strokeWidth="1.4"
        />
        <path d="M 12 16 L 36 16 M 24 4 L 19 16 L 24 44 M 24 4 L 29 16 L 24 44" strokeWidth="0.9" opacity="0.78" />
        <path d="M 19 16 L 24 24 L 29 16 M 24 24 L 24 44" strokeWidth="0.7" opacity="0.5" />
      </g>
      <circle cx="24" cy="4" r="1.4" fill="currentColor" opacity="0.8" />
    </svg>
  )
}
