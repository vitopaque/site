import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor } from '@/features/access'

export const articleAccess: NonNullable<CollectionConfig['access']> = {
  read: ({ req }) => (isAdminOrEditor({ req }) ? true : { _status: { equals: 'published' } }),
  readVersions: isAdminOrEditor,
  create: isAdminOrEditor,
  update: isAdminOrEditor,
  delete: isAdmin,
}
