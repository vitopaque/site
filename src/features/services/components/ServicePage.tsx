import Link from 'next/link'

import { GuidesSection, guidesForService } from '@/features/articles'
import { LISTING_PATH, pairOfSilo, realisationsOfSilo } from '@/features/realisations'
import { ReviewsSection } from '@/features/reviews'
import { hubHref, quoteHref, siloBySlug } from '@/shared/catalog'
import { universLabel } from '@/shared/payload/univers'
import { BeforeAfterSection } from '@/shared/ui/BeforeAfterSection'
import { ButtonLink } from '@/shared/ui/ButtonLink'
import { CtaBand } from '@/shared/ui/CtaBand'
import { FaqSection } from '@/shared/ui/FaqSection'
import { PageHero } from '@/shared/ui/PageHero'
import { RealisationsSection } from '@/shared/ui/RealisationsSection'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { sectionTitle } from '../content/section-titles'
import { linkedReviews } from '../content/showcase'
import { relatedServicesOf, type ServiceEntry } from '../queries'
import { pageCrumbs } from '../seo'
import { FilmDemo } from './FilmDemo'
import { HeroVisual } from './HeroVisual'
import { ServiceAside } from './ServiceAside'
import { ServiceCards } from './ServiceCards'

export async function ServicePage({ entry }: { entry: ServiceEntry }) {
  const { page } = entry
  const silo = siloBySlug(page.slug)
  const related = relatedServicesOf(page)
  const href = quoteHref(page.slug)
  const beforeAfter = pairOfSilo(page.slug)
  const guides = await guidesForService(page.slug)

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
        aside={<HeroVisual page={page} />}
      />
      <Section>
        <div className="desktop:grid desktop:grid-cols-12 desktop:gap-x-12">
          <div className="desktop:col-span-7 max-w-prose">
            <page.Body />
          </div>
          <div className="desktop:col-span-4 desktop:col-start-9 desktop:mt-0 mt-12">
            <ServiceAside
              headings={page.headings}
              highlights={page.highlights}
              highlightsHeading={sectionTitle(page, 'highlights')}
              quoteHref={href}
            />
          </div>
        </div>
      </Section>
      {silo?.film ? (
        <FilmDemo name={silo.label} film={silo.film} heading={sectionTitle(page, 'film')} />
      ) : beforeAfter ? (
        <BeforeAfterSection
          id="film-titre"
          heading={sectionTitle(page, 'lab')}
          pair={beforeAfter.pair}
          text="Déplacez la ligne pour comparer les vitres d’origine et les vitres teintées."
          link={{ href: beforeAfter.href, label: 'Voir la réalisation' }}
        />
      ) : null}
      <RealisationsSection
        items={realisationsOfSilo(page.slug)}
        heading={sectionTitle(page, 'realisations')}
        href={LISTING_PATH}
        tone="surface"
      />
      <ReviewsSection items={linkedReviews} heading={sectionTitle(page, 'reviews')} />
      <FaqSection items={page.faq} heading={sectionTitle(page, 'faq')} />
      {related.length > 0 ? (
        <Section labelledBy="prestations-titre">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="prestations-titre" {...sectionTitle(page, 'otherServices')} />
            <Link
              href={hubHref(page.univers)}
              className="label-btn-lg border-accent-700 hover:bg-surface border px-5 py-3"
            >
              Voir l’univers {universLabel(page.univers)}
            </Link>
          </div>
          <ServiceCards services={related} />
        </Section>
      ) : null}
      <GuidesSection items={guides} heading={sectionTitle(page, 'guides')} />
      <CtaBand
        id="devis-titre"
        {...sectionTitle(page, 'cta')}
        text="Décrivez votre projet : nous revenons vers vous pour établir votre devis."
        cta={{ label: 'Devis gratuit', href }}
      />
    </>
  )
}
