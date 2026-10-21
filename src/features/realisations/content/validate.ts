import { noCityInTitle, noCityNumber, type Rule } from '@/shared/content/city-rules.mjs'
import { siloBySlug } from '@/shared/catalog'

import { realisationTitles } from './sections'
import { DATE_FORMAT } from '../format'
import type { ListingContent, Realisation } from '../types'

const RENDERED_TITLE_MAX = 70
const DESCRIPTION_MAX = 160
const SLUG_FORMAT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DURATION_FORMAT = /^PT(?=\d)(?:\d+H)?(?:\d+M)?(?:\d+S)?$/
const UPLOAD_DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/

type Input = {
  listing: ListingContent
  realisations: readonly Realisation[]
  titleTemplate: string
}

export function realisationViolations({ listing, realisations, titleTemplate }: Input): string[] {
  const violations: string[] = []
  const check = (label: string, value: string, rule: Rule) => {
    if (!value.trim()) violations.push(`${label} : valeur vide`)
    else {
      const result = rule(value)
      if (result !== true) violations.push(`${label} : ${result}`)
    }
  }
  const titles = new Map<string, string>()
  const descriptions = new Map<string, string>()
  const unique = (label: string, seo: { title: string; description: string }) => {
    for (const [field, value, seen] of [
      ['titre SEO', seo.title, titles],
      ['méta-description', seo.description, descriptions],
    ] as const) {
      const key = value.trim().toLowerCase()
      const previous = seen.get(key)
      if (previous) violations.push(`${label} : ${field} déjà utilisé(e) par ${previous}`)
      else seen.set(key, label)
    }
  }
  const checkSeo = (label: string, seo: { title: string; description: string }) => {
    check(`${label} titre SEO`, seo.title, noCityInTitle)
    check(`${label} méta-description`, seo.description, noCityNumber)
    if (titleTemplate.replace('%s', seo.title).length > RENDERED_TITLE_MAX) {
      violations.push(`${label} : titre affiché > ${RENDERED_TITLE_MAX} caractères`)
    }
    if (seo.description.length > DESCRIPTION_MAX) {
      violations.push(`${label} : méta-description > ${DESCRIPTION_MAX}`)
    }
    unique(label, seo)
  }

  check('réalisations H1', listing.h1, noCityInTitle)
  check('réalisations accroche', listing.tagline, noCityNumber)
  check('réalisations introduction', listing.intro, noCityNumber)
  checkSeo('réalisations', listing.seo)
  for (const [key, title] of Object.entries(realisationTitles)) {
    check(`réalisations titre ${key} sur-titre`, title.kicker, noCityInTitle)
    for (const line of title.lines) check(`réalisations titre ${key}`, line, noCityInTitle)
  }

  const slugs = new Set<string>()
  for (const item of realisations) {
    const label = `réalisation ${item.slug}`
    if (!SLUG_FORMAT.test(item.slug)) violations.push(`${label} : slug invalide`)
    if (slugs.has(item.slug)) violations.push(`${label} : slug en double`)
    slugs.add(item.slug)
    for (const silo of item.silos) {
      if (!siloBySlug(silo)) violations.push(`${label} : silo inconnu ${silo}`)
    }
    if (!DATE_FORMAT.test(item.date)) violations.push(`${label} : date au format AAAA-MM attendu`)

    check(`${label} titre`, item.title, noCityInTitle)
    check(`${label} chapeau`, item.lede, noCityNumber)
    check(`${label} problème`, item.problem, noCityNumber)
    check(`${label} solution`, item.solution, noCityNumber)
    check(`${label} résultat`, item.result.text, noCityNumber)
    if (item.place) check(`${label} lieu`, item.place, noCityNumber)
    if (item.result.metric) {
      check(`${label} mesure valeur`, item.result.metric.value, noCityNumber)
      check(`${label} mesure libellé`, item.result.metric.label, noCityNumber)
    }
    check(`${label} texte alternatif de la couverture`, item.cover.alt, noCityInTitle)
    if (item.beforeAfter) {
      check(`${label} texte alternatif avant`, item.beforeAfter.before.alt, noCityInTitle)
      check(`${label} texte alternatif après`, item.beforeAfter.after.alt, noCityInTitle)
    }
    for (const [index, image] of (item.gallery ?? []).entries()) {
      check(`${label} texte alternatif galerie ${index + 1}`, image.alt, noCityInTitle)
    }
    if (item.video) {
      if (!/^https:\/\/.+\.mp4$/.test(item.video.url)) {
        violations.push(`${label} : URL de vidéo https .mp4 attendue`)
      }
      if (!DURATION_FORMAT.test(item.video.duration)) {
        violations.push(`${label} : durée de vidéo au format ISO 8601 attendue (ex. PT29S)`)
      }
      if (
        !UPLOAD_DATE_FORMAT.test(item.video.uploadDate) ||
        Number.isNaN(Date.parse(item.video.uploadDate))
      ) {
        violations.push(`${label} : date de mise en ligne de la vidéo AAAA-MM-JJ attendue`)
      }
    }
    checkSeo(label, item.seo)
  }

  return violations
}

export function assertValidRealisations(input: Input): void {
  const violations = realisationViolations(input)
  if (violations.length > 0) {
    throw new Error(`Réalisations invalides :\n- ${violations.join('\n- ')}`)
  }
}
