import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

import { JsonLd } from '@/shared/seo/jsonld'

import type { PublishedPage } from '../queries'
import { pageJsonLd } from '../seo'

export function PageTemplate({ page }: { page: PublishedPage }) {
  const { doc } = page
  const image =
    page.kind === 'service' && typeof page.doc.mainImage === 'object' ? page.doc.mainImage : null
  const linkedServices =
    page.kind === 'hub'
      ? (page.doc.services ?? []).filter((service) => typeof service === 'object')
      : []

  return (
    <article className="max-w-page py-3xl px-margin mx-auto">
      {pageJsonLd(page).map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      <header>
        <p className="label-caps text-on-surface-variant">{doc.tagline}</p>
        <h1 className="mt-md text-display-hero">{doc.h1}</h1>
        <p className="mt-lg text-body-lg text-on-surface-variant max-w-prose">{doc.intro}</p>
      </header>
      {image?.url ? (
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width ?? 1600}
          height={image.height ?? 900}
          priority
          sizes="(min-width: 90rem) 90rem, 100vw"
          className="mt-xl rounded-md"
        />
      ) : null}
      {page.kind === 'service' && page.doc.content ? (
        <div className="mt-xl max-w-prose">
          <RichText data={page.doc.content} />
        </div>
      ) : null}
      {page.kind === 'service' && (page.doc.faq ?? []).length > 0 ? (
        <section className="mt-xl max-w-prose">
          <h2 className="text-headline-lg">Questions fréquentes</h2>
          <dl className="mt-md">
            {(page.doc.faq ?? []).map((item) => (
              <div key={item.id ?? item.question} className="mt-md">
                <dt className="text-headline-md">{item.question}</dt>
                <dd className="mt-sm text-on-surface-variant">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
      {linkedServices.length > 0 ? (
        <nav className="mt-xl" aria-label="Nos prestations">
          <ul className="gap-gutter flex flex-wrap">
            {linkedServices.map((service) => (
              <li key={service.id}>
                <Link href={`/${service.slug}`} className="label-md text-primary">
                  {service.h1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </article>
  )
}
