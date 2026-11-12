import { noCityInTitle, noCityNumber } from './city-rules.mjs'
import { checkSeoLengths, makeCheck } from './seo-rules'

export type TextBlock = string | readonly string[]
export type TextSection = { title: string; blocks: readonly TextBlock[] }

export type TextPageContent = {
  h1: string
  intro: string
  seo: { title: string; description: string }
  sections: readonly TextSection[]
}

export function textPageViolations(
  label: string,
  page: TextPageContent,
  titleTemplate: string,
  postalCodes: readonly string[] = [],
): string[] {
  const violations: string[] = []
  const check = makeCheck(violations)
  const withoutPostalCodes = (value: string) =>
    postalCodes.reduce((text, code) => text.replaceAll(code, ''), value)

  check(`${label} H1`, page.h1, noCityInTitle)
  check(`${label} titre SEO`, page.seo.title, noCityInTitle)
  check(`${label} méta-description`, page.seo.description, noCityNumber)
  check(`${label} introduction`, page.intro, noCityNumber)
  checkSeoLengths(violations, label, page.seo, titleTemplate)
  for (const section of page.sections) {
    check(`${label} section « ${section.title} »`, section.title, noCityInTitle)
    for (const block of section.blocks) {
      for (const text of typeof block === 'string' ? [block] : block) {
        check(`${label} section « ${section.title} »`, withoutPostalCodes(text), noCityNumber)
      }
    }
  }
  return violations
}
