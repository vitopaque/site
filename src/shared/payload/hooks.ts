import { revalidatePath, revalidateTag } from 'next/cache'
import {
  type CollectionAfterChangeHook,
  type CollectionAfterDeleteHook,
  type CollectionBeforeValidateHook,
  type CollectionSlug,
  type GlobalAfterChangeHook,
  type PayloadRequest,
  ValidationError,
} from 'payload'

export const SITE_SETTINGS_TAG = 'site-settings'

const REVALIDATE_PROFILE = 'max'

type Published = { _status?: 'draft' | 'published' | null }

const revalidateSafely = (req: PayloadRequest, revalidate: () => void): void => {
  if (req.context.disableRevalidate) return
  try {
    revalidate()
  } catch (error) {
    req.payload.logger.warn({
      err: error,
      msg: 'Revalidation du cache ignorée (hors requête Next)',
    })
  }
}

const revalidateAll = (paths: string[]): void => {
  for (const path of new Set(paths)) revalidatePath(path)
}

export const revalidatePathsAfterChange =
  <T extends Published>(
    resolvePaths: (doc: T, previousDoc: T | undefined) => string[],
  ): CollectionAfterChangeHook =>
  ({ doc, previousDoc, req }) => {
    const wasPublished = previousDoc?._status === 'published'
    if (doc._status === 'published' || wasPublished) {
      revalidateSafely(req, () =>
        revalidateAll(resolvePaths(doc as T, previousDoc as T | undefined)),
      )
    }
    return doc
  }

export const revalidatePathsAfterDelete =
  <T>(resolvePaths: (doc: T) => string[]): CollectionAfterDeleteHook =>
  ({ doc, req }) => {
    revalidateSafely(req, () => revalidateAll(resolvePaths(doc as T)))
    return doc
  }

export const revalidateTagAfterChange =
  (tag: string): GlobalAfterChangeHook =>
  ({ doc, req }) => {
    revalidateSafely(req, () => revalidateTag(tag, REVALIDATE_PROFILE))
    return doc
  }

const SEO_FIELDS = [
  { key: 'title', label: 'Titre de la page' },
  { key: 'description', label: 'Méta-description' },
] as const

type SeoData = { seo?: { title?: string | null; description?: string | null } }

export const uniqueSeoAcrossCollections =
  (collections: CollectionSlug[]): CollectionBeforeValidateHook =>
  async ({ data, originalDoc, collection, req }) => {
    const seo = (data as SeoData | undefined)?.seo
    if (!seo) return data

    const errors: { message: string; path: string }[] = []
    for (const { key, label } of SEO_FIELDS) {
      const value = seo[key]?.trim()
      if (typeof value !== 'string') continue
      seo[key] = value
      if (!value) continue

      for (const slug of collections) {
        const { docs } = await req.payload.find({
          collection: slug,
          where: { [`seo.${key}`]: { like: value } },
          depth: 0,
          limit: 50,
          pagination: false,
          draft: true,
          overrideAccess: true,
          req,
        })
        const duplicate = docs.some(
          (doc) =>
            !(slug === collection.slug && doc.id === originalDoc?.id) &&
            (doc as SeoData).seo?.[key]?.trim().toLowerCase() === value.toLowerCase(),
        )
        if (duplicate) {
          errors.push({
            message: `${label} déjà utilisé(e) par une autre page.`,
            path: `seo.${key}`,
          })
          break
        }
      }
    }
    if (errors.length > 0) throw new ValidationError({ collection: collection.slug, errors, req })
    return data
  }
