import type { ReactNode } from 'react'
import { SiteHeader } from '@/features/site-settings'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader variant="overlay" />
      <main id="contenu">{children}</main>
    </>
  )
}
