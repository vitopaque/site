import Link from 'next/link'

import { BeforeAfter, type BeforeAfterPair } from './BeforeAfter'
import { Section } from './Section'
import { SectionHeading, type SectionTitle } from './SectionHeading'

const HOVER = { light: 'hover:bg-surface', surface: 'hover:bg-background' } as const

type Props = {
  id: string
  heading: SectionTitle
  pair: BeforeAfterPair
  text: string
  tone?: keyof typeof HOVER
  link?: { href: string; label: string }
}

export function BeforeAfterSection({ id, heading, pair, text, tone = 'light', link }: Props) {
  return (
    <Section labelledBy={id} tone={tone}>
      <div className="reveal grid items-center gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-6">
          <SectionHeading id={id} {...heading} />
          <p className="text-body-lg max-w-prose text-pretty text-neutral-700">{text}</p>
          {link ? (
            <Link
              href={link.href}
              className={`label-btn-lg border-accent-700 self-start border px-5 py-3 ${HOVER[tone]}`}
            >
              {link.label}
            </Link>
          ) : null}
        </div>
        <div className="lg:col-span-2">
          <BeforeAfter pair={pair} />
        </div>
      </div>
    </Section>
  )
}
