import { GuidesSection } from '@/features/articles'
import { CaseStudiesSection } from '@/features/case-studies'
import { ReviewsSection } from '@/features/reviews'

import {
  caseStudyPlaceholders,
  guidePlaceholders,
  reviewPlaceholders,
} from '../content/placeholders'
import { ContactSection } from './ContactSection'
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
      <ContactSection />
    </>
  )
}
