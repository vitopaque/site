import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SiteDocument } from '@/features/site-settings'
import { resolveSiteUrl, robotsMetadata } from '@/shared'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  robots: robotsMetadata(),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <SiteDocument>{children}</SiteDocument>
}
