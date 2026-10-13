import type { CollectionConfig } from 'payload'

import {
  adminOrSelf,
  adminOrSelfField,
  adminOtherThanSelf,
  adminOtherThanSelfField,
  hasRole,
  isAdmin,
} from './access'
import { ROLE_OPTIONS } from './roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => !hasRole(user, 'admin'),
  },
  auth: true,
  access: {
    create: isAdmin,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: adminOtherThanSelf,
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', req })
        return totalDocs === 0 ? { ...data, role: 'admin' } : data
      },
    ],
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [...ROLE_OPTIONS],
      required: true,
      access: {
        read: adminOrSelfField,
        create: isAdmin,
        update: adminOtherThanSelfField,
      },
    },
  ],
}
