import { siteConfig } from '@/features/site-settings'
import type { Crumb } from '@/shared/seo/jsonld'
import { buildMetadata } from '@/shared/seo/metadata'

import { aboutPage } from './content/about-page'

export const ABOUT_PATH = '/a-propos'

export const aboutMetadata = () =>
  buildMetadata({ ...aboutPage.seo, path: ABOUT_PATH, titleTemplate: siteConfig.seo.titleTemplate })

export const aboutCrumbs = (): Crumb[] => [
  { name: 'Accueil', path: '/' },
  { name: aboutPage.h1, path: ABOUT_PATH },
]
