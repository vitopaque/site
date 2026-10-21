import type { GuideItem } from '@/features/articles'
import type { CaseStudyItem } from '@/features/case-studies'
import type { ReviewItem } from '@/features/reviews'

export const caseStudyPlaceholders: CaseStudyItem[] = [
  {
    id: 'cas-1',
    placeholder: true,
    hint: 'Étude de cas : le contexte, le film posé, le résultat constaté.',
  },
  {
    id: 'cas-2',
    placeholder: true,
    hint: 'Étude de cas : le contexte, le film posé, le résultat constaté.',
  },
  {
    id: 'cas-3',
    placeholder: true,
    hint: 'Étude de cas : le contexte, le film posé, le résultat constaté.',
  },
]

export const reviewPlaceholders: ReviewItem[] = [
  { id: 'avis-1', placeholder: true, hint: 'Avis Google, alimenté par l’API Places.' },
  { id: 'avis-2', placeholder: true, hint: 'Avis Google, alimenté par l’API Places.' },
  { id: 'avis-3', placeholder: true, hint: 'Avis Google, alimenté par l’API Places.' },
]

export const guidePlaceholders: GuideItem[] = [
  {
    id: 'guide-1',
    placeholder: true,
    hint: 'Guide expert issu du blog, lié à sa page de service.',
  },
  {
    id: 'guide-2',
    placeholder: true,
    hint: 'Guide expert issu du blog, lié à sa page de service.',
  },
  {
    id: 'guide-3',
    placeholder: true,
    hint: 'Guide expert issu du blog, lié à sa page de service.',
  },
]
