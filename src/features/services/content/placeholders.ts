import type { Placeholder } from '@/shared/ui/PlaceholderCard'

const placeholders = (prefix: string, hint: string): Placeholder[] =>
  [1, 2, 3].map((n) => ({ id: `${prefix}-${n}`, placeholder: true, hint }))

export const realisationPlaceholders = placeholders(
  'realisation',
  'Réalisation liée : photo, contexte, film posé.',
)

export const reviewPlaceholders = placeholders('avis', 'Avis Google, alimenté par l’API Places.')

export const guidePlaceholders = placeholders(
  'guide',
  'Guide expert issu du blog, lié à cette page de service.',
)
