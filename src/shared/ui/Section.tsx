import type { ReactNode } from 'react'

const TONES = {
  light: 'bg-background text-foreground',
  surface: 'bg-surface text-foreground',
  dark: 'on-dark bg-accent-900 text-background',
} as const

type Props = {
  id?: string
  labelledBy?: string
  tone?: keyof typeof TONES
  className?: string
  children: ReactNode
}

export function Section({ id, labelledBy, tone = 'light', className = '', children }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${TONES[tone]} ${className}`}>
      <div className="max-w-page px-margin py-section mx-auto">{children}</div>
    </section>
  )
}
