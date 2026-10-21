import { noCityInTitle, noCityNumber } from '@/shared/content/city-rules.mjs'
import { checkSeoLengths, makeCheck } from '@/shared/content/seo-rules'
import { TITLE_TEMPLATE } from '@/shared/seo/title-template'

import { articleTitles, listing, pageSeo } from './listing'

const LAST_PAGE_SAMPLE = 99999

export function listingViolations(): string[] {
  const violations: string[] = []
  const check = makeCheck(violations)
  check('blog H1', listing.h1, noCityInTitle)
  check('blog accroche', listing.tagline, noCityNumber)
  check('blog introduction', listing.intro, noCityNumber)
  check('blog titre SEO', listing.seo.title, noCityInTitle)
  check('blog méta-description', listing.seo.description, noCityNumber)
  for (const [key, title] of Object.entries(articleTitles)) {
    check(`blog titre ${key} sur-titre`, title.kicker, noCityInTitle)
    for (const line of title.lines) check(`blog titre ${key}`, line, noCityInTitle)
  }
  for (const page of [1, LAST_PAGE_SAMPLE]) {
    checkSeoLengths(violations, `blog page ${page}`, pageSeo(page), TITLE_TEMPLATE)
  }
  return violations
}

export function assertValidListing(): void {
  const violations = listingViolations()
  if (violations.length > 0)
    throw new Error(`Contenu du blog invalide :\n- ${violations.join('\n- ')}`)
}
