import Link from 'next/link'

import { hubHref, serviceSilos } from '@/shared/catalog'
import { UNIVERS_OPTIONS } from '@/shared/payload/univers'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { articleTitles } from '../content'

const LINK_CLASS = 'blueprint hover:bg-surface label-btn-lg block p-5'

export function EmptyState() {
  return (
    <Section labelledBy="vide-titre">
      <SectionHeading id="vide-titre" {...articleTitles.empty} />
      <p className="text-body-lg mt-6 max-w-prose text-pretty text-neutral-700">
        En attendant, découvrez nos univers et nos prestations de pose de films pour vitrages.
      </p>
      <ul className="card-grid mt-12">
        {UNIVERS_OPTIONS.map((option) => (
          <li key={option.value}>
            <Link href={hubHref(option.value)} className={LINK_CLASS}>
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="card-grid-narrow mt-7">
        {serviceSilos.map((silo) => (
          <li key={silo.slug}>
            <Link href={silo.href} className={LINK_CLASS}>
              {silo.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
