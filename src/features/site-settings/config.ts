import type { SiteConfig } from './types'
import { assertValidSiteConfig } from './validate'

export const siteConfig: SiteConfig = {
  name: "VIT'OPAQUE",
  baseline: 'Films de prestige',
  locationNote: 'Aux portes de Montpellier',
  contact: {
    phone: '06 12 44 14 42',
    email: 'contact@vitopaque.com',
    address: { street: null, postalCode: '34740', city: 'Vendargues' },
    hours: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '12:00',
      },
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '14:00',
        closes: '18:00',
      },
    ],
  },
  social: [
    { network: 'facebook', url: 'https://www.facebook.com/vit.opaque' },
    { network: 'instagram', url: 'https://www.instagram.com/vit.opaque/' },
    { network: 'linkedin', url: 'https://www.linkedin.com/company/vit-opaque/' },
  ],
  seo: { titleTemplate: "%s | VIT'OPAQUE" },
  footerColumns: [],
}

assertValidSiteConfig(siteConfig)
