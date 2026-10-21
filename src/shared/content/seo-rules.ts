import type { Rule } from './city-rules.mjs'

export const RENDERED_TITLE_MAX = 70
export const DESCRIPTION_MAX = 160

export type Seen = Map<string, string>

export function makeCheck(violations: string[]) {
  return (label: string, value: string, rule: Rule) => {
    if (!value.trim()) {
      violations.push(`${label} : valeur vide`)
      return
    }
    const result = rule(value)
    if (result !== true) violations.push(`${label} : ${result}`)
  }
}

export function registerUnique(
  violations: string[],
  label: string,
  value: string,
  seen: Seen,
  field: string,
) {
  const key = value.trim().toLowerCase()
  const previous = seen.get(key)
  if (previous) violations.push(`${label} : ${field} déjà utilisé(e) par ${previous}`)
  else seen.set(key, label)
}

export function checkSeoLengths(
  violations: string[],
  label: string,
  seo: { title: string; description: string },
  titleTemplate: string,
) {
  if (titleTemplate.replace('%s', seo.title).length > RENDERED_TITLE_MAX) {
    violations.push(`${label} : titre affiché > ${RENDERED_TITLE_MAX} caractères`)
  }
  if (seo.description.length > DESCRIPTION_MAX) {
    violations.push(`${label} : méta-description > ${DESCRIPTION_MAX}`)
  }
}
