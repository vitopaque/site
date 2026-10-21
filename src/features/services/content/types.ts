import type { StaticImageData } from 'next/image'
import type { ComponentType } from 'react'

import type { Univers } from '@/shared/payload/univers'
import type { BeforeAfterPair } from '@/shared/ui/BeforeAfter'
import type { FaqItem } from '@/shared/ui/FaqList'
import type { SectionTitle } from '@/shared/ui/SectionHeading'

export type PageSeo = { title: string; description: string }

export type SectionKey =
  | 'highlights'
  | 'film'
  | 'lab'
  | 'realisations'
  | 'reviews'
  | 'faq'
  | 'otherServices'
  | 'guides'
  | 'cta'

export type SectionTitles = Partial<Record<SectionKey, SectionTitle>>

export type Highlight = { title: string; text: string }

type PageBase = {
  univers: Univers
  h1: string
  tagline: string
  intro: string
  seo: PageSeo
  sectionTitles?: SectionTitles
}

export type HubPageContent = PageBase & {
  faq?: FaqItem[]
  Body?: ComponentType
}

export type ServicePageContent = PageBase & {
  slug: string
  summary: string
  image?: { src: StaticImageData; alt: string }
  beforeAfter?: BeforeAfterPair
  highlights?: Highlight[]
  faq: FaqItem[]
  Body: ComponentType
}
