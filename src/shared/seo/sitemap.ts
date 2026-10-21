import type { MetadataRoute } from 'next'

import { isIndexable } from './indexing'
import { absoluteUrl } from './metadata'

export type SitemapPath = string | { path: string; lastModified?: string }

export function sitemapFor(paths: readonly SitemapPath[]): MetadataRoute.Sitemap {
  if (!isIndexable()) return []
  return paths.map((entry) =>
    typeof entry === 'string'
      ? { url: absoluteUrl(entry) }
      : { url: absoluteUrl(entry.path), lastModified: entry.lastModified },
  )
}
