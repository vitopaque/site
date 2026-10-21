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
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true, validate: textRule(noCityNumber) },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    {
      name: 'bio',
      type: 'textarea',
      maxLength: BIO_MAX,
      validate: textareaRule(noCityNumber),
    },
    { name: 'url', type: 'text', validate: httpUrlRule },
  ],
}
