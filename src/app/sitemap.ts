import type { MetadataRoute } from 'next'
import { articleSitemapPaths } from '@/features/articles'
import { realisationPaths } from '@/features/realisations'
import { listSlugs } from '@/features/services'
import { sitemapFor } from '@/shared'
import { quoteHref } from '@/shared/catalog'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return sitemapFor([
    '/',
    ...listSlugs().map((slug) => `/${slug}`),
    ...realisationPaths(),
    ...(await articleSitemapPaths()),
    quoteHref(),
  ])
}
