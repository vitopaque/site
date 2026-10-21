import type { Article } from '@/shared/payload-types'
import type { Univers } from '@/shared/payload/univers'

export type Guide = {
  id: string
  title: string
  excerpt: string
  href: string
}

export type ArticleImage = {
  url: string
  alt: string
  width: number | null
  height: number | null
}

export type ArticleAuthor = {
  name: string
  role: string
  bio: string | null
  url: string | null
  photo: ArticleImage | null
}

export type ArticleSummary = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  contentUpdatedAt: string | null
  serviceSlug: string
  univers: Univers
  image: ArticleImage | null
}

export type ArticleDetail = ArticleSummary & {
  content: Article['content']
  author: ArticleAuthor | null
  seo: { title: string; description: string }
}

export type ArticlePage = {
  items: ArticleSummary[]
  page: number
  totalPages: number
  totalDocs: number
}

export type ArticleSlugEntry = { slug: string; lastModified: string }
