import { noCityInTitle, noCityNumber, type Rule } from '@/shared/content/city-rules.mjs'

import { servicePageSlugRule } from '../validators'
import type { HubPageContent, ServicePageContent } from './types'

const RENDERED_TITLE_MAX = 70
const DESCRIPTION_MAX = 160
const TAGLINE_MAX = 160

type Content = {
  hubPages: HubPageContent[]
  servicePages: ServicePageContent[]
  titleTemplate: string
  internalHrefs: string[]
}

export function contentViolations({
  hubPages,
  servicePages,
  titleTemplate,
  internalHrefs,
}: Content): string[] {
  const violations: string[] = []
  const seenTitles = new Map<string, string>()
  const seenDescriptions = new Map<string, string>()

  const check = (label: string, value: string, rule: Rule) => {
    if (!value.trim()) {
      violations.push(`${label} : valeur vide`)
      return
    }
    const result = rule(value)
    if (result !== true) violations.push(`${label} : ${result}`)
  }
  const unique = (label: string, value: string, seen: Map<string, string>, field: string) => {
    const key = value.trim().toLowerCase()
    const previous = seen.get(key)
    if (previous) violations.push(`${label} : ${field} déjà utilisé(e) par ${previous}`)
    else seen.set(key, label)
  }

  const checkPage = (label: string, page: HubPageContent | ServicePageContent) => {
    check(`${label} H1`, page.h1, noCityInTitle)
    check(`${label} titre SEO`, page.seo.title, noCityInTitle)
    check(`${label} méta-description`, page.seo.description, noCityNumber)
    check(`${label} accroche`, page.tagline, noCityNumber)
    check(`${label} introduction`, page.intro, noCityNumber)
    if (titleTemplate.replace('%s', page.seo.title).length > RENDERED_TITLE_MAX) {
      violations.push(`${label} : titre affiché > ${RENDERED_TITLE_MAX} caractères`)
    }
    if (page.seo.description.length > DESCRIPTION_MAX) {
      violations.push(`${label} : méta-description > ${DESCRIPTION_MAX}`)
    }
    if (page.tagline.length > TAGLINE_MAX) violations.push(`${label} : accroche > ${TAGLINE_MAX}`)
    unique(label, page.seo.title, seenTitles, 'titre SEO')
    unique(label, page.seo.description, seenDescriptions, 'méta-description')
  }

  const hubUnivers = new Set<string>()
  for (const hub of hubPages) {
    const label = `hub ${hub.univers}`
    if (hubUnivers.has(hub.univers)) violations.push(`${label} : défini plusieurs fois`)
    hubUnivers.add(hub.univers)
    checkPage(label, hub)
  }

  const slugs = new Set<string>()
  for (const page of servicePages) {
    const label = `service ${page.slug}`
    const slugRule = servicePageSlugRule(page.slug)
    if (slugRule !== true) violations.push(`${label} : ${slugRule}`)
    if (slugs.has(page.slug)) violations.push(`${label} : slug en double`)
    slugs.add(page.slug)
    if (!hubUnivers.has(page.univers)) {
      violations.push(`${label} : aucun hub pour l'univers ${page.univers}`)
    }
    checkPage(label, page)
    if (page.image) check(`${label} texte alternatif`, page.image.alt, noCityInTitle)
    for (const [index, item] of (page.faq ?? []).entries()) {
      check(`${label} FAQ ${index + 1} question`, item.question, noCityNumber)
      check(`${label} FAQ ${index + 1} réponse`, item.answer, noCityNumber)
    }
  }

  const knownPaths = new Set(['/', ...hubUnivers].map((p) => (p === '/' ? p : `/${p}`)))
  for (const slug of slugs) knownPaths.add(`/${slug}`)
  for (const href of internalHrefs) {
    if (href.startsWith('/') && !knownPaths.has(href)) {
      violations.push(`lien interne ${href} : aucune page correspondante`)
    }
  }

  return violations
}

export function assertValidContent(content: Content): void {
  const violations = contentViolations(content)
  if (violations.length > 0) {
    throw new Error(`Contenu invalide :\n- ${violations.join('\n- ')}`)
  }
}
