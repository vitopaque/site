import type { Metadata } from 'next'
import { NotFoundContent } from '@/features/services'
import { SiteDocument, SiteHeader } from '@/features/site-settings'
import { resolveSiteUrl } from '@/shared'
import './(site)/globals.css'

export const metadata: Metadata = {
  title: 'Page introuvable',
  metadataBase: resolveSiteUrl(),
  robots: { index: false, follow: false },
}

export default function GlobalNotFound() {
  return (
    <SiteDocument>
      <SiteHeader />
      <main id="contenu">
        <NotFoundContent />
      </main>
    </SiteDocument>
  )
}
