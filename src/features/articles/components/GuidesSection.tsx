import Link from 'next/link'

import { PlaceholderCard } from '@/shared/ui/PlaceholderCard'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import type { GuideItem } from '../types'

export function GuidesSection({ items }: { items: readonly GuideItem[] }) {
  return (
    <Section labelledBy="guides-titre" tone="surface">
      <div className="reveal">
        <SectionHeading
          id="guides-titre"
          kicker="Conseils & expertises"
          lines={['Comprendre', 'avant de choisir.']}
        />
      </div>
      <ul className="reveal card-grid mt-12">
        {items.map((item) => (
          <li key={item.id}>
            {'placeholder' in item ? (
              <PlaceholderCard hint={item.hint} />
            ) : (
              <article className="blueprint flex h-full flex-col gap-4 p-7">
                <h3 className="text-headline-sm uppercase">
                  <Link href={item.href} className="hover:text-accent-700">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-neutral-700">{item.excerpt}</p>
              </article>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}
