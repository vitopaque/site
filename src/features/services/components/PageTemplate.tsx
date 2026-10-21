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
    <article className="max-w-page py-section px-margin mx-auto">
      {pageJsonLd(entry).map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      <header>
        <p className="label-caps text-accent-700">{page.tagline}</p>
        <h1 className="text-headline-xl mt-4 wrap-break-word hyphens-auto uppercase">{page.h1}</h1>
        <p className="text-body-lg mt-6 max-w-prose text-neutral-700">{page.intro}</p>
      </header>
      {service?.image ? (
        <Image
          src={service.image.src}
          alt={service.image.alt}
          priority
          sizes="(min-width: 90rem) 90rem, 100vw"
          className="mt-12"
        />
      ) : null}
      {service ? (
        <div className="mt-12 max-w-prose">
          <service.Body />
        </div>
      ) : null}
      {faq.length > 0 ? (
        <section className="mt-12 max-w-prose">
          <h2 className="text-headline-lg uppercase">Questions fréquentes</h2>
          <dl className="mt-4">
            {faq.map((item, index) => (
              <div key={index} className="mt-4">
                <dt className="text-headline-sm uppercase">{item.question}</dt>
                <dd className="mt-2 text-neutral-700">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
      {linkedServices.length > 0 ? (
        <nav className="mt-12" aria-label="Nos prestations">
          <ul className="flex flex-wrap gap-6">
            {linkedServices.map((linked) => (
              <li key={linked.slug}>
                <Link
                  href={`/${linked.slug}`}
                  className="label-btn-lg text-accent-700 underline underline-offset-4"
                >
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
