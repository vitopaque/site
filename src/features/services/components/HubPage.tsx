import { PROVISIONAL_ALT, provisionalPhoto } from '@/shared/assets/photos/provisional'
import { universLabel } from '@/shared/payload/univers'
import { ButtonLink } from '@/shared/ui/ButtonLink'
import { CtaBand } from '@/shared/ui/CtaBand'
import { FilmLab } from '@/shared/ui/FilmLab'
import { PageHero } from '@/shared/ui/PageHero'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { labFilmsOf, quoteUniversHref } from '../catalog'
import { type HubEntry, servicesOf } from '../queries'
import { pageCrumbs } from '../seo'
import { LinkedRealisations } from './LinkedRealisations'
import { OtherUnivers } from './OtherUnivers'
import { ServiceCards } from './ServiceCards'

export function HubPage({ entry }: { entry: HubEntry }) {
  const { page } = entry
  const services = servicesOf(page.univers)
  const films = labFilmsOf(page.univers)
  const href = quoteUniversHref(page.univers)

  return (
    <>
      <PageHero
        crumbs={pageCrumbs(entry)}
        kicker={page.tagline}
        title={page.h1}
        intro={page.intro}
        actions={
          <ButtonLink href={href} variant="primary">
            Devis gratuit
          </ButtonLink>
        }
      />
      {services.length > 0 ? (
        <Section labelledBy="prestations-titre">
          <div className="reveal">
            <SectionHeading
              id="prestations-titre"
              kicker={universLabel(page.univers)}
              lines={[services.length > 1 ? 'Nos prestations.' : 'Notre prestation.']}
            />
          </div>
          <ServiceCards services={services} />
        </Section>
      ) : null}
      {page.Body ? (
        <Section tone="surface">
          <div className="max-w-prose">
            <page.Body />
          </div>
        </Section>
      ) : null}
      <LinkedRealisations tone="light" />
      {films.length > 0 ? (
        <Section labelledBy="laboratoire-titre" tone="surface">
          <div className="reveal grid grid-cols-[repeat(auto-fit,minmax(min(100%,22.5rem),1fr))] items-end gap-x-12 gap-y-6">
            <SectionHeading
              id="laboratoire-titre"
              kicker="Le laboratoire"
              lines={['Faites glisser.', 'Voyez la différence.']}
            />
            <p className="text-body-lg max-w-110 text-pretty text-neutral-700">
              Déplacez la ligne pour comparer le verre nu et le verre traité, puis changez de film.
            </p>
          </div>
          <div className="reveal mt-12">
            <FilmLab films={films} image={{ src: provisionalPhoto, alt: PROVISIONAL_ALT }} />
          </div>
        </Section>
      ) : null}
      <OtherUnivers current={page.univers} />
      <CtaBand
        id="devis-titre"
        kicker="Devis gratuit"
        lines={['Parlons de', 'votre vitrage.']}
        text="Décrivez votre projet : nous revenons vers vous pour établir votre devis."
        cta={{ label: 'Devis gratuit', href }}
      />
    </>
  )
}
