import { PlaceholderCard } from '@/shared/ui/PlaceholderCard'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import type { ReviewItem } from '../types'

export function ReviewsSection({ items }: { items: readonly ReviewItem[] }) {
  return (
    <Section labelledBy="avis-titre">
      <div className="reveal">
        <SectionHeading
          id="avis-titre"
          kicker="Avis Google"
          lines={['Ce que disent', 'nos clients.']}
        />
      </div>
      <ul className="reveal card-grid mt-12">
        {items.map((item) => (
          <li key={item.id}>
            {'placeholder' in item ? (
              <PlaceholderCard hint={item.hint} />
            ) : (
              <figure className="blueprint flex h-full flex-col gap-4 p-7">
                <p className="text-headline-sm font-heading text-accent">
                  <span className="sr-only">Note : </span>
                  {item.rating}/5
                </p>
                <blockquote className="text-body-lg">{item.text}</blockquote>
                <figcaption className="label-sm text-accent-700 mt-auto">{item.author}</figcaption>
              </figure>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}
