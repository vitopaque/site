import type { ReactNode } from 'react'

import { Section } from '@/shared/ui/Section'
import { SweepBand } from '@/shared/ui/SweepBand'

type Props = {
  id?: string
  kicker: string
  lines: readonly string[]
  intro: string
  children: ReactNode
}

export function ContactSection({ id, kicker, lines, intro, children }: Props) {
  return (
    <Section id={id} labelledBy="contact-titre" tone="dark" className="relative overflow-hidden">
      <SweepBand />
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,23.75rem),1fr))] items-start gap-14">
        <div className="flex flex-col gap-5">
          <p className="label-caps text-accent-300">{kicker}</p>
          <h2 id="contact-titre" className="text-headline-xl wrap-break-word uppercase">
            {lines.map((line, index) => (
              <span key={line} className="block">
                {line}
                {index < lines.length - 1 ? ' ' : null}
              </span>
            ))}
          </h2>
          <p className="text-body-lg text-accent-100 max-w-105">{intro}</p>
        </div>
        <div className="blueprint blueprint-inverse p-8">{children}</div>
      </div>
    </Section>
  )
}
