import type { CollectionConfig } from 'payload'

import { adminOrCreator, isAdminOrEditor } from '@/features/access'
import { validateFilename } from './hooks'
import { noCityInTitle } from '@/shared/content/city-rules.mjs'
import { createdByField } from '@/shared/payload/created-by-field'
import { textRule } from '@/shared/payload/validators'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Média', plural: 'Médias' },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: adminOrCreator(),
    delete: adminOrCreator(),
  },
  hooks: { beforeValidate: [validateFilename] },
  upload: { mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texte alternatif',
      required: true,
      validate: textRule(noCityInTitle),
    },
    createdByField(isAdminOrEditor),
  ],
}
