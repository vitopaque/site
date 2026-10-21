import { siloBySlug } from '@/shared/catalog'
import type { Univers } from '@/shared/payload/univers'
import type { BeforeAfterPair } from '@/shared/ui/BeforeAfter'
import type { RealisationItem } from '@/shared/ui/RealisationCard'

import { realisations } from './content'
import type { CaseStudy, Realisation } from './types'

export const SHOWCASE = { homeMin: 3, relatedMin: 2, metricMin: 1, shown: 3 } as const

export const realisationHref = (slug: string): string => `/realisations/${slug}`

export const universOf = (item: Realisation): Univers => {
  const silo = siloBySlug(item.silos[0])
  if (!silo) throw new Error(`Silo inconnu : ${item.silos[0]}`)
  return silo.univers
}

const labelOf = (item: Realisation): string => siloBySlug(item.silos[0])?.label ?? ''

export const toItem = (item: Realisation): RealisationItem => ({
  id: item.slug,
  title: item.title,
  film: labelOf(item),
  href: realisationHref(item.slug),
  image: item.cover,
})

const latestFirst = [...realisations].sort((a, b) => b.date.localeCompare(a.date))

export const listRealisations = (): readonly Realisation[] => latestFirst

export const listRealisationSlugs = (): string[] => latestFirst.map((item) => item.slug)

export const getRealisation = (slug: string): Realisation | null =>
  latestFirst.find((item) => item.slug === slug) ?? null

const showcase = (items: readonly Realisation[], min: number): RealisationItem[] =>
  items.length >= min ? items.slice(0, SHOWCASE.shown).map(toItem) : []

export const homeRealisations = (): RealisationItem[] => showcase(latestFirst, SHOWCASE.homeMin)

export const realisationsOfSilo = (slug: string): RealisationItem[] =>
  showcase(
    latestFirst.filter((item) => item.silos.includes(slug)),
    SHOWCASE.relatedMin,
  )

export const realisationsOfUnivers = (univers: Univers): RealisationItem[] =>
  showcase(
    latestFirst.filter((item) => universOf(item) === univers),
    SHOWCASE.relatedMin,
  )

export const relatedRealisations = (current: Realisation): RealisationItem[] => {
  const univers = universOf(current)
  const sharesSilo = (item: Realisation) => item.silos.some((silo) => current.silos.includes(silo))
  const others = latestFirst
    .filter((item) => item.slug !== current.slug && universOf(item) === univers)
    .sort((a, b) => Number(sharesSilo(b)) - Number(sharesSilo(a)))
  return showcase(others, SHOWCASE.relatedMin)
}

export type PairWithSource = { pair: BeforeAfterPair; href: string }

const pairOf = (items: readonly Realisation[]): PairWithSource | undefined => {
  const found = items.find((item) => item.beforeAfter)
  return found?.beforeAfter
    ? { pair: found.beforeAfter, href: realisationHref(found.slug) }
    : undefined
}

export const pairOfSilo = (slug: string): PairWithSource | undefined =>
  pairOf(latestFirst.filter((item) => item.silos.includes(slug)))

export const pairOfUnivers = (univers: Univers): PairWithSource | undefined =>
  pairOf(latestFirst.filter((item) => universOf(item) === univers))

export const vehicleAfterPhoto = () => pairOfUnivers('voiture')?.pair.after

export const caseStudies = (): CaseStudy[] => {
  const withMetric = latestFirst.flatMap((item) =>
    item.result.metric
      ? [
          {
            id: item.slug,
            context: labelOf(item),
            title: item.title,
            metric: item.result.metric,
            href: realisationHref(item.slug),
          },
        ]
      : [],
  )
  return withMetric.length >= SHOWCASE.metricMin ? withMetric : []
}
