import Image from 'next/image'
import Link from 'next/link'

import { GuidesSection } from '@/features/articles'
import { ReviewsSection } from '@/features/reviews'
import { universLabel } from '@/shared/payload/univers'
import { ButtonLink } from '@/shared/ui/ButtonLink'
import { CtaBand } from '@/shared/ui/CtaBand'
import { FaqSection } from '@/shared/ui/FaqSection'
import { PageHero } from '@/shared/ui/PageHero'
import { RealisationsSection } from '@/shared/ui/RealisationsSection'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { hubHref, quoteHref, siloBySlug } from '@/shared/catalog'
import { sectionTitle } from '../content/section-titles'
import { linkedGuides, linkedRealisations, linkedReviews } from '../content/showcase'
import { relatedServicesOf, type ServiceEntry } from '../queries'
import { pageCrumbs } from '../seo'
import { BeforeAfterSection } from '@/shared/ui/BeforeAfterSection'
import { FilmDemo } from './FilmDemo'
import { Highlights } from './Highlights'
import { ServiceCards } from './ServiceCards'

export function ServicePage({ entry }: { entry: ServiceEntry }) {
  const { page } = entry
  const silo = siloBySlug(page.slug)
  const related = relatedServicesOf(page)
  const href = quoteHref(page.slug)
  const image = page.image

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
          image ? (
            <figure className="blueprint">
              <div className="duotone relative aspect-16/10 lg:aspect-4/5">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 64rem) 36vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          ) : undefined
        }
      />
      <Section>
        <div className="max-w-prose">
          <page.Body />
        </div>
      </Section>
      {page.highlights?.length ? (
        <Highlights items={page.highlights} heading={sectionTitle(page, 'highlights')} />
      ) : null}
      {silo?.film ? (
        <FilmDemo name={silo.label} film={silo.film} heading={sectionTitle(page, 'film')} />
      ) : page.beforeAfter ? (
        <BeforeAfterSection
          id="film-titre"
          heading={sectionTitle(page, 'lab')}
          pair={page.beforeAfter}
        />
      ) : null}
      <RealisationsSection
        items={linkedRealisations}
        heading={sectionTitle(page, 'realisations')}
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
      <GuidesSection items={linkedGuides} heading={sectionTitle(page, 'guides')} />
      <CtaBand
        id="devis-titre"
        {...sectionTitle(page, 'cta')}
        text="Décrivez votre projet : nous revenons vers vous pour établir votre devis."
        cta={{ label: 'Devis gratuit', href }}
      />
    </>
  )
}
