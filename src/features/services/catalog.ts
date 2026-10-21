import type { Univers } from '@/shared/payload/univers'
import type { LabFilm } from '@/shared/ui/film'

const SERVICE_SLUGS = {
  filmSolaire: 'film-solaire-batiment',
  filmSecurite: 'film-securite-anti-effraction',
  filmPdlc: 'film-pdlc-cristaux-liquides',
  vitrophanie: 'vitrophanie-signaletique',
  vitresAuto: 'vitres-teintees-auto',
  vitresBateau: 'vitres-teintees-bateau',
  covering: 'covering-et-flocage',
} as const

export type ServiceKey = keyof typeof SERVICE_SLUGS

export type FilmProfile = Omit<LabFilm, 'id' | 'name' | 'href'>

export type ServiceSilo = {
  key: ServiceKey
  slug: string
  href: string
  univers: Univers
  label: string
  film?: FilmProfile
}

const silo = (
  key: ServiceKey,
  univers: Univers,
  label: string,
  film?: FilmProfile,
): ServiceSilo => ({
  key,
  slug: SERVICE_SLUGS[key],
  href: `/${SERVICE_SLUGS[key]}`,
  univers,
  label,
  film,
})

export const serviceSilos: readonly ServiceSilo[] = [
  silo('filmSolaire', 'batiment', 'Film solaire', {
    description: 'Atténue la chaleur et l’éblouissement pour des pièces plus confortables.',
    meters: [1, 3, 5],
    uses: ['Baies exposées', 'Vérandas', 'Bureaux'],
    veil: 'film-veil-solaire',
  }),
  silo('filmSecurite', 'batiment', 'Sécurité anti-effraction', {
    description: 'Un film transparent qui renforce le vitrage et retient le verre en cas de choc.',
    meters: [0, 5, 1],
    uses: ['Rez-de-chaussée', 'Commerces', 'Baies coulissantes'],
    veil: 'film-veil-securite',
  }),
  silo('filmPdlc', 'batiment', 'Film PDLC', {
    description:
      'L’intimité à la demande : d’une simple pression, la vitre passe du transparent à l’opaque.',
    meters: [5, 4, 1],
    uses: ['Salle de bain', 'Cloisons', 'Salles de réunion'],
    veil: 'film-veil-pdlc',
  }),
  silo('vitrophanie', 'batiment', 'Vitrophanie et signalétique', {
    description: 'Dépoli, motifs, signalétique : vitrines et cloisons habillées à votre image.',
    meters: [3, 4, 0],
    uses: ['Vitrines', 'Bureaux', 'Signalétique'],
    veil: 'film-veil-vitrophanie',
  }),
  silo('vitresAuto', 'voiture', 'Vitres teintées auto'),
  silo('covering', 'voiture', 'Covering et flocage'),
  silo('vitresBateau', 'bateau', 'Vitres teintées bateau'),
]

export const siloOf = (key: ServiceKey): ServiceSilo => {
  const found = serviceSilos.find((candidate) => candidate.key === key)
  if (!found) throw new Error(`Silo inconnu : ${key}`)
  return found
}

export const siloBySlug = (slug: string): ServiceSilo | null =>
  serviceSilos.find((candidate) => candidate.slug === slug) ?? null

export const silosOfUnivers = (univers: Univers): ServiceSilo[] =>
  serviceSilos.filter((candidate) => candidate.univers === univers)

export const hubHref = (univers: Univers): string => `/${univers}`

export const labFilmsOf = (univers: Univers): LabFilm[] =>
  silosOfUnivers(univers).flatMap(({ key, label, href, film }) =>
    film ? [{ id: key, name: label, href, ...film }] : [],
  )

export const QUOTE_SERVICE_PARAM = 'service'

export const quoteHref = (slug?: string): string =>
  slug ? `/contact-devis?${QUOTE_SERVICE_PARAM}=${slug}` : '/contact-devis'
