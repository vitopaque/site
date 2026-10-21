import { ordinal } from '@/shared/ui/ordinal'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { homeTitles } from '../content/sections'
import { methodIntro, methodSteps } from '../content/method'

export function MethodSection() {
  return (
    <Section id="methode" labelledBy="methode-titre">
      <div className="reveal">
        <SectionHeading id="methode-titre" {...homeTitles.method} />
        <p className="text-body-lg mt-6 max-w-prose text-pretty text-neutral-700">{methodIntro}</p>
      </div>
      <ol className="reveal card-grid-narrow mt-12">
        {methodSteps.map((step, index) => (
          <li key={step.title} className="blueprint blueprint-card">
            <span className="text-numeral font-heading text-accent">{ordinal(index)}</span>
            <h3 className="text-headline-sm mt-auto uppercase">{step.title}</h3>
            <p className="text-neutral-700">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
