import Link from 'next/link'
import type { ReactNode } from 'react'

const VARIANTS = {
  primary: 'bg-accent-700 text-background hover:bg-accent-900',
  'primary-inverse':
    'blueprint blueprint-inverse bg-background text-accent-900 hover:bg-accent-200',
} as const

type Props = {
  href: string
  variant: keyof typeof VARIANTS
  className?: string
  children: ReactNode
}

export function ButtonLink({ href, variant, className = '', children }: Props) {
  return (
    <Link
      href={href}
      className={`label-btn-lg inline-flex min-h-11 items-center px-6 py-3.5 ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}
