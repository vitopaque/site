import Link from 'next/link'

import { PlaceholderCard } from '@/shared/ui/PlaceholderCard'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import type { CaseStudyItem } from '../types'

export function CaseStudiesSection({ items }: { items: readonly CaseStudyItem[] }) {
  return (
    <Section labelledBy="etudes-de-cas-titre" tone="surface">
      <div className="reveal">
        <SectionHeading
          id="etudes-de-cas-titre"
          kicker="Études de cas"
          lines={['Un besoin, un film,', 'un résultat.']}
        />
      </div>
      <ul className="reveal card-grid mt-12">
        {items.map((item) => (
          <li key={item.id}>
            {'placeholder' in item ? (
              <PlaceholderCard hint={item.hint} />
            ) : (
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
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}
