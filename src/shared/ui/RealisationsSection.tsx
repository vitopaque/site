import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'

import { Section } from './Section'
import { SectionHeading, type SectionTitle } from './SectionHeading'

export type Realisation = {
  id: string
  title: string
  film: string
  image: { src: StaticImageData; alt: string }
}

const HOVER = { light: 'hover:bg-surface', surface: 'hover:bg-background' } as const

type Props = {
  items: readonly Realisation[]
  heading: SectionTitle
  tone?: keyof typeof HOVER
}

export function RealisationsSection({ items, heading, tone = 'light' }: Props) {
  if (items.length === 0) return null
  return (
    <Section labelledBy="realisations-titre" tone={tone}>
      <div className="reveal flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="realisations-titre" {...heading} />
        <Link
          href="/realisations"
          className={`label-btn-lg border-accent-700 border px-5 py-3 ${HOVER[tone]}`}
        >
          Voir les réalisations
        </Link>
      </div>
      <ul className="reveal card-grid mt-12">
        {items.map((item) => (
          <li key={item.id}>
            <figure className="blueprint flex flex-col">
              <div className="duotone relative aspect-4/5">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 64rem) 30vw, 100vw"
                  className="object-cover"
                />
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
