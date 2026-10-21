import { siteConfig } from '@/features/site-settings'

import { serviceSilos } from '../catalog'
import type { HubPageContent, ServicePageContent } from './types'
import { assertValidContent } from './validate'

export const hubPages: HubPageContent[] = []

export const servicePages: ServicePageContent[] = []

assertValidContent({
  hubPages,
  servicePages,
  silos: serviceSilos,
  titleTemplate: siteConfig.seo.titleTemplate,
  home: siteConfig.seo.home,
  internalHrefs: siteConfig.footerColumns.flatMap((column) =>
    column.links.map((link) => link.href),
  ),
})
