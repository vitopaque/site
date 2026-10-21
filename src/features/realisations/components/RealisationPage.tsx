import Image from 'next/image'

import { quoteHref, siloBySlug } from '@/shared/catalog'
import { JsonLd } from '@/shared/seo/jsonld'
import { BeforeAfterSection } from '@/shared/ui/BeforeAfterSection'
import { ButtonLink } from '@/shared/ui/ButtonLink'
import { CtaBand } from '@/shared/ui/CtaBand'
import { HeroFigure } from '@/shared/ui/HeroFigure'
import { PageHero } from '@/shared/ui/PageHero'
import { RealisationsSection } from '@/shared/ui/RealisationsSection'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { realisationTitles } from '../content/sections'
import { formatRealisationDate } from '../format'
import { relatedRealisations } from '../queries'
import { realisationCrumbs, realisationJsonLd } from '../seo'
import type { Realisation } from '../types'
import { RealisationVideo } from './RealisationVideo'

const STEPS = [
  { key: 'problem', title: 'Le besoin' },
  { key: 'solution', title: 'La solution' },
] as const

export function RealisationPage({ item }: { item: Realisation }) {
  const silo = siloBySlug(item.silos[0])
  const href = quoteHref(item.silos[0])
  const { metric } = item.result
  const meta = [silo?.label, item.place, formatRealisationDate(item.date)].filter(Boolean)

  return (
    <>
      {realisationJsonLd(item).map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      <PageHero
        crumbs={realisationCrumbs(item)}
        kicker={meta.join(' · ')}
        title={item.title}
        intro={item.lede}
        actions={
          <ButtonLink href={href} variant="primary">
            Devis gratuit
          </ButtonLink>
        }
        aside={<HeroFigure image={item.cover} landscape />}
      />
      <Section labelledBy="etude-titre">
        <div className="reveal">
          <SectionHeading id="etude-titre" {...realisationTitles.study} />
        </div>
        <ol className="reveal card-grid mt-12">
          {STEPS.map(({ key, title }) => (
            <li key={key} className="blueprint blueprint-card">
              <h3 className="text-headline-sm uppercase">{title}</h3>
              <p className="text-neutral-700">{item[key]}</p>
            </li>
          ))}
          <li className="blueprint blueprint-card">
            <h3 className="text-headline-sm uppercase">Le résultat</h3>
            {metric ? (
              <p className="text-numeral font-heading text-accent">{metric.value}</p>
            ) : null}
            <p className="text-neutral-700">{metric ? metric.label : item.result.text}</p>
            {metric ? <p className="text-neutral-700">{item.result.text}</p> : null}
          </li>
        </ol>
      </Section>
      {item.beforeAfter ? (
        <BeforeAfterSection
          id="avant-apres-titre"
          heading={realisationTitles.beforeAfter}
          pair={item.beforeAfter}
          tone="surface"
        />
      ) : null}
      {item.video ? (
        <Section labelledBy="video-titre">
          <div className="reveal grid items-center gap-12 lg:grid-cols-3">
            <SectionHeading id="video-titre" {...realisationTitles.video} />
            <div className="lg:col-span-2">
              <RealisationVideo video={item.video} label={item.title} />
            </div>
          </div>
        </Section>
      ) : null}
      {item.gallery?.length ? (
        <Section labelledBy="galerie-titre" tone="surface">
          <div className="reveal">
            <SectionHeading id="galerie-titre" {...realisationTitles.gallery} />
          </div>
          <ul className="reveal card-grid mt-12">
            {item.gallery.map((image) => (
              <li key={image.alt} className="blueprint">
                <div className="relative aspect-4/3">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 64rem) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      <RealisationsSection
        items={relatedRealisations(item)}
        heading={realisationTitles.related}
        tone="surface"
      />
      <CtaBand
        id="devis-titre"
        {...realisationTitles.cta}
        text="Décrivez votre projet : nous revenons vers vous pour établir votre devis."
        cta={{ label: 'Devis gratuit', href }}
      />
    </>
  )
}
