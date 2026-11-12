import { JsonLd, breadcrumbList } from '@/shared/seo/jsonld'
import { PageHero } from '@/shared/ui/PageHero'

import { TextSections } from './TextSections'
import { legalPages, type LegalKey } from '../content/legal-pages'
import { legalCrumbs } from '../seo'

export function LegalPage({ pageKey }: { pageKey: LegalKey }) {
  const page = legalPages[pageKey]
  const crumbs = legalCrumbs(pageKey)
  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <PageHero crumbs={crumbs} title={page.h1} intro={page.intro} />
      <TextSections sections={page.sections} />
    </>
  )
}
