import { GuidesSection } from '@/features/articles'
import { CaseStudiesSection } from '@/features/case-studies'
import { ContactSection, QuoteForm } from '@/features/quote'
import { ReviewsSection } from '@/features/reviews'

import { homeContact } from '../content/contact'
import {
  caseStudyPlaceholders,
  guidePlaceholders,
  reviewPlaceholders,
} from '../content/placeholders'
import { Hero } from './Hero'
import { LabSection } from './LabSection'
import { ManifestoSection } from './ManifestoSection'
import { MethodSection } from './MethodSection'
import { RealisationsSection } from './RealisationsSection'
import { UniversSection } from './UniversSection'

export function HomePage() {
  return (
    <>
      <Hero />
      <LabSection />
      <ManifestoSection />
      <MethodSection />
      <UniversSection />
      <RealisationsSection />
      <CaseStudiesSection items={caseStudyPlaceholders} />
      <ReviewsSection items={reviewPlaceholders} />
      <GuidesSection items={guidePlaceholders} />
      <ContactSection id="contact" {...homeContact}>
        <QuoteForm />
      </ContactSection>
    </>
  )
}
