import { noCityInTitle, noCityNumber, type Rule } from '@/shared/content/city-rules.mjs'

import type { ContactPageContent } from './contact-page'

export function assertValidContactPage(page: ContactPageContent): void {
  const violations: string[] = []
  const check = (label: string, value: string, rule: Rule) => {
    const result = value.trim() ? rule(value) : 'valeur vide'
    if (result !== true) violations.push(`${label} : ${result}`)
  }

  check('contact H1', page.h1, noCityInTitle)
  check('contact titre SEO', page.seo.title, noCityInTitle)
  check('contact méta-description', page.seo.description, noCityNumber)
  check('contact introduction', page.intro, noCityNumber)
  for (const [index, step] of page.steps.entries()) {
    check(`contact étape ${index + 1}`, `${step.title} ${step.text}`, noCityNumber)
  }
  for (const [index, item] of page.faq.entries()) {
    check(`contact FAQ ${index + 1}`, `${item.question} ${item.answer}`, noCityNumber)
  }

  if (violations.length > 0)
    throw new Error(`Page contact invalide :\n- ${violations.join('\n- ')}`)
}
