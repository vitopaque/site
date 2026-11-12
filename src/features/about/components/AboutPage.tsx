import { quoteHref } from '@/shared/catalog'
import { JsonLd, breadcrumbList } from '@/shared/seo/jsonld'
import { CtaBand } from '@/shared/ui/CtaBand'
import { PageHero } from '@/shared/ui/PageHero'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { aboutPage } from '../content/about-page'
import { aboutCrumbs } from '../seo'

type Card = { title: string; text: string }

function CardList({ items }: { items: readonly Card[] }) {
  return (
    <ul className="card-grid-narrow mt-12">
      {items.map((item) => (
        <li key={item.title} className="blueprint blueprint-card">
          <h3 className="text-headline-sm uppercase">{item.title}</h3>
          <p className="text-neutral-700">{item.text}</p>
        </li>
      ))}
    </ul>
  )
}

export function AboutPage() {
  const crumbs = aboutCrumbs()
  const { story, figures, partners, references, guarantees, cta } = aboutPage
  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <PageHero crumbs={crumbs} title={aboutPage.h1} intro={aboutPage.intro} />
      <Section labelledBy="parcours-titre" tone="surface">
        <SectionHeading id="parcours-titre" kicker="Savoir-faire" lines={[story.title]} />
        <p className="text-body-lg mt-8 max-w-prose text-pretty">{story.text}</p>
        <dl className="card-grid-narrow mt-12">
          {figures.map((figure) => (
            <div key={figure.value} className="blueprint blueprint-card">
              <dt className="text-numeral font-heading text-accent">{figure.value}</dt>
              <dd className="text-neutral-700">{figure.label}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section labelledBy="partenaires-titre">
        <SectionHeading
          id="partenaires-titre"
          kicker="Partenaires"
          lines={['Des films de référence.']}
        />
        <CardList items={partners} />
      </Section>
      <Section labelledBy="references-titre" tone="surface">
        <SectionHeading id="references-titre" kicker="Références" lines={[references.title]} />
        <p className="text-body-lg mt-8 max-w-prose text-pretty">{references.text}</p>
      </Section>
      <Section labelledBy="garanties-titre">
        <SectionHeading id="garanties-titre" kicker="Garanties" lines={['Un travail garanti.']} />
        <CardList items={guarantees} />
      </Section>
      <CtaBand
        id="a-propos-devis"
        kicker={cta.kicker}
        lines={cta.lines}
        text={cta.text}
        cta={{ label: cta.label, href: quoteHref() }}
      />
    </>
  )
}
