import { unstable_cache } from 'next/cache'
import { getPayload, type Where } from 'payload'

import { silosOfUnivers } from '@/shared/catalog'
import type { Univers } from '@/shared/payload/univers'
import { withBuildFallback } from './build-fallback'
import { SUMMARY_FIELDS, toDetail, toSummary } from './mappers'
import { ARTICLES_TAG, articleTag, serviceTag, universTag } from './tags'
import type { ArticleDetail, ArticlePage, ArticleSlugEntry, ArticleSummary } from './types'

const REVALIDATE_SECONDS = 3600

const published: Where = { _status: { equals: 'published' } }

const payloadClient = async () => getPayload({ config: (await import('@payload-config')).default })

const cached = <T>(
  label: string,
  keyParts: (string | number)[],
  tags: string[],
  read: () => Promise<T>,
  fallback: T,
): Promise<T> =>
  withBuildFallback(
    label,
    () =>
      unstable_cache(read, [label, ...keyParts.map(String)], {
        tags,
        revalidate: REVALIDATE_SECONDS,
      })(),
    fallback,
  )

async function findSummaries(where: Where, limit: number, page = 1) {
  const payload = await payloadClient()
  const result = await payload.find({
    collection: 'articles',
    where: { and: [published, where] },
    sort: '-publishedAt',
    depth: 1,
    limit,
    page,
    overrideAccess: false,
    select: SUMMARY_FIELDS,
  })
  return {
    items: result.docs.flatMap((doc) => toSummary(doc) ?? []),
    page: result.page ?? page,
    totalPages: result.totalPages,
    totalDocs: result.totalDocs,
  }
}

const EMPTY_PAGE = (page: number): ArticlePage => ({ items: [], page, totalPages: 0, totalDocs: 0 })

export const listPublishedArticles = ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}): Promise<ArticlePage> =>
  cached(
    'listPublishedArticles',
    [page, perPage],
    [ARTICLES_TAG],
    () => findSummaries({}, perPage, page),
    EMPTY_PAGE(page),
  )

export const latestArticles = (n: number): Promise<ArticleSummary[]> =>
  cached('latestArticles', [n], [ARTICLES_TAG], async () => (await findSummaries({}, n)).items, [])

export const articlesForService = (slug: string, n: number): Promise<ArticleSummary[]> =>
  cached(
    'articlesForService',
    [slug, n],
    [serviceTag(slug)],
    async () => (await findSummaries({ service: { equals: slug } }, n)).items,
    [],
  )

export const articlesForUnivers = (univers: Univers, n: number): Promise<ArticleSummary[]> =>
  cached(
    'articlesForUnivers',
    [univers, n],
    [universTag(univers)],
    async () =>
      (
        await findSummaries(
          { service: { in: silosOfUnivers(univers).map((silo) => silo.slug) } },
          n,
        )
      ).items,
    [],
  )

export const getPublishedArticle = (slug: string): Promise<ArticleDetail | null> =>
  cached(
    'getPublishedArticle',
    [slug],
    [articleTag(slug)],
    async () => {
      const payload = await payloadClient()
      const { docs } = await payload.find({
        collection: 'articles',
        where: { and: [published, { slug: { equals: slug } }] },
        depth: 2,
        limit: 1,
        overrideAccess: false,
      })
      const doc = docs[0]
      return doc ? toDetail(doc) : null
    },
    null,
  )

export const publishedArticleSlugs = (): Promise<ArticleSlugEntry[]> =>
  cached(
    'publishedArticleSlugs',
    [],
    [ARTICLES_TAG],
    async () => {
      const payload = await payloadClient()
      const { docs } = await payload.find({
        collection: 'articles',
        where: published,
        sort: '-publishedAt',
        depth: 0,
        pagination: false,
        overrideAccess: false,
        select: { slug: true, publishedAt: true, contentUpdatedAt: true, createdAt: true },
      })
      return docs.flatMap((doc) =>
        doc.slug
          ? [
              {
                slug: doc.slug,
                lastModified: doc.contentUpdatedAt ?? doc.publishedAt ?? doc.createdAt,
              },
            ]
          : [],
      )
    },
    [],
  )
