import type { Metadata, MetadataRoute } from 'next'
import { isVercelProduction } from '../env'

export const NOINDEX_DIRECTIVE = 'noindex, nofollow'

const PRIVATE_PATHS = ['/admin', '/api'] as const

export function noindexHeaderSources(): string[] {
  return isIndexable() ? PRIVATE_PATHS.map((path) => `${path}/:path*`) : ['/:path*']
}

export function isIndexable(): boolean {
  return isVercelProduction()
}

export function robotsMetadata(): Metadata['robots'] {
  return isIndexable() ? undefined : { index: false, follow: false }
}

export function robotsRules(): MetadataRoute.Robots {
  if (!isIndexable()) return { rules: { userAgent: '*', disallow: '/' } }
  return { rules: { userAgent: '*', allow: '/' } }
}
