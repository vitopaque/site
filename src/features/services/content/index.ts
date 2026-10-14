import { siteConfig } from '@/features/site-settings'

import type { HubPageContent, ServicePageContent } from './types'
import { assertValidContent } from './validate'

export const hubPages: HubPageContent[] = []

export const servicePages: ServicePageContent[] = []

assertValidContent({
  hubPages,
  servicePages,
  titleTemplate: siteConfig.seo.titleTemplate,
  internalHrefs: siteConfig.footerColumns.flatMap((column) =>
    column.links.map((link) => link.href),
  ),
})
