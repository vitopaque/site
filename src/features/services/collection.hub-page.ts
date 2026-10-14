import type { CollectionConfig } from 'payload'

import { pageHeaderFields, seoFields } from '@/shared/payload/fields'
import {
  revalidatePathsAfterChange,
  revalidatePathsAfterDelete,
  uniqueSeoAcrossCollections,
} from '@/shared/payload/hooks'
import { UNIVERS_OPTIONS } from '@/shared/payload/univers'

import { hasRole } from '@/features/access'

import { servicesAccess } from './access'

type RevalidatedDoc = { univers?: string | null }

const pathsOf = (doc: RevalidatedDoc): string[] =>
  doc.univers ? [`/${doc.univers}`, '/', '/sitemap.xml'] : []

export const HubPages: CollectionConfig = {
  slug: 'hub-pages',
  labels: { singular: 'Page hub', plural: 'Pages hub' },
  admin: {
    group: 'Pages',
    hidden: ({ user }) => !hasRole(user, 'admin'),
    useAsTitle: 'h1',
    defaultColumns: ['h1', 'univers', '_status'],
  },
  access: servicesAccess,
  versions: { drafts: true },
  hooks: {
    beforeValidate: [uniqueSeoAcrossCollections(['service-pages', 'hub-pages'])],
    afterChange: [
      revalidatePathsAfterChange<RevalidatedDoc & { _status?: 'draft' | 'published' | null }>(
        (doc) => pathsOf(doc),
      ),
    ],
    afterDelete: [revalidatePathsAfterDelete<RevalidatedDoc>(pathsOf)],
  },
  fields: [
    {
      name: 'univers',
      label: 'Univers (URL du hub)',
      type: 'select',
      options: [...UNIVERS_OPTIONS],
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    ...pageHeaderFields(),
    {
      name: 'services',
      label: 'Pages de service liées',
      type: 'relationship',
      relationTo: 'service-pages',
      hasMany: true,
      filterOptions: ({ data }) => (data?.univers ? { univers: { equals: data.univers } } : true),
    },
    seoFields(),
  ],
}
