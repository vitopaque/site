import { ButtonLink } from './ButtonLink'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { SweepBand } from './SweepBand'

type Props = {
  id: string
  kicker: string
  lines: readonly string[]
  text: string
  cta: { label: string; href: string }
}

export function CtaBand({ id, kicker, lines, text, cta }: Props) {
  return (
    <Section labelledBy={id} tone="dark" className="relative overflow-hidden">
      <SweepBand />
      <div className="relative flex flex-col items-start gap-6">
        <SectionHeading id={id} kicker={kicker} lines={lines} tone="dark" />
        <p className="text-body-lg text-accent-100 max-w-prose">{text}</p>
        <ButtonLink href={cta.href} variant="primary-inverse">
          {cta.label}
        </ButtonLink>
      </div>
    </Section>
  )
}
