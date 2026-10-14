import type { StaticImageData } from 'next/image'
import type { ComponentType } from 'react'

import type { Univers } from '@/shared/payload/univers'

export type PageSeo = { title: string; description: string }

type PageBase = {
  univers: Univers
  h1: string
  tagline: string
  intro: string
  seo: PageSeo
}

export type HubPageContent = PageBase

export type ServicePageContent = PageBase & {
  slug: string
  image?: { src: StaticImageData; alt: string }
  faq?: { question: string; answer: string }[]
  Body: ComponentType
}
