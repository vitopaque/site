import { siloOf, type ServiceKey } from '@/features/services'

export type FilmVeil =
  'film-veil-solaire' | 'film-veil-securite' | 'film-veil-pdlc' | 'film-veil-vitrophanie'

export type Film = {
  id: ServiceKey
  name: string
  description: string
  meters: readonly [number, number, number]
  uses: readonly string[]
  veil: FilmVeil
  href: string
}

export const METER_LABELS = ['Intimité', 'Lumière naturelle', 'Protection solaire'] as const

export const METER_MAX = 5

const film = (id: ServiceKey, data: Omit<Film, 'id' | 'name' | 'href'>): Film => {
  const silo = siloOf(id)
  return { id, name: silo.label, href: silo.href, ...data }
}

export const films: readonly Film[] = [
  film('filmSolaire', {
    description: 'Atténue la chaleur et l’éblouissement pour des pièces plus confortables.',
    meters: [1, 3, 5],
    uses: ['Baies exposées', 'Vérandas', 'Bureaux'],
    veil: 'film-veil-solaire',
  }),
  film('filmSecurite', {
    description: 'Un film transparent qui renforce le vitrage et retient le verre en cas de choc.',
    meters: [0, 5, 1],
    uses: ['Rez-de-chaussée', 'Commerces', 'Baies coulissantes'],
    veil: 'film-veil-securite',
  }),
  film('filmPdlc', {
    description:
      'L’intimité à la demande : d’une simple pression, la vitre passe du transparent à l’opaque.',
    meters: [5, 4, 1],
    uses: ['Salle de bain', 'Cloisons', 'Salles de réunion'],
    veil: 'film-veil-pdlc',
  }),
  film('vitrophanie', {
    description: 'Dépoli, motifs, signalétique : vitrines et cloisons habillées à votre image.',
    meters: [3, 4, 0],
    uses: ['Vitrines', 'Bureaux', 'Signalétique'],
    veil: 'film-veil-vitrophanie',
  }),
]
