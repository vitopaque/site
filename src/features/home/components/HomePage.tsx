import { GuidesSection } from '@/features/articles'
import { CaseStudiesSection } from '@/features/realisations'
import { ContactSection, QuoteForm } from '@/features/quote'
import { ReviewsSection } from '@/features/reviews'
import { FaqSection } from '@/shared/ui/FaqSection'
import { RealisationsSection } from '@/shared/ui/RealisationsSection'

import { homeContact } from '../content/contact'
import { homeFaq } from '../content/faq'
import { homeTitles } from '../content/sections'
import { homeCaseStudies, homeGuides, homeRealisations, homeReviews } from '../content/showcase'
import { GuaranteesBand } from './GuaranteesBand'
import { Hero } from './Hero'
import { LabSection } from './LabSection'
import { ManifestoSection } from './ManifestoSection'
import { MethodSection } from './MethodSection'
import { UniversSection } from './UniversSection'

export function HomePage() {
  return (
    <>
      <Hero />
      <LabSection />
      <ManifestoSection />
      <MethodSection />
      <UniversSection />
      <GuaranteesBand />
      <RealisationsSection items={homeRealisations} heading={homeTitles.realisations} />
      <CaseStudiesSection items={homeCaseStudies} heading={homeTitles.caseStudies} />
      <ReviewsSection items={homeReviews} heading={homeTitles.reviews} />
      <GuidesSection items={homeGuides} heading={homeTitles.guides} />
      <FaqSection items={homeFaq} heading={homeTitles.faq} tone="surface" />
      <ContactSection id="contact" {...homeContact}>
        <QuoteForm />
      </ContactSection>
    </>
  )
}
