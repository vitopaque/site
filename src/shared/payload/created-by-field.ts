import type { Field, FieldAccess } from 'payload'

export const createdByField = (readAccess: FieldAccess): Field => ({
  name: 'createdBy',
  label: 'Créé par',
  type: 'relationship',
  relationTo: 'users',
  admin: { readOnly: true, position: 'sidebar' },
  access: { read: readAccess, update: () => false },
  hooks: {
    beforeChange: [({ operation, req, value }) => (operation === 'create' ? req.user?.id : value)],
  },
})
