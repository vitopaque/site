import { siloBySlug } from '@/shared/catalog'
import type { Univers } from '@/shared/payload/univers'

export const ARTICLES_TAG = 'articles'

export const articleTag = (slug: string): string => `article:${slug}`

export const serviceTag = (serviceSlug: string): string => `articles-service:${serviceSlug}`

export const universTag = (univers: Univers): string => `articles-univers:${univers}`

export type ArticleSnapshot = { slug?: string | null; service?: string | null }

export function tagsFor(...snapshots: (ArticleSnapshot | null)[]): string[] {
  const tags = new Set([ARTICLES_TAG])
  for (const snapshot of snapshots) {
    if (snapshot?.slug) tags.add(articleTag(snapshot.slug))
    const silo = snapshot?.service ? siloBySlug(snapshot.service) : null
    if (silo) {
      tags.add(serviceTag(silo.slug))
      tags.add(universTag(silo.univers))
    }
  }
  return [...tags]
}
