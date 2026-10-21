import type { ReactNode } from 'react'
import { SiteHeader } from '@/features/site-settings'

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="contenu">{children}</main>
    </>
  )
}
