import { getSeoSettings } from '@/features/site-settings'
import { absoluteUrl, buildMetadata } from '@/shared/seo/metadata'
import { breadcrumbList, type Crumb } from '@/shared/seo/jsonld'
import { universLabel } from '@/shared/payload/univers'
import type { Media } from '@/shared/payload-types'

import type { PublishedPage } from './queries'

const imageUrlOf = (image: number | Media | null | undefined): string | null =>
  image && typeof image === 'object' ? (image.url ?? null) : null

export const pathOf = (page: PublishedPage): string =>
  `/${page.kind === 'hub' ? page.doc.univers : page.doc.slug}`

export async function pageMetadata(page: PublishedPage) {
  const settings = await getSeoSettings()
  const shareImage = page.kind === 'service' ? page.doc.mainImage : settings.defaultShareImage
  return buildMetadata({
    title: page.doc.seo.title,
    description: page.doc.seo.description,
    path: pathOf(page),
    titleTemplate: settings.titleTemplate,
    imageUrl: imageUrlOf(shareImage) ?? imageUrlOf(settings.defaultShareImage),
  })
}

export function pageJsonLd(page: PublishedPage): Record<string, unknown>[] {
  const crumbs: Crumb[] = [{ name: 'Accueil', path: '/' }]
  if (page.kind === 'service') {
    crumbs.push({ name: universLabel(page.doc.univers), path: `/${page.doc.univers}` })
  }
  crumbs.push({ name: page.doc.h1, path: pathOf(page) })

  const data: Record<string, unknown>[] = [breadcrumbList(crumbs)]
  if (page.kind === 'service') {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.doc.h1,
      description: page.doc.seo.description,
      url: absoluteUrl(pathOf(page)),
    })
    const faq = page.doc.faq ?? []
    if (faq.length > 0) {
      data.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      })
    }
  }
  return data
}
