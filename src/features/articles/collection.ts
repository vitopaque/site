import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/features/access'
import { serviceSilos } from '@/shared/catalog'
import { noCityInTitle, noCityNumber } from '@/shared/content/city-rules.mjs'
import { seoFields } from '@/shared/payload/seo-fields'
import { textareaRule, textRule } from '@/shared/payload/validators'
import { TITLE_TEMPLATE } from '@/shared/seo/title-template'
import { articleAccess } from './access'
import { articleEditor } from './editor'
import { captureLiveState, revalidateOnChange, revalidateOnDelete, stampPublishedAt } from './hooks'
import { slugify } from './slug'
import { validateContent, validateImage, validateSlug } from './validators'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'service', 'publishedAt', '_status'],
  },
  access: articleAccess,
  versions: { drafts: { validate: true } },
  hooks: {
    beforeChange: [stampPublishedAt, captureLiveState],
    afterChange: [revalidateOnChange],
    afterDelete: [revalidateOnDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true, validate: textRule(noCityInTitle) },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Laisser vide pour le générer depuis le titre. Modifier un slug publié casse l’ancienne URL.',
      },
      hooks: {
        beforeValidate: [
          ({ siblingData, value }) =>
            value || (typeof siblingData.title === 'string' ? slugify(siblingData.title) : value),
        ],
      },
      validate: validateSlug,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      validate: textareaRule(noCityNumber),
    },
    {
      name: 'content',
      type: 'richText',
      editor: articleEditor,
      validate: validateContent,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      validate: validateImage,
    },
    { name: 'author', type: 'relationship', relationTo: 'authors', required: true },
    {
      name: 'service',
      type: 'select',
      required: true,
      options: serviceSilos.map(({ slug, label }) => ({ label, value: slug })),
      admin: { position: 'sidebar' },
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    {
      name: 'contentUpdatedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'À renseigner seulement pour une mise à jour réelle du contenu.',
      },
    },
    seoFields({ titleTemplate: TITLE_TEMPLATE, collection: 'articles' }),
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true, position: 'sidebar' },
      access: { read: isAdminOrEditor, update: () => false },
      hooks: {
        beforeChange: [
          ({ operation, req, value }) => (operation === 'create' ? req.user?.id : value),
        ],
      },
    },
  ],
}
