import { ButtonLink } from '@/shared/ui/ButtonLink'
import type { SectionTitle } from '@/shared/ui/SectionHeading'

import type { BodyHeading, Highlight } from '../content/types'
import { BodyOutline } from './BodyOutline'
import { Highlights } from './Highlights'

type Props = {
  headings: readonly BodyHeading[]
  highlights?: readonly Highlight[]
  highlightsHeading: SectionTitle
  quoteHref: string
}

export function ServiceAside({ headings, highlights, highlightsHeading, quoteHref }: Props) {
  return (
    <div className="desktop:h-full flex flex-col gap-6">
      {highlights?.length ? <Highlights items={highlights} heading={highlightsHeading} /> : null}
      <div className="desktop:sticky desktop:top-(--anchor-offset) flex flex-col gap-6">
        {headings.length > 1 ? (
          <div className="desktop:block hidden">
            <BodyOutline headings={headings} />
          </div>
        ) : null}
        <ButtonLink href={quoteHref} variant="primary" className="justify-center">
          Devis gratuit
        </ButtonLink>
      </div>
    </div>
  )
}
