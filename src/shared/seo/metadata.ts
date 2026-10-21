import type { Metadata } from 'next'

import { resolveSiteUrl } from '../env'

type PageMetadataInput = {
  title: string
  description: string
  path: string
  titleTemplate?: string | null
  imageUrl?: string | null
  openGraphType?: 'website' | 'article'
  robots?: Metadata['robots']
}

export const absoluteUrl = (path: string): string => new URL(path, resolveSiteUrl()).toString()

export function buildMetadata({
  title,
  description,
  path,
  titleTemplate,
  imageUrl,
  openGraphType = 'website',
  robots,
}: PageMetadataInput): Metadata {
  const fullTitle = (titleTemplate ?? '%s').replace('%s', () => title)
  const url = absoluteUrl(path)
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    ...(robots ? { robots } : {}),
    openGraph: {
      type: openGraphType,
      locale: 'fr_FR',
      title: fullTitle,
      description,
      url,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  }
}
