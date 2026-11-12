import { seoClashesWithPages } from '@/features/services'
import { siteConfig } from '@/features/site-settings'
import { textPageViolations } from '@/shared/content/text-page'

import type { AboutPageContent } from './content/about-page'

export function assertValidAboutPage(page: AboutPageContent): void {
  const sections = [
    { title: page.story.title, blocks: [page.story.text] },
    ...page.partners.map((p) => ({ title: p.title, blocks: [p.text] })),
    { title: page.references.title, blocks: [page.references.text] },
    ...page.guarantees.map((g) => ({ title: g.title, blocks: [g.text] })),
  ]
  const violations = [
    ...textPageViolations('à propos', { ...page, sections }, siteConfig.seo.titleTemplate),
    ...seoClashesWithPages('à propos', page.seo),
  ]
  if (violations.length > 0)
    throw new Error(`Page à propos invalide :\n- ${violations.join('\n- ')}`)
}
