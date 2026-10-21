import type { Placeholder } from '@/shared/ui/PlaceholderCard'

export type Review = {
  id: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
}

export type ReviewItem = Review | Placeholder
