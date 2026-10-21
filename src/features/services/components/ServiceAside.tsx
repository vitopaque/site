import { AsideColumn } from '@/shared/ui/AsideColumn'
import type { SectionTitle } from '@/shared/ui/SectionHeading'

import type { BodyHeading, Highlight } from '../content/types'
import { Highlights } from './Highlights'

type Props = {
  headings: readonly BodyHeading[]
  highlights?: readonly Highlight[]
  highlightsHeading: SectionTitle
  quoteHref: string
}

export function ServiceAside({ headings, highlights, highlightsHeading, quoteHref }: Props) {
  return (
    <AsideColumn
      lead={
        highlights?.length ? <Highlights items={highlights} heading={highlightsHeading} /> : null
      }
      headings={headings}
      quoteHref={quoteHref}
    />
  )
}
