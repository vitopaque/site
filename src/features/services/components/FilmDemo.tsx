import { FilmMeters } from '@/shared/ui/FilmMeters'
import { Section } from '@/shared/ui/Section'
import { SectionHeading, type SectionTitle } from '@/shared/ui/SectionHeading'

import type { FilmProfile } from '../catalog'

type Props = { name: string; film: FilmProfile; heading: SectionTitle }

export function FilmDemo({ name, film, heading }: Props) {
  return (
    <Section labelledBy="film-titre">
      <div className="reveal grid grid-cols-[repeat(auto-fit,minmax(min(100%,22.5rem),1fr))] items-start gap-12">
        <div className="flex flex-col gap-6">
          <SectionHeading id="film-titre" {...heading} />
          <p className="text-body-lg max-w-prose text-pretty text-neutral-700">
            {film.description}
          </p>
        </div>
        <div className="blueprint flex flex-col gap-5 p-8">
          <div className="border-divider border-b pb-3.5">
            <p className="label-caps text-accent-700">Fiche film</p>
          </div>
          <h3 className="text-headline-md uppercase">{name}</h3>
          <FilmMeters meters={film.meters} />
          <p className="text-body-sm text-neutral-700">Repères sur une échelle de 0 à 5.</p>
          <ul className="flex flex-wrap gap-2">
            {film.uses.map((use) => (
              <li key={use} className="label-sm bg-accent-100 text-accent-700 px-2.5 py-1">
                {use}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
