import { revalidatePath, revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  PayloadRequest,
} from 'payload'

import type { Article } from '@/shared/payload-types'
import { type ArticleSnapshot, tagsFor } from './tags'

const LIVE_KEY = 'articleLiveBeforeChange'

const readLive = async (req: PayloadRequest, id: number): Promise<ArticleSnapshot | null> => {
  const live = await req.payload.findByID({
    collection: 'articles',
    id,
    depth: 0,
    draft: false,
    disableErrors: true,
    overrideAccess: true,
    req,
    select: { slug: true, service: true, _status: true },
  })
  return live?._status === 'published' ? { slug: live.slug, service: live.service } : null
}

const revalidateArticles = (req: PayloadRequest, tags: string[]): void => {
  try {
    for (const tag of tags) revalidateTag(tag, { expire: 0 })
    revalidatePath('/sitemap.xml')
  } catch (err) {
    req.payload.logger.error({
      err,
      msg: 'Revalidation des articles impossible (hors requête Next ?)',
    })
  }
}

export const stampPublishedAt: CollectionBeforeChangeHook<Article> = ({ data, originalDoc }) => {
  if (data._status !== 'published' || data.publishedAt || originalDoc?.publishedAt) return data
  return { ...data, publishedAt: new Date().toISOString() }
}

export const captureLiveState: CollectionBeforeChangeHook<Article> = async ({
  context,
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (operation === 'update' && originalDoc) context[LIVE_KEY] = await readLive(req, originalDoc.id)
  return data
}

export const revalidateOnChange: CollectionAfterChangeHook<Article> = async ({
  context,
  doc,
  req,
}) => {
  const before = (context[LIVE_KEY] as ArticleSnapshot | null | undefined) ?? null
  if (doc._status === 'published') revalidateArticles(req, tagsFor(doc, before))
  else if (before && !(await readLive(req, doc.id))) revalidateArticles(req, tagsFor(before))
  return doc
}

export const revalidateOnDelete: CollectionAfterDeleteHook<Article> = ({ doc, req }) => {
  if (doc._status === 'published') revalidateArticles(req, tagsFor(doc))
  return doc
}
