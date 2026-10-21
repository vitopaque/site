import { faqPage, JsonLd } from '../seo/jsonld'
import { type FaqItem, FaqList } from './FaqList'
import { Section } from './Section'
import { SectionHeading, type SectionTitle } from './SectionHeading'

type Props = {
  items: readonly FaqItem[]
  heading: SectionTitle
  tone?: 'light' | 'surface'
}

export function FaqSection({ items, heading, tone = 'surface' }: Props) {
  if (items.length === 0) return null
  return (
    <Section labelledBy="faq-titre" tone={tone}>
      <JsonLd data={faqPage(items)} />
      <div className="reveal">
        <SectionHeading id="faq-titre" {...heading} />
      </div>
      <div className="reveal mt-12">
        <FaqList items={items} />
      </div>
    </Section>
  )
}
