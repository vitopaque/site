import type { StaticImageData } from 'next/image'

import type { BeforeAfterPair } from '@/shared/ui/BeforeAfter'

export type RealisationVideo = {
  url: string
  poster: StaticImageData
  duration: string
  uploadDate: string
}

export type RealisationImage = { src: StaticImageData; alt: string }

export type Realisation = {
  slug: string
  title: string
  silos: readonly [string, ...string[]]
  date: string
  place?: string
  lede: string
  problem: string
  solution: string
  result: { text: string; metric?: { value: string; label: string } }
  cover: RealisationImage
  beforeAfter?: BeforeAfterPair
  video?: RealisationVideo
  gallery?: RealisationImage[]
  seo: { title: string; description: string }
}

export type ListingContent = {
  h1: string
  tagline: string
  intro: string
  seo: { title: string; description: string }
}

export type CaseStudy = {
  id: string
  context: string
  title: string
  metric: { value: string; label: string }
  href: string
}
