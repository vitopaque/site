import { ordinal } from '@/shared/ui/ordinal'
import { Section } from '@/shared/ui/Section'
import { SectionHeading, type SectionTitle } from '@/shared/ui/SectionHeading'

import type { Highlight } from '../content/types'

type Props = { items: readonly Highlight[]; heading: SectionTitle }

export function Highlights({ items, heading }: Props) {
  return (
    <Section labelledBy="points-cles-titre" tone="surface">
      <div className="reveal">
        <SectionHeading id="points-cles-titre" {...heading} />
      </div>
      <ol className="reveal card-grid-narrow mt-12">
        {items.map((item, index) => (
          <li key={item.title} className="blueprint blueprint-card">
            <span className="text-numeral font-heading text-accent">{ordinal(index)}</span>
            <h3 className="text-headline-sm mt-auto uppercase">{item.title}</h3>
            <p className="text-neutral-700">{item.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
