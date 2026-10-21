import { ordinal } from '@/shared/ui/ordinal'
import type { SectionTitle } from '@/shared/ui/SectionHeading'

import type { Highlight } from '../content/types'

type Props = { items: readonly Highlight[]; heading: SectionTitle }

export function Highlights({ items, heading }: Props) {
  return (
    <section
      aria-labelledby="points-cles-titre"
      className="blueprint blueprint-card [--card-min-height:0px]"
    >
      <div className="flex flex-col gap-2">
        <p className="label-caps text-accent-700">{heading.kicker}</p>
        <h2 id="points-cles-titre" className="text-headline-sm uppercase">
          {heading.lines.join(' ')}
        </h2>
      </div>
      <ol className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li key={item.title} className="border-divider flex gap-4 border-t pt-4">
            <span className="font-heading text-accent-700 text-title-md w-7 shrink-0">
              {ordinal(index)}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="label-btn-lg uppercase">{item.title}</h3>
              <p className="text-body-md text-neutral-700">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
