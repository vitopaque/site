import type { CollectionSlug, PayloadRequest, Where } from 'payload'

type UniqueOptions = { id?: number | string; req: PayloadRequest }

export const uniqueAmongDocs =
  (collection: CollectionSlug, path: string, message: string) =>
  async (value: unknown, { id, req }: UniqueOptions): Promise<true | string> => {
    if (typeof value !== 'string' || !value) return true
    const where: Where = {
      and: [
        { [path]: { equals: value } },
        ...(id === undefined ? [] : [{ id: { not_equals: id } }]),
      ],
    }
    const lookup = (draft: boolean) =>
      req.payload.find({
        collection,
        where,
        draft,
        limit: 1,
        depth: 0,
        pagination: false,
        overrideAccess: true,
        req,
      })
    const [latest, live] = await Promise.all([lookup(true), lookup(false)])
    return latest.docs.length + live.docs.length > 0 ? message : true
  }
