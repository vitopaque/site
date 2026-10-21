import Link from 'next/link'

import { Section } from '@/shared/ui/Section'
import { SectionHeading, type SectionTitle } from '@/shared/ui/SectionHeading'

import type { Guide } from '../types'

type Props = { items: readonly Guide[]; heading: SectionTitle }

export function GuidesSection({ items, heading }: Props) {
  if (items.length === 0) return null
  return (
    <Section labelledBy="guides-titre" tone="surface">
      <div className="reveal">
        <SectionHeading id="guides-titre" {...heading} />
      </div>
      <ul className="reveal card-grid mt-12">
        {items.map((item) => (
          <li key={item.id}>
            <article className="blueprint flex h-full flex-col gap-4 p-7">
              <h3 className="text-headline-sm uppercase">
                <Link href={item.href} className="hover:text-accent-700">
                  {item.title}
                </Link>
              </h3>
              <p className="text-neutral-700">{item.excerpt}</p>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
