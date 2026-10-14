import type { CollectionConfig } from 'payload'

import { pageHeaderFields, seoFields } from '@/shared/payload/fields'
import {
  revalidatePathsAfterChange,
  revalidatePathsAfterDelete,
  uniqueSeoAcrossCollections,
} from '@/shared/payload/hooks'
import { contentEditor } from '@/shared/payload/richtext'
import { UNIVERS_OPTIONS } from '@/shared/payload/univers'
import { noCityNumber, richTextRule, textareaRule, textRule } from '@/shared/payload/validators'

import { hasRole } from '@/features/access'

import { servicesAccess } from './access'
import { servicePageSlugRule } from './validators'

type RevalidatedDoc = { slug?: string | null; univers?: string | null }

const pathsOf = (doc: RevalidatedDoc, previousDoc?: RevalidatedDoc): string[] =>
  [doc.slug, previousDoc?.slug, doc.univers, previousDoc?.univers]
    .filter((segment): segment is string => Boolean(segment))
    .map((segment) => `/${segment}`)
    .concat(['/', '/sitemap.xml'])

export const ServicePages: CollectionConfig = {
  slug: 'service-pages',
  labels: { singular: 'Page de service', plural: 'Pages de service' },
  admin: {
    group: 'Pages',
    hidden: ({ user }) => !hasRole(user, 'admin'),
    useAsTitle: 'h1',
    defaultColumns: ['h1', 'univers', 'slug', '_status'],
  },
  access: servicesAccess,
  versions: { drafts: true },
  hooks: {
    beforeValidate: [uniqueSeoAcrossCollections(['service-pages', 'hub-pages'])],
    afterChange: [
      revalidatePathsAfterChange<RevalidatedDoc & { _status?: 'draft' | 'published' | null }>(
        pathsOf,
      ),
    ],
    afterDelete: [revalidatePathsAfterDelete<RevalidatedDoc>((doc) => pathsOf(doc))],
  },
  fields: [
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      required: true,
      unique: true,
      validate: textRule(servicePageSlugRule),
      admin: { position: 'sidebar' },
    },
    {
      name: 'univers',
      label: 'Univers',
      type: 'select',
      options: [...UNIVERS_OPTIONS],
      required: true,
      admin: { position: 'sidebar' },
    },
    ...pageHeaderFields(),
    {
      name: 'mainImage',
      label: 'Image principale',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      label: 'Contenu',
      type: 'richText',
      editor: contentEditor(),
      validate: richTextRule(noCityNumber),
    },
    {
      name: 'faq',
      label: 'Questions fréquentes',
      type: 'array',
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          required: true,
          validate: textRule(noCityNumber),
        },
        {
          name: 'answer',
          label: 'Réponse',
          type: 'textarea',
          required: true,
          validate: textareaRule(noCityNumber),
        },
      ],
    },
    seoFields(),
  ],
}
