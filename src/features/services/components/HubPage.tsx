import { provisionalPhoto } from '@/shared/assets/photos/provisional'
import { universLabel } from '@/shared/payload/univers'
import { ButtonLink } from '@/shared/ui/ButtonLink'
import { CtaBand } from '@/shared/ui/CtaBand'
import { FaqSection } from '@/shared/ui/FaqSection'
import { FilmLab } from '@/shared/ui/FilmLab'
import { PageHero } from '@/shared/ui/PageHero'
import { RealisationsSection } from '@/shared/ui/RealisationsSection'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { labFilmsOf, quoteUniversHref } from '../catalog'
import { sectionTitle } from '../content/section-titles'
import { linkedRealisations } from '../content/showcase'
import { beforeAfterOf, type HubEntry, servicesOf } from '../queries'
import { pageCrumbs } from '../seo'
import { BeforeAfterSection } from './BeforeAfterSection'
import { OtherUnivers } from './OtherUnivers'
import { ServiceCards } from './ServiceCards'

export function HubPage({ entry }: { entry: HubEntry }) {
  const { page } = entry
  const services = servicesOf(page.univers)
  const films = labFilmsOf(page.univers)
  const beforeAfter = beforeAfterOf(page.univers)
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
      <RealisationsSection
        items={linkedRealisations}
        heading={sectionTitle(page, 'realisations')}
        tone="light"
      />
      {films.length > 0 ? (
        <Section labelledBy="laboratoire-titre" tone="surface">
          <div className="reveal grid grid-cols-[repeat(auto-fit,minmax(min(100%,22.5rem),1fr))] items-end gap-x-12 gap-y-6">
            <SectionHeading id="laboratoire-titre" {...sectionTitle(page, 'lab')} />
            <p className="text-body-lg max-w-110 text-pretty text-neutral-700">
              Déplacez la ligne pour comparer le verre nu et le verre traité, puis changez de film.
            </p>
          </div>
          <div className="reveal mt-12">
            <FilmLab films={films} image={{ src: provisionalPhoto, alt: '' }} />
          </div>
        </Section>
      ) : beforeAfter ? (
        <BeforeAfterSection
          id="laboratoire-titre"
          heading={sectionTitle(page, 'lab')}
          pair={beforeAfter}
          tone="surface"
        />
      ) : null}
      <FaqSection items={page.faq ?? []} heading={sectionTitle(page, 'faq')} tone="light" />
      <OtherUnivers current={page.univers} tone="surface" />
      <CtaBand
        id="devis-titre"
        {...sectionTitle(page, 'cta')}
        text="Décrivez votre projet : nous revenons vers vous pour établir votre devis."
        cta={{ label: 'Devis gratuit', href }}
      />
    </>
  )
}
