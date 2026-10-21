import type { MetadataRoute } from 'next'

import { isIndexable } from './indexing'
import { absoluteUrl } from './metadata'

export function sitemapFor(paths: readonly string[]): MetadataRoute.Sitemap {
  if (!isIndexable()) return []
  return paths.map((path) => ({ url: absoluteUrl(path) }))
}
