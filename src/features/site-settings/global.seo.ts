import type { GlobalConfig } from 'payload'

import { hasRole, isAdmin } from '@/features/access'
import { revalidateTagAfterChange, SITE_SETTINGS_TAG } from '@/shared/payload/hooks'
import { noCityInTitle, textRule } from '@/shared/payload/validators'

const titleTemplateRule = (value: string): true | string => {
  const cityCheck = noCityInTitle(value)
  if (cityCheck !== true) return cityCheck
  return value.includes('%s') ? true : 'Le modèle doit contenir %s (titre de la page).'
}

export const SeoSettings: GlobalConfig = {
  slug: 'seo-settings',
  label: 'Réglages SEO',
  admin: { group: 'Réglages', hidden: ({ user }) => !hasRole(user, 'admin') },
  access: { read: () => true, update: isAdmin },
  hooks: { afterChange: [revalidateTagAfterChange(SITE_SETTINGS_TAG)] },
  fields: [
    {
      name: 'titleTemplate',
      label: 'Modèle de titre',
      type: 'text',
      required: true,
      defaultValue: "%s | VIT'OPAQUE",
      validate: textRule(titleTemplateRule),
    },
    {
      name: 'defaultShareImage',
      label: 'Image de partage par défaut',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
