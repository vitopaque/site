import { localBusinessId, siteConfig } from '@/features/site-settings'
import { breadcrumbList, type Crumb } from '@/shared/seo/jsonld'
import { absoluteUrl, buildMetadata } from '@/shared/seo/metadata'
import { universLabel } from '@/shared/payload/univers'

import { type Page, pathOf } from './queries'

export function pageMetadata(entry: Page) {
  const { page } = entry
  return buildMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: pathOf(entry),
    titleTemplate: siteConfig.seo.titleTemplate,
  })
}

export function pageCrumbs(entry: Page): Crumb[] {
  const { page } = entry
  const crumbs: Crumb[] = [{ name: 'Accueil', path: '/' }]
  if (entry.kind === 'service') {
    crumbs.push({ name: universLabel(page.univers), path: `/${page.univers}` })
  }
  crumbs.push({ name: page.h1, path: pathOf(entry) })
  return crumbs
}

export function pageJsonLd(entry: Page): Record<string, unknown>[] {
  const { page } = entry
  const data: Record<string, unknown>[] = [breadcrumbList(pageCrumbs(entry))]
  if (entry.kind === 'service') {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.h1,
      description: page.seo.description,
      url: absoluteUrl(pathOf(entry)),
      provider: { '@id': localBusinessId() },
    })
  }
  return data
}
