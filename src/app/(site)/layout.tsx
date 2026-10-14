import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/features/site-settings'
import { resolveSiteUrl, robotsMetadata } from '@/shared'
import { montserrat } from '@/shared/fonts/montserrat'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  robots: robotsMetadata(),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body>
        <a
          href="#contenu"
          className="bg-primary text-on-primary label-md focus:top-sm focus:left-sm focus:px-md focus:py-sm sr-only focus:not-sr-only focus:fixed focus:z-50 focus:rounded-sm"
        >
          Aller au contenu
        </a>
        <main id="contenu">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
