import type { Field, GlobalConfig } from 'payload'

import { hasRole, isAdmin } from '@/features/access'
import { revalidateTagAfterChange, SITE_SETTINGS_TAG } from '@/shared/payload/hooks'
import { noCityNumber, textRule } from '@/shared/payload/validators'

const INTERNAL_OR_ABSOLUTE = /^(\/[^\s]*|https:\/\/[^\s]+)$/

const linkFields: Field[] = [
  {
    name: 'label',
    label: 'Libellé',
    type: 'text',
    required: true,
    validate: textRule(noCityNumber),
  },
  {
    name: 'href',
    label: 'Cible',
    type: 'text',
    required: true,
    admin: { description: 'Chemin interne (/batiment) ou URL https://' },
    validate: (value: string | null | undefined) =>
      typeof value === 'string' && INTERNAL_OR_ABSOLUTE.test(value)
        ? true
        : 'Chemin commençant par / ou URL https://',
  },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: { group: 'Réglages', hidden: ({ user }) => !hasRole(user, 'admin') },
  access: { read: () => true, update: isAdmin },
  hooks: { afterChange: [revalidateTagAfterChange(SITE_SETTINGS_TAG)] },
  fields: [
    { name: 'menu', label: 'Menu', type: 'array', fields: linkFields },
    { name: 'footerLinks', label: 'Liens du pied de page', type: 'array', fields: linkFields },
  ],
}
