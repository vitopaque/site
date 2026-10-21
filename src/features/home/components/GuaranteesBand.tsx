import { Section } from '@/shared/ui/Section'

import { guarantees } from '../content/guarantees'

export function GuaranteesBand() {
  return (
    <Section labelledBy="engagements-titre">
      <h2 id="engagements-titre" className="sr-only">
        {guarantees.title}
      </h2>
      <ul className="reveal border-divider grid border-y md:grid-cols-3">
        {guarantees.items.map((item) => (
          <li
            key={item.title}
            className="border-divider flex flex-col gap-2 px-6 py-8 not-first:border-t md:not-first:border-t-0 md:not-first:border-l"
          >
            <span className="font-heading text-title-md text-accent-700 uppercase">
              {item.title}
            </span>
            <span className="text-neutral-700">{item.text}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
