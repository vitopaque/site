import { Section } from '@/shared/ui/Section'
import { SectionHeading, type SectionTitle } from '@/shared/ui/SectionHeading'

import type { Guide } from '../types'
import { ArticleCard } from './ArticleCard'

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
            <ArticleCard item={item} layout="text" />
          </li>
        ))}
      </ul>
    </Section>
  )
}
