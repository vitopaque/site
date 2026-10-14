import type { CollectionConfig } from 'payload'

import { adminOrCreator, isAdminOrEditor } from '@/features/access'
import { validateFilename } from './hooks'
import { noCityInTitle } from '@/shared/content/city-rules.mjs'
import { textRule } from '@/shared/payload/validators'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: adminOrCreator(),
    delete: adminOrCreator(),
  },
  hooks: { beforeValidate: [validateFilename] },
  upload: { mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] },
  fields: [
    { name: 'alt', type: 'text', required: true, validate: textRule(noCityInTitle) },
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
