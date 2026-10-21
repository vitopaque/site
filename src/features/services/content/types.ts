import type { StaticImageData } from 'next/image'
import type { ComponentType } from 'react'

import type { Univers } from '@/shared/payload/univers'
import type { FaqItem } from '@/shared/ui/FaqList'

export type PageSeo = { title: string; description: string }

export type Highlight = { title: string; text: string }

type PageBase = {
  univers: Univers
  h1: string
  tagline: string
  intro: string
  seo: PageSeo
}

export type HubPageContent = PageBase & {
  Body?: ComponentType
}

export type ServicePageContent = PageBase & {
  slug: string
  summary: string
  image?: { src: StaticImageData; alt: string }
  highlights?: Highlight[]
  faq: FaqItem[]
  Body: ComponentType
}
