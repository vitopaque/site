import { universLabel } from '@/shared/payload/univers'

import { articlePath } from './paths'
import type { ArticleCardItem, ArticleSummary, Guide } from './types'

export const toGuide = (article: ArticleSummary): Guide => ({
  id: article.slug,
  title: article.title,
  excerpt: article.excerpt,
  href: articlePath(article.slug),
  publishedAt: article.publishedAt,
  category: universLabel(article.univers),
})

export const toCardItem = (article: ArticleSummary): ArticleCardItem => ({
  ...toGuide(article),
  image: article.image,
})
