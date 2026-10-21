import { noCityInTitle, noCityNumber, type Rule } from '@/shared/content/city-rules.mjs'

import { homeContact } from './contact'
import { homeFaq } from './faq'
import { guarantees } from './guarantees'
import { homeHero } from './hero'
import { methodIntro, methodSteps } from './method'
import { homeTitles } from './sections'

export function assertValidHomeContent(): void {
  const violations: string[] = []
  const check = (label: string, value: string, rule: Rule) => {
    const result = value.trim() ? rule(value) : 'valeur vide'
    if (result !== true) violations.push(`${label} : ${result}`)
  }

  for (const [key, title] of Object.entries(homeTitles)) {
    check(`accueil titre ${key} sur-titre`, title.kicker, noCityInTitle)
    for (const line of title.lines) check(`accueil titre ${key}`, line, noCityInTitle)
  }
  check('accueil hero sur-titre', homeHero.kicker, noCityInTitle)
  check('accueil hero sous-titre', homeHero.subtitle, noCityNumber)
  check(
    'accueil hero introduction',
    homeHero.intro.map((part) => (typeof part === 'string' ? part : part.text)).join(''),
    noCityNumber,
  )
  check('accueil garanties titre', guarantees.title, noCityInTitle)
  for (const [index, item] of guarantees.items.entries()) {
    check(`accueil garantie ${index + 1} titre`, item.title, noCityInTitle)
    check(`accueil garantie ${index + 1} texte`, item.text, noCityNumber)
  }
  check('accueil méthode introduction', methodIntro, noCityNumber)
  for (const [index, step] of methodSteps.entries()) {
    check(`accueil méthode ${index + 1} titre`, step.title, noCityInTitle)
    check(`accueil méthode ${index + 1} texte`, step.text, noCityNumber)
  }
  check('accueil contact sur-titre', homeContact.kicker, noCityInTitle)
  for (const line of homeContact.lines) check('accueil contact titre', line, noCityInTitle)
  check('accueil contact introduction', homeContact.intro, noCityNumber)
  for (const [index, item] of homeFaq.entries()) {
    check(`accueil FAQ ${index + 1} question`, item.question, noCityNumber)
    check(`accueil FAQ ${index + 1} réponse`, item.answer, noCityNumber)
  }

  if (violations.length > 0) throw new Error(`Accueil invalide :\n- ${violations.join('\n- ')}`)
}

assertValidHomeContent()
