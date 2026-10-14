export const UNIVERS_OPTIONS = [
  { label: 'Bâtiment & Pro', value: 'batiment' },
  { label: 'Voiture', value: 'voiture' },
  { label: 'Bateau', value: 'bateau' },
] as const

export type Univers = (typeof UNIVERS_OPTIONS)[number]['value']

export const universLabel = (univers: Univers): string =>
  UNIVERS_OPTIONS.find((option) => option.value === univers)?.label ?? univers
