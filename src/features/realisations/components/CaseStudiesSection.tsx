import Link from 'next/link'

import { Section } from '@/shared/ui/Section'
import { SectionHeading, type SectionTitle } from '@/shared/ui/SectionHeading'

import type { CaseStudy } from '../types'

type Props = { items: readonly CaseStudy[]; heading: SectionTitle }

export function CaseStudiesSection({ items, heading }: Props) {
  if (items.length === 0) return null
  return (
    <Section labelledBy="etudes-de-cas-titre" tone="surface">
      <div className="reveal">
        <SectionHeading id="etudes-de-cas-titre" {...heading} />
      </div>
      <ul className="reveal card-grid mt-12">
        {items.map((item) => (
          <li key={item.id}>
            <article className="blueprint flex h-full flex-col gap-4 p-7">
              <p className="label-sm text-accent-700">{item.context}</p>
              <p className="text-numeral font-heading text-accent">{item.metric.value}</p>
              <p className="text-neutral-700">{item.metric.label}</p>
              <h3 className="text-headline-sm mt-auto uppercase">
                <Link href={item.href} className="hover:text-accent-700">
                  {item.title}
                </Link>
              </h3>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
