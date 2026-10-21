import { ARTICLES_PER_PAGE } from './paths'
import { listPublishedArticles } from './queries'
import type { ArticlePage } from './types'

export async function getIndexPage(page: number): Promise<ArticlePage | null> {
  const data = await listPublishedArticles({ page, perPage: ARTICLES_PER_PAGE })
  return page > 1 && data.items.length === 0 ? null : data
}
