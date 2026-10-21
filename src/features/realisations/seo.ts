import { siteConfig } from '@/features/site-settings'
import { breadcrumbList, type Crumb, videoObject } from '@/shared/seo/jsonld'
import { absoluteUrl, buildMetadata } from '@/shared/seo/metadata'

import { listing, realisations } from './content'
import { realisationHref } from './queries'
import type { Realisation } from './types'

export const LISTING_PATH = '/realisations'

const { titleTemplate } = siteConfig.seo

export const listingMetadata = () =>
  buildMetadata({ ...listing.seo, path: LISTING_PATH, titleTemplate })

export const realisationMetadata = (item: Realisation) =>
  buildMetadata({
    ...item.seo,
    path: realisationHref(item.slug),
    titleTemplate,
    imageUrl: absoluteUrl(item.cover.src.src),
  })

const HOME_CRUMB: Crumb = { name: 'Accueil', path: '/' }

export const listingCrumbs = (): Crumb[] => [HOME_CRUMB, { name: listing.h1, path: LISTING_PATH }]

export const realisationCrumbs = (item: Realisation): Crumb[] => [
  HOME_CRUMB,
  { name: listing.tagline, path: LISTING_PATH },
  { name: item.title, path: realisationHref(item.slug) },
]

export function realisationJsonLd(item: Realisation): Record<string, unknown>[] {
  const data: Record<string, unknown>[] = [breadcrumbList(realisationCrumbs(item))]
  if (item.video) {
    data.push(
      videoObject({
        name: item.title,
        description: item.seo.description,
        thumbnailUrl: absoluteUrl(item.video.thumbnail),
        uploadDate: item.video.uploadDate,
        duration: item.video.duration,
        contentUrl: item.video.url,
      }),
    )
  }
  return data
}

export const realisationSeoEntries = (): { label: string; seo: Realisation['seo'] }[] => [
  { label: 'réalisations', seo: listing.seo },
  ...realisations.map((item) => ({ label: `réalisation ${item.slug}`, seo: item.seo })),
]

export const realisationPaths = (): string[] => [
  LISTING_PATH,
  ...realisations.map((item) => realisationHref(item.slug)),
]
