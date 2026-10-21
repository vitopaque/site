import type { ReactNode } from 'react'

import { BodyOutline, type OutlineHeading } from './BodyOutline'
import { ButtonLink } from './ButtonLink'

type Props = {
  lead?: ReactNode
  headings: readonly OutlineHeading[]
  quoteHref: string
}

export function AsideColumn({ lead, headings, quoteHref }: Props) {
  return (
    <div className="desktop:h-full flex flex-col gap-6">
      {lead}
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
