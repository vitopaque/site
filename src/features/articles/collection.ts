import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/features/access'
import { serviceSilos } from '@/shared/catalog'
import { noCityInTitle, noCityNumber } from '@/shared/content/city-rules.mjs'
import { createdByField } from '@/shared/payload/created-by-field'
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
  labels: { singular: 'Article', plural: 'Articles' },
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
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      required: true,
      validate: textRule(noCityInTitle),
    },
    {
      name: 'slug',
      label: 'Slug (URL)',
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
      label: 'Extrait',
      type: 'textarea',
      required: true,
      validate: textareaRule(noCityNumber),
    },
    {
      name: 'content',
      label: 'Contenu',
      type: 'richText',
      editor: articleEditor,
      validate: validateContent,
    },
    {
      name: 'image',
      label: 'Image à la une',
      type: 'upload',
      relationTo: 'media',
      validate: validateImage,
    },
    {
      name: 'author',
      type: 'relationship',
      label: 'Auteur',
      relationTo: 'authors',
      required: true,
    },
    {
      name: 'service',
      label: 'Page de service liée',
      type: 'select',
      required: true,
      options: serviceSilos.map(({ slug, label }) => ({ label, value: slug })),
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date de publication',
      admin: { position: 'sidebar' },
    },
    {
      name: 'contentUpdatedAt',
      label: 'Dernière mise à jour du contenu',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'À renseigner seulement pour une mise à jour réelle du contenu.',
      },
    },
    seoFields({ titleTemplate: TITLE_TEMPLATE, collection: 'articles' }),
    createdByField(isAdminOrEditor),
  ],
}
