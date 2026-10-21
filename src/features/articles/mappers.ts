import { siloBySlug } from '@/shared/catalog'
import type { Article, Author, Media } from '@/shared/payload-types'
import type { ArticleAuthor, ArticleDetail, ArticleImage, ArticleSummary } from './types'

export const SUMMARY_FIELDS = {
  title: true,
  slug: true,
  excerpt: true,
  image: true,
  service: true,
  publishedAt: true,
  contentUpdatedAt: true,
  createdAt: true,
} as const

type SummarySource = Pick<Article, keyof typeof SUMMARY_FIELDS>

export function toImage(media: number | Media | null | undefined): ArticleImage | null {
  if (!media || typeof media !== 'object' || !media.url) return null
  return {
    url: media.url,
    alt: media.alt,
    width: media.width ?? null,
    height: media.height ?? null,
  }
}

export function toSummary(doc: SummarySource): ArticleSummary | null {
  const silo = siloBySlug(doc.service)
  if (!doc.slug || !silo) return null
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    publishedAt: doc.publishedAt ?? doc.createdAt,
    contentUpdatedAt: doc.contentUpdatedAt ?? null,
    serviceSlug: silo.slug,
    univers: silo.univers,
    image: toImage(doc.image),
  }
}

const toAuthor = (author: number | Author | null | undefined): ArticleAuthor | null =>
  author && typeof author === 'object'
    ? {
        name: author.name,
        role: author.role,
        bio: author.bio ?? null,
        url: author.url ?? null,
        photo: toImage(author.photo),
      }
    : null

export function toDetail(doc: Article): ArticleDetail | null {
  const summary = toSummary(doc)
  if (!summary) return null
  return {
    ...summary,
    content: doc.content,
    author: toAuthor(doc.author),
    seo: { title: doc.seo.title, description: doc.seo.description },
  }
}
