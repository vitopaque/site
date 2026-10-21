import type { Placeholder } from '@/shared/ui/PlaceholderCard'

export type CaseStudy = {
  id: string
  context: string
  title: string
  metric: { value: string; label: string }
  href: string
}

export type CaseStudyItem = CaseStudy | Placeholder
