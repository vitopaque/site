import type { CollectionConfig } from 'payload'

import { hasRole, isAdmin } from '@/features/access'
import { noCityNumber } from '@/shared/content/city-rules.mjs'
import { textareaRule, textRule } from '@/shared/payload/validators'

const BIO_MAX = 280

const httpUrlRule = textRule((value) => {
  try {
    const { protocol } = new URL(value)
    return protocol === 'https:' || protocol === 'http:' ? true : 'URL http(s) attendue.'
  } catch {
    return 'URL absolue attendue.'
  }
})

export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: { singular: 'Auteur', plural: 'Auteurs' },
  admin: {
    useAsTitle: 'name',
    hidden: ({ user }) => !hasRole(user, 'admin'),
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', label: 'Nom', required: true },
    {
      name: 'role',
      type: 'text',
      label: 'Fonction',
      required: true,
      validate: textRule(noCityNumber),
    },
    { name: 'photo', type: 'upload', label: 'Photo', relationTo: 'media' },
    {
      name: 'bio',
      label: 'Biographie',
      type: 'textarea',
      maxLength: BIO_MAX,
      validate: textareaRule(noCityNumber),
    },
    { name: 'url', type: 'text', label: 'Site web', validate: httpUrlRule },
  ],
}
