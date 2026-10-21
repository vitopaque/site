import { noCityInTitle, noCityNumber } from '@/shared/content/city-rules.mjs'

import type { SiteConfig } from './types'

export function assertValidSiteConfig(config: SiteConfig): void {
  const violations: string[] = []
  const check = (label: string, value: string, rule: (v: string) => true | string) => {
    const result = rule(value)
    if (result !== true) violations.push(`${label} : ${result}`)
  }

  check('nom', config.name, noCityInTitle)
  check('signature', config.baseline, noCityNumber)
  if (config.locationNote) check('mention de localisation', config.locationNote, noCityNumber)
  check('titre SEO accueil', config.seo.home.title, noCityInTitle)
  check('méta-description accueil', config.seo.home.description, noCityNumber)
  for (const link of [...config.navigation.links, config.navigation.cta])
    check(`navigation ${link.href}`, link.label, noCityNumber)
  for (const column of config.footerColumns) {
    check(`colonne ${column.title}`, column.title, noCityNumber)
    for (const link of column.links) check(`lien ${link.href}`, link.label, noCityNumber)
  }

  const { building, liquidCrystal } = config.serviceArea
  if (building.departments.length === 0) violations.push('zone : aucun département bâtiment')
  if (building.departments.some((d) => !d.name || !d.label))
    violations.push('zone : nom ou libellé de département manquant')
  if (!building.region.name || !building.region.label)
    violations.push('zone : nom ou libellé de région manquant')
  if (building.region.minSurfaceM2 <= 0) violations.push('zone : surface minimale invalide')
  if (!liquidCrystal.country) violations.push('zone : pays du film à cristaux liquides manquant')

  if (violations.length > 0)
    throw new Error(`Configuration du site invalide :\n- ${violations.join('\n- ')}`)
}
