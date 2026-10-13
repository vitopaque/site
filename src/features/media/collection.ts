import type { CollectionConfig } from 'payload'

import { adminOrCreator, isAdminOrEditor } from '@/features/access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: adminOrCreator(),
    delete: adminOrCreator(),
  },
  upload: { mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] },
  fields: [
    { name: 'alt', type: 'text', required: true },
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
