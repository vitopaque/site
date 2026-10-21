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
  serviceArea: {
    automotive: { location: 'Vendargues' },
    building: {
      departments: [
        { name: 'Hérault', label: 'l’Hérault' },
        { name: 'Gard', label: 'le Gard' },
        { name: 'Aude', label: 'l’Aude' },
      ],
      region: { name: 'Occitanie', label: 'l’Occitanie', minSurfaceM2: 30 },
    },
    liquidCrystal: { country: 'France' },
  },
  social: [
    { network: 'facebook', url: 'https://www.facebook.com/vit.opaque' },
    { network: 'instagram', url: 'https://www.instagram.com/vit.opaque/' },
    { network: 'linkedin', url: 'https://www.linkedin.com/company/vit-opaque/' },
  ],
  seo: {
    titleTemplate: "%s | VIT'OPAQUE",
    home: {
      title: 'Films pour vitrages : bâtiment, auto, bateau',
      description:
        "Pose de films solaires, sécurité, PDLC et vitres teintées par VIT'OPAQUE, à Vendargues, aux portes de Montpellier. Devis gratuit.",
    },
  },
  navigation: {
    links: [
      { label: 'Accueil', href: '/' },
      { label: 'Bâtiment', href: '/batiment' },
      { label: 'Voiture', href: '/voiture' },
      { label: 'Bateau', href: '/bateau' },
      { label: 'Réalisations', href: '/realisations' },
      { label: 'Conseils & expertises', href: '/conseils-expertises' },
    ],
    cta: { label: 'Devis gratuit', href: '/contact-devis' },
  },
  footerColumns: [],
}

assertValidSiteConfig(siteConfig)
