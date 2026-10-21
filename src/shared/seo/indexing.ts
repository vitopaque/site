import type { Metadata, MetadataRoute } from 'next'

export const NOINDEX_DIRECTIVE = 'noindex, nofollow'

const PRIVATE_PATHS = ['/admin', '/api'] as const

export function noindexHeaderSources(): string[] {
  return isIndexable() ? PRIVATE_PATHS.map((path) => `${path}/:path*`) : ['/:path*']
}

type IndexingEnv = Record<string, string | undefined>

const NON_OFFICIAL_HOST = /(^|\.)vercel\.app$|^localhost$|^127\.0\.0\.1$/

function isOfficialSiteUrl(raw: string | undefined): boolean {
  if (!raw?.trim()) return false
  try {
    return !NON_OFFICIAL_HOST.test(new URL(raw.trim()).hostname)
  } catch {
    return false
  }
}

export function isIndexable(env: IndexingEnv = process.env): boolean {
  return env.VERCEL_ENV === 'production' && isOfficialSiteUrl(env.SITE_URL)
}

export function robotsMetadata(): Metadata['robots'] {
  return isIndexable() ? undefined : { index: false, follow: false }
}

export function robotsRules(): MetadataRoute.Robots {
  if (!isIndexable()) return { rules: { userAgent: '*', disallow: '/' } }
  return { rules: { userAgent: '*', allow: '/' } }
}
