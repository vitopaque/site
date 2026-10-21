import { articlesForService, articlesForUnivers, latestArticles } from './queries'
import type { ArticleSummary } from './types'

export async function relatedArticles(
  article: ArticleSummary,
  count: number,
): Promise<ArticleSummary[]> {
  const [sameService, sameUnivers, latest] = await Promise.all([
    articlesForService(article.serviceSlug, count + 1),
    articlesForUnivers(article.univers, count + 1),
    latestArticles(count + 1),
  ])
  const picked = new Map<string, ArticleSummary>()
  for (const candidate of [...sameService, ...sameUnivers, ...latest]) {
    if (candidate.slug !== article.slug && !picked.has(candidate.slug)) {
      picked.set(candidate.slug, candidate)
    }
  }
  return [...picked.values()].slice(0, count)
}
