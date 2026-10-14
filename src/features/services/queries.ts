import { cache } from 'react'

import { getPayloadClient } from '@/shared/payload/client'
import type { HubPage, ServicePage } from '@/shared/payload-types'

import { isHubSlug } from './validators'

export type PublishedPage = { kind: 'hub'; doc: HubPage } | { kind: 'service'; doc: ServicePage }

export const getPublishedPage = cache(async (slug: string): Promise<PublishedPage | null> => {
  const payload = await getPayloadClient()
  if (isHubSlug(slug)) {
    const { docs } = await payload.find({
      collection: 'hub-pages',
      where: { univers: { equals: slug } },
      limit: 1,
      depth: 1,
      overrideAccess: false,
    })
    return docs[0] ? { kind: 'hub', doc: docs[0] } : null
  }
  const { docs } = await payload.find({
    collection: 'service-pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })
  return docs[0]?.slug === slug ? { kind: 'service', doc: docs[0] } : null
})

export async function listPublishedSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const [services, hubs] = await Promise.all([
    payload.find({
      collection: 'service-pages',
      limit: 0,
      depth: 0,
      pagination: false,
      select: { slug: true },
      overrideAccess: false,
    }),
    payload.find({
      collection: 'hub-pages',
      limit: 0,
      depth: 0,
      pagination: false,
      select: { univers: true },
      overrideAccess: false,
    }),
  ])
  return [...services.docs.map((doc) => doc.slug), ...hubs.docs.map((doc) => doc.univers)]
}
