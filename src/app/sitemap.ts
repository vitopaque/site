import type { MetadataRoute } from 'next'
import { realisationPaths } from '@/features/realisations'
import { listSlugs } from '@/features/services'
import { sitemapFor } from '@/shared'
import { quoteHref } from '@/shared/catalog'

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapFor([
    '/',
    ...listSlugs().map((slug) => `/${slug}`),
    ...realisationPaths(),
    quoteHref(),
  ])
}
