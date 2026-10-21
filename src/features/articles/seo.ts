import { robotsMetadata } from '@/shared/seo/indexing'
import { blogPosting, breadcrumbList, type Crumb, type Publisher } from '@/shared/seo/jsonld'
import { absoluteUrl, buildMetadata } from '@/shared/seo/metadata'
import type { SitemapPath } from '@/shared/seo/sitemap'
import { TITLE_TEMPLATE } from '@/shared/seo/title-template'

import { listing, pageSeo } from './content'
import { ARTICLES_PATH, articlePath, indexPagePath, MIN_INDEXABLE_ARTICLES } from './paths'
import type { ArticleDetail, ArticleSlugEntry } from './types'

const isThin = (totalDocs: number): boolean => totalDocs < MIN_INDEXABLE_ARTICLES

export function indexMetadata({ page, totalDocs }: { page: number; totalDocs: number }) {
  return buildMetadata({
    ...pageSeo(page),
    path: indexPagePath(page),
    titleTemplate: TITLE_TEMPLATE,
    robots: isThin(totalDocs) ? (robotsMetadata() ?? { index: false, follow: true }) : undefined,
  })
}

export const articleMetadata = (article: ArticleDetail) =>
  buildMetadata({
    ...article.seo,
    path: articlePath(article.slug),
    titleTemplate: TITLE_TEMPLATE,
    imageUrl: article.image ? absoluteUrl(article.image.url) : null,
    openGraphType: 'article',
  })

const HOME_CRUMB: Crumb = { name: 'Accueil', path: '/' }

const LISTING_CRUMB: Crumb = { name: listing.tagline, path: ARTICLES_PATH }

export const indexCrumbs = (page: number): Crumb[] =>
  page <= 1
    ? [HOME_CRUMB, LISTING_CRUMB]
    : [HOME_CRUMB, LISTING_CRUMB, { name: `Page ${page}`, path: indexPagePath(page) }]

export const articleCrumbs = (article: ArticleDetail): Crumb[] => [
  HOME_CRUMB,
  LISTING_CRUMB,
  { name: article.title, path: articlePath(article.slug) },
]

export const articleJsonLd = (
  article: ArticleDetail,
  publisher: Publisher,
): Record<string, unknown>[] => [
  blogPosting({
    headline: article.title,
    description: article.seo.description,
    path: articlePath(article.slug),
    image: article.image?.url ?? null,
    datePublished: article.publishedAt,
    dateModified: article.contentUpdatedAt ?? article.publishedAt,
    author: article.author,
    publisher,
  }),
  breadcrumbList(articleCrumbs(article)),
]

export function blogSitemapPaths(entries: readonly ArticleSlugEntry[]): SitemapPath[] {
  const articles = entries.map(({ slug, lastModified }) => ({
    path: articlePath(slug),
    lastModified,
  }))
  if (isThin(entries.length)) return articles
  const latest = entries.map((entry) => entry.lastModified).reduce((a, b) => (a > b ? a : b))
  return [{ path: ARTICLES_PATH, lastModified: latest }, ...articles]
}

export const articleSeoEntries = (): {
  label: string
  seo: { title: string; description: string }
}[] => [{ label: 'blog', seo: listing.seo }]
