import { siteConfig } from '@/features/site-settings'
import { textPageViolations } from '@/shared/content/text-page'
import { seoClashesWithPages } from '@/features/services'

import type { legalPages as LegalPages } from './content/legal-pages'

export function assertValidLegalPages(legalPages: typeof LegalPages): void {
  const { postalCode } = siteConfig.contact.address
  const postalCodes = [
    siteConfig.legal.headquarters.postalCode,
    ...(postalCode ? [postalCode] : []),
  ]
  const violations = Object.entries(legalPages).flatMap(([key, page]) => [
    ...textPageViolations(`légal ${key}`, page, siteConfig.seo.titleTemplate, postalCodes),
    ...seoClashesWithPages(`légal ${key}`, page.seo),
  ])
  if (violations.length > 0)
    throw new Error(`Pages légales invalides :\n- ${violations.join('\n- ')}`)
}
