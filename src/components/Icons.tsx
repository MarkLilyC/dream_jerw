import type { ReactNode } from 'react'

interface IconProps {
  size?: number
  className?: string
}

function IconBase({
  size = 22,
  className,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export function IconUndo(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9.2 6.2 4.5 10.9l4.7 4.7" />
      <path d="M5 10.9h8.4a5.9 5.9 0 1 1 0 11.8h-1.2" />
    </IconBase>
  )
}

export function IconRedo(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m14.8 6.2 4.7 4.7-4.7 4.7" />
      <path d="M19 10.9h-8.4a5.9 5.9 0 1 0 0 11.8h1.2" />
    </IconBase>
  )
}

export function IconSparkles(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.2c.6 4.6 2.2 6.2 6.8 6.8-4.6.6-6.2 2.2-6.8 6.8-.6-4.6-2.2-6.2-6.8-6.8 4.6-.6 6.2-2.2 6.8-6.8Z" />
      <path d="M19 15.5c.25 1.9.9 2.55 2.8 2.8-1.9.25-2.55.9-2.8 2.8-.25-1.9-.9-2.55-2.8-2.8 1.9-.25 2.55-.9 2.8-2.8Z" />
      <path d="M5.1 3.6c.14 1.1.5 1.46 1.6 1.6-1.1.14-1.46.5-1.6 1.6C4.96 5.7 4.6 5.34 3.5 5.2c1.1-.14 1.46-.5 1.6-1.6Z" />
    </IconBase>
  )
}

export function IconTrash(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16M9 3.8h6M6.5 7l.8 12.1a1.6 1.6 0 0 0 1.6 1.5h6.2a1.6 1.6 0 0 0 1.6-1.5L17.5 7" />
      <path d="M10 11v5.6M14 11v5.6" />
    </IconBase>
  )
}

export function IconDownload(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.5v11.2M7.8 10.6 12 14.8l4.2-4.2" />
      <path d="M4.5 16.4v2.2a1.9 1.9 0 0 0 1.9 1.9h11.2a1.9 1.9 0 0 0 1.9-1.9v-2.2" />
    </IconBase>
  )
}

export function IconShare(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 15.5V3.8M8.2 7.5 12 3.7l3.8 3.8" />
      <path d="M5 12.6v6.1a1.8 1.8 0 0 0 1.8 1.8h10.4a1.8 1.8 0 0 0 1.8-1.8v-6.1" />
    </IconBase>
  )
}

export function IconClose(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </IconBase>
  )
}

export function IconCheck(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m4.7 12.7 4.4 4.4 10.2-10.2" />
    </IconBase>
  )
}

export function IconArrow(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5" />
    </IconBase>
  )
}

export function IconDiamond(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.4 17 9l-5 11.6L7 9l5-5.6Z" />
      <path d="M7 9h10M12 3.4 9.8 9l2.2 11.6L14.2 9 12 3.4Z" opacity="0.68" />
    </IconBase>
  )
}

export function IconGem(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 4h10l4 5.6L12 21 3 9.6 7 4Z" />
      <path d="M3 9.6h18M9 4l3 5.6L15 4M12 9.6V21" />
    </IconBase>
  )
}

export function IconPearl(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12.4" r="7.6" />
      <path d="M8.3 9.5c1.6-1.7 4.1-2 5.7-.8" opacity="0.62" />
    </IconBase>
  )
}

export function IconCharm(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3.5 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.5Z" />
    </IconBase>
  )
}
