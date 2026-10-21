import type { MetadataRoute } from 'next'
import { listSlugs, quoteHref } from '@/features/services'
import { sitemapFor } from '@/shared'

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapFor(['/', ...listSlugs().map((slug) => `/${slug}`), quoteHref()])
}
