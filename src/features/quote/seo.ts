import { quoteHref } from '@/shared/catalog'
import { siteConfig } from '@/features/site-settings'
import type { Crumb } from '@/shared/seo/jsonld'
import { buildMetadata } from '@/shared/seo/metadata'

import { contactPage } from './content/contact-page'

export const CONTACT_CRUMBS: Crumb[] = [
  { name: 'Accueil', path: '/' },
  { name: contactPage.h1, path: quoteHref() },
]

export const contactMetadata = () =>
  buildMetadata({
    ...contactPage.seo,
    path: quoteHref(),
    titleTemplate: siteConfig.seo.titleTemplate,
  })
