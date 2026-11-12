import { siteConfig } from '@/features/site-settings'
import type { Crumb } from '@/shared/seo/jsonld'
import { buildMetadata } from '@/shared/seo/metadata'

import { legalPages, type LegalKey } from './content/legal-pages'

export const legalMetadata = (key: LegalKey) =>
  buildMetadata({
    ...legalPages[key].seo,
    path: legalPages[key].path,
    titleTemplate: siteConfig.seo.titleTemplate,
    robots: { index: false, follow: true },
  })

export const legalCrumbs = (key: LegalKey): Crumb[] => [
  { name: 'Accueil', path: '/' },
  { name: legalPages[key].h1, path: legalPages[key].path },
]
