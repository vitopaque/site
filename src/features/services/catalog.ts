import type { Univers } from '@/shared/payload/univers'

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

export type ServiceSilo = {
  key: ServiceKey
  slug: string
  href: string
  univers: Univers
  label: string
}

const silo = (key: ServiceKey, univers: Univers, label: string): ServiceSilo => ({
  key,
  slug: SERVICE_SLUGS[key],
  href: `/${SERVICE_SLUGS[key]}`,
  univers,
  label,
})

export const serviceSilos: readonly ServiceSilo[] = [
  silo('filmSolaire', 'batiment', 'Film solaire'),
  silo('filmSecurite', 'batiment', 'Sécurité anti-effraction'),
  silo('filmPdlc', 'batiment', 'Film PDLC'),
  silo('vitrophanie', 'batiment', 'Vitrophanie et signalétique'),
  silo('vitresAuto', 'voiture', 'Vitres teintées auto'),
  silo('covering', 'voiture', 'Covering et flocage'),
  silo('vitresBateau', 'bateau', 'Vitres teintées bateau'),
]

export const siloOf = (key: ServiceKey): ServiceSilo => {
  const found = serviceSilos.find((candidate) => candidate.key === key)
  if (!found) throw new Error(`Silo inconnu : ${key}`)
  return found
}

export const silosOfUnivers = (univers: Univers): ServiceSilo[] =>
  serviceSilos.filter((candidate) => candidate.univers === univers)

export const hubHref = (univers: Univers): string => `/${univers}`
