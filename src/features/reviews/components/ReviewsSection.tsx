import { Section } from '@/shared/ui/Section'
import { SectionHeading, type SectionTitle } from '@/shared/ui/SectionHeading'

import type { Review } from '../types'

type Props = { items: readonly Review[]; heading: SectionTitle }

export function ReviewsSection({ items, heading }: Props) {
  if (items.length === 0) return null
  return (
    <Section labelledBy="avis-titre">
      <div className="reveal">
        <SectionHeading id="avis-titre" {...heading} />
      </div>
      <ul className="reveal card-grid mt-12">
        {items.map((item) => (
          <li key={item.id}>
            <figure className="blueprint flex h-full flex-col gap-4 p-7">
              <p className="text-headline-sm font-heading text-accent">
                <span className="sr-only">Note : </span>
                {item.rating}/5
              </p>
              <blockquote className="text-body-lg">{item.text}</blockquote>
              <figcaption className="label-sm text-accent-700 mt-auto">{item.author}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
