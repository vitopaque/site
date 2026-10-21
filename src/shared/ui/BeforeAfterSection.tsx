import { BeforeAfter, type BeforeAfterPair } from './BeforeAfter'
import { Section } from './Section'
import { SectionHeading, type SectionTitle } from './SectionHeading'

type Props = {
  id: string
  heading: SectionTitle
  pair: BeforeAfterPair
  tone?: 'light' | 'surface'
}

export function BeforeAfterSection({ id, heading, pair, tone }: Props) {
  return (
    <Section labelledBy={id} tone={tone}>
      <div className="reveal grid items-center gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-6">
          <SectionHeading id={id} {...heading} />
          <p className="text-body-lg max-w-prose text-pretty text-neutral-700">
            Déplacez la ligne pour comparer les vitres d’origine et les vitres teintées.
          </p>
        </div>
        <div className="lg:col-span-2">
          <BeforeAfter pair={pair} />
        </div>
      </div>
    </Section>
  )
}
