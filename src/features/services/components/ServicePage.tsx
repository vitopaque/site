import Image from 'next/image'

import { GuidesSection } from '@/features/articles'
import { ReviewsSection } from '@/features/reviews'
import { PROVISIONAL_ALT, provisionalPhoto } from '@/shared/assets/photos/provisional'
import { ButtonLink } from '@/shared/ui/ButtonLink'
import { CtaBand } from '@/shared/ui/CtaBand'
import { FaqList } from '@/shared/ui/FaqList'
import { PageHero } from '@/shared/ui/PageHero'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { ToIntegrateBadge } from '@/shared/ui/ToIntegrateBadge'

import { quoteHref, siloBySlug } from '../catalog'
import { guidePlaceholders, reviewPlaceholders } from '../content/placeholders'
import { type ServiceEntry, servicesOf } from '../queries'
import { pageCrumbs } from '../seo'
import { FilmDemo } from './FilmDemo'
import { Highlights } from './Highlights'
import { LinkedRealisations } from './LinkedRealisations'
import { ServiceCards } from './ServiceCards'

export function ServicePage({ entry }: { entry: ServiceEntry }) {
  const { page } = entry
  const silo = siloBySlug(page.slug)
  const siblings = servicesOf(page.univers).filter((service) => service.slug !== page.slug)
  const href = quoteHref(page.slug)
  const image = page.image ?? { src: provisionalPhoto, alt: PROVISIONAL_ALT }

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
        aside={
          <figure className="blueprint">
            <div className="duotone relative aspect-16/10 lg:aspect-4/5">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 64rem) 36vw, 100vw"
                className="object-cover"
              />
              {page.image ? null : (
                <div className="absolute top-3 left-3 z-10">
                  <ToIntegrateBadge className="bg-background" />
                </div>
              )}
            </div>
          </figure>
        }
      />
      <Section>
        <div className="max-w-prose">
          <page.Body />
        </div>
      </Section>
      {page.highlights?.length ? <Highlights items={page.highlights} /> : null}
      {silo?.film ? <FilmDemo name={silo.label} film={silo.film} /> : null}
      <LinkedRealisations tone="surface" />
      <ReviewsSection items={reviewPlaceholders} />
      <Section labelledBy="faq-titre" tone="surface">
        <div className="reveal">
          <SectionHeading id="faq-titre" kicker="FAQ" lines={['Questions fréquentes.']} />
        </div>
        <div className="reveal mt-12">
          <FaqList items={page.faq} />
        </div>
      </Section>
      {siblings.length > 0 ? (
        <Section labelledBy="prestations-titre">
          <div className="reveal">
            <SectionHeading
              id="prestations-titre"
              kicker="Dans le même univers"
              lines={['Autres prestations.']}
            />
          </div>
          <ServiceCards services={siblings} />
        </Section>
      ) : null}
      <GuidesSection items={guidePlaceholders} />
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
