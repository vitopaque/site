import Link from 'next/link'

import { PlaceholderCard } from '@/shared/ui/PlaceholderCard'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { realisationPlaceholders } from '../content/placeholders'

const HOVER = { light: 'hover:bg-surface', surface: 'hover:bg-background' } as const

export function LinkedRealisations({ tone }: { tone: keyof typeof HOVER }) {
  return (
    <Section labelledBy="realisations-titre" tone={tone}>
      <div className="reveal flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="realisations-titre"
          kicker="Réalisations"
          lines={['Derrière le verre.']}
        />
        <Link
          href="/realisations"
          className={`label-btn-lg border-accent-700 border px-5 py-3 ${HOVER[tone]}`}
        >
          Voir les réalisations
        </Link>
      </div>
      <ul className="reveal card-grid mt-12">
        {realisationPlaceholders.map((item) => (
          <li key={item.id}>
            <PlaceholderCard hint={item.hint} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
