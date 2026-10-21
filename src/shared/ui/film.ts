export type FilmVeil =
  'film-veil-solaire' | 'film-veil-securite' | 'film-veil-pdlc' | 'film-veil-vitrophanie'

export type LabFilm = {
  id: string
  name: string
  description: string
  meters: readonly [number, number, number]
  uses: readonly string[]
  veil: FilmVeil
  href: string
}

export const METER_LABELS = ['Intimité', 'Lumière naturelle', 'Protection solaire'] as const

export const METER_MAX = 5
