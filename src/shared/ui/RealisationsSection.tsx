import Link from 'next/link'

import { RealisationCard, type RealisationItem } from './RealisationCard'
import { Section } from './Section'
import { SectionHeading, type SectionTitle } from './SectionHeading'

const HOVER = { light: 'hover:bg-surface', surface: 'hover:bg-background' } as const

type Props = {
  items: readonly RealisationItem[]
  heading: SectionTitle
  href: string
  tone?: keyof typeof HOVER
}

export function RealisationsSection({ items, heading, href, tone = 'light' }: Props) {
  if (items.length === 0) return null
  return (
    <Section labelledBy="realisations-titre" tone={tone}>
      <div className="reveal flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="realisations-titre" {...heading} />
        <Link
          href={href}
          className={`label-btn-lg border-accent-700 border px-5 py-3 ${HOVER[tone]}`}
        >
          Voir les réalisations
        </Link>
      </div>
      <ul className="reveal card-grid mt-12">
        {items.map((item) => (
          <li key={item.id}>
            <RealisationCard item={item} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
