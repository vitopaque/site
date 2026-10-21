import Image from 'next/image'
import Link from 'next/link'

import { ToIntegrateBadge } from '@/shared/ui/ToIntegrateBadge'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { PROVISIONAL_ALT, provisionalPhoto } from '../content/media'
import { realisations } from '../content/realisations'

export function RealisationsSection() {
  return (
    <Section id="realisations" labelledBy="realisations-titre">
      <div className="reveal flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="realisations-titre"
          kicker="Réalisations"
          lines={['Derrière le verre.']}
        />
        <Link
          href="/realisations"
          className="label-btn-lg border-accent-700 hover:bg-surface border px-5 py-3"
        >
          Voir les réalisations
        </Link>
      </div>
      <ul className="reveal card-grid mt-12">
        {realisations.map((item) => (
          <li key={item.id}>
            <figure className="blueprint flex flex-col">
              <div className="duotone relative aspect-4/5">
                <Image
                  src={provisionalPhoto}
                  alt={PROVISIONAL_ALT}
                  fill
                  quality={50}
                  sizes="(min-width: 64rem) 30vw, 100vw"
                  className={`object-cover ${item.position}`}
                />
                <div className="absolute top-3 left-3 z-10">
                  <ToIntegrateBadge className="bg-background" />
                </div>
              </div>
              <figcaption className="text-body-sm flex justify-between px-4 py-3.5">
                <span className="font-heading text-body-lg uppercase">{item.title}</span>
                <span className="text-accent-700">{item.film}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
