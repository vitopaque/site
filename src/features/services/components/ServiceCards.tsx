import Link from 'next/link'

import { ordinal } from '@/shared/ui/ordinal'

import type { ServicePageContent } from '../content/types'

export function ServiceCards({ services }: { services: readonly ServicePageContent[] }) {
  return (
    <ul className="reveal card-grid mt-12">
      {services.map((service, index) => (
        <li key={service.slug} className="blueprint blueprint-card">
          <span className="text-numeral font-heading text-accent">{ordinal(index)}</span>
          <h3 className="text-headline-sm uppercase">
            <Link href={`/${service.slug}`} className="hover:text-accent-700">
              {service.h1}
            </Link>
          </h3>
          <p className="text-neutral-700">{service.summary}</p>
        </li>
      ))}
    </ul>
  )
}
