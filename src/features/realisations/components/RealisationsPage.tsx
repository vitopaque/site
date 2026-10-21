import { quoteHref } from '@/shared/catalog'
import { breadcrumbList, JsonLd } from '@/shared/seo/jsonld'
import { CtaBand } from '@/shared/ui/CtaBand'
import { PageHero } from '@/shared/ui/PageHero'
import { RealisationCard } from '@/shared/ui/RealisationCard'
import { Section } from '@/shared/ui/Section'

import { listing } from '../content'
import { realisationTitles } from '../content/sections'
import { listRealisations, toItem } from '../queries'
import { listingCrumbs } from '../seo'

export function RealisationsPage() {
  const items = listRealisations().map(toItem)
  const single = items.length === 1
  return (
    <>
      <JsonLd data={breadcrumbList(listingCrumbs())} />
      <PageHero
        crumbs={listingCrumbs()}
        kicker={listing.tagline}
        title={listing.h1}
        intro={listing.intro}
      />
      <Section>
        <ul className={single ? '' : 'reveal card-grid'}>
          {items.map((item) => (
            <li key={item.id}>
              <RealisationCard item={item} layout={single ? 'large' : 'card'} />
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand
        id="devis-titre"
        {...realisationTitles.listingCta}
        text="Décrivez votre projet : nous revenons vers vous pour établir votre devis."
        cta={{ label: 'Devis gratuit', href: quoteHref() }}
      />
    </>
  )
}
