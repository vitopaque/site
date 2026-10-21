import type { ReactNode } from 'react'
import { barlow, barlowCondensed } from '@/shared/fonts/barlow'
import { SiteFooter } from './SiteFooter'

export function SiteDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <a
          href="#contenu"
          className="bg-accent-900 text-background label-btn sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2"
        >
          Aller au contenu
        </a>
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
