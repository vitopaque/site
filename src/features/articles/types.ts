import type { Placeholder } from '@/shared/ui/PlaceholderCard'

export type Guide = {
  id: string
  title: string
  excerpt: string
  href: string
}

export type GuideItem = Guide | Placeholder
