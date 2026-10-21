import { familyOf } from '@/shared/catalog'
import { hubPages, servicePages } from './content'
import type { HubPageContent, ServicePageContent } from './content/types'
import { isHubSlug } from './validators'

export type Page =
  { kind: 'hub'; page: HubPageContent } | { kind: 'service'; page: ServicePageContent }

export type ServiceEntry = Extract<Page, { kind: 'service' }>
export type HubEntry = Extract<Page, { kind: 'hub' }>

export const pathOf = ({ kind, page }: Page): string =>
  `/${kind === 'hub' ? page.univers : (page as ServicePageContent).slug}`

export function getPage(slug: string): Page | null {
  if (isHubSlug(slug)) {
    const hub = hubPages.find((candidate) => candidate.univers === slug)
    return hub ? { kind: 'hub', page: hub } : null
  }
  const service = servicePages.find((candidate) => candidate.slug === slug)
  return service ? { kind: 'service', page: service } : null
}

export const listSlugs = (): string[] => [
  ...hubPages.map((hub) => hub.univers),
  ...servicePages.map((service) => service.slug),
]

export const servicesOf = (univers: HubPageContent['univers']): ServicePageContent[] =>
  servicePages.filter((service) => service.univers === univers)

export const relatedServicesOf = (service: ServicePageContent): ServicePageContent[] =>
  servicePages
    .filter(
      (candidate) =>
        candidate.slug !== service.slug && familyOf(service.univers).includes(candidate.univers),
    )
    .sort((a, b) => Number(b.univers === service.univers) - Number(a.univers === service.univers))
