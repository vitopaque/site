import Image from 'next/image'
import Link from 'next/link'

import { JsonLd } from '@/shared/seo/jsonld'

import { type Page, servicesOf } from '../queries'
import { pageJsonLd } from '../seo'

export function PageTemplate({ entry }: { entry: Page }) {
  const { page } = entry
  const service = entry.kind === 'service' ? entry.page : null
  const linkedServices = entry.kind === 'hub' ? servicesOf(entry.page.univers) : []
  const faq = service?.faq ?? []

  return (
    <article className="max-w-page py-3xl px-margin mx-auto">
      {pageJsonLd(entry).map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      <header>
        <p className="label-caps text-on-surface-variant">{page.tagline}</p>
        <h1 className="mt-md text-display-hero">{page.h1}</h1>
        <p className="mt-lg text-body-lg text-on-surface-variant max-w-prose">{page.intro}</p>
      </header>
      {service?.image ? (
        <Image
          src={service.image.src}
          alt={service.image.alt}
          priority
          sizes="(min-width: 90rem) 90rem, 100vw"
          className="mt-xl rounded-md"
        />
      ) : null}
      {service ? (
        <div className="mt-xl max-w-prose">
          <service.Body />
        </div>
      ) : null}
      {faq.length > 0 ? (
        <section className="mt-xl max-w-prose">
          <h2 className="text-headline-lg">Questions fréquentes</h2>
          <dl className="mt-md">
            {faq.map((item, index) => (
              <div key={index} className="mt-md">
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
            {linkedServices.map((linked) => (
              <li key={linked.slug}>
                <Link href={`/${linked.slug}`} className="label-md text-primary">
                  {linked.h1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </article>
  )
}
