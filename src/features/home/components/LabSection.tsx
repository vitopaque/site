import { labFilmsOf } from '@/shared/catalog'
import { provisionalPhoto } from '@/shared/assets/photos/provisional'
import { FilmLab } from '@/shared/ui/FilmLab'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { homeTitles } from '../content/sections'

export function LabSection() {
  return (
    <Section id="films" labelledBy="laboratoire-titre">
      <div className="reveal grid grid-cols-[repeat(auto-fit,minmax(min(100%,22.5rem),1fr))] items-end gap-x-12 gap-y-6">
        <SectionHeading id="laboratoire-titre" {...homeTitles.lab} />
        <p className="text-body-lg max-w-110 text-pretty text-neutral-700">
          Quatre films pour le bâtiment, une même vitre. Déplacez la ligne pour comparer le verre nu
          et le verre traité, puis changez de film.
        </p>
      </div>
      <div className="reveal mt-12">
        <FilmLab films={labFilmsOf('batiment')} image={{ src: provisionalPhoto, alt: '' }} />
      </div>
    </Section>
  )
}
