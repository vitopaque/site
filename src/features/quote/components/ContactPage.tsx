import { LocalBusinessJsonLd } from '@/features/site-settings'
import { JsonLd, breadcrumbList } from '@/shared/seo/jsonld'
import { FaqSection } from '@/shared/ui/FaqSection'
import { ordinal } from '@/shared/ui/ordinal'
import { PageHero } from '@/shared/ui/PageHero'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { contactPage } from '../content/contact-page'
import { CONTACT_CRUMBS } from '../seo'
import { AccessMap, hasAccessBlock } from './AccessMap'
import { ContactDetails } from './ContactDetails'
import { ContactSection } from './ContactSection'
import { QuoteForm } from './QuoteForm'

export function ContactPage() {
  const withAccess = hasAccessBlock()
  const stepsTone = withAccess ? 'light' : 'surface'
  const faqTone = withAccess ? 'surface' : 'light'

  return (
    <>
      <LocalBusinessJsonLd />
      <JsonLd data={breadcrumbList(CONTACT_CRUMBS)} />
      <PageHero crumbs={CONTACT_CRUMBS} title={contactPage.h1} intro={contactPage.intro} />
      <ContactSection {...contactPage.form}>
        <QuoteForm preselectFromUrl />
      </ContactSection>
      <ContactDetails />
      <AccessMap tone="surface" />
      <Section labelledBy="etapes-titre" tone={stepsTone}>
        <div className="reveal">
          <SectionHeading id="etapes-titre" kicker="La démarche" lines={['Étape par étape.']} />
        </div>
        <ol className="reveal card-grid-narrow mt-12">
          {contactPage.steps.map((step, index) => (
            <li key={step.title} className="blueprint blueprint-card">
              <span className="text-numeral font-heading text-accent">{ordinal(index)}</span>
              <h3 className="text-headline-sm mt-auto uppercase">{step.title}</h3>
              <p className="text-neutral-700">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <FaqSection
        items={contactPage.faq}
        heading={{ kicker: 'FAQ', lines: ['Questions fréquentes.'] }}
        tone={faqTone}
      />
    </>
  )
}
