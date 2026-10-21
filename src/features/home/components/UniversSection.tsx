import Link from 'next/link'

import { hubHref, silosOfUnivers } from '@/features/services'
import { UNIVERS_OPTIONS } from '@/shared/payload/univers'
import { ordinal } from '@/shared/ui/ordinal'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

const INTRO = {
  batiment: 'Confort, intimité et sécurité pour bureaux, commerces et villas.',
  voiture: 'Vitres teintées, covering et flocage : l’allure et la discrétion.',
  bateau: 'Teinte et protection du vitrage de votre bateau.',
} as const

export function UniversSection() {
  return (
    <Section labelledBy="univers-titre" tone="surface">
      <div className="reveal">
        <SectionHeading
          id="univers-titre"
          kicker="Les univers"
          lines={['Trois univers,', 'une même exigence.']}
        />
      </div>
      <ul className="reveal card-grid mt-12">
        {UNIVERS_OPTIONS.map((option, index) => (
          <li key={option.value} className="blueprint blueprint-card">
            <span className="text-numeral font-heading text-accent">{ordinal(index)}</span>
            <h3 className="text-headline-sm uppercase">
              <Link href={hubHref(option.value)} className="hover:text-accent-700">
                {option.label}
              </Link>
            </h3>
            <p className="text-neutral-700">{INTRO[option.value]}</p>
            <ul className="border-divider mt-auto flex flex-col gap-1 border-t pt-3.5">
              {silosOfUnivers(option.value).map((silo) => (
                <li key={silo.key}>
                  <Link
                    href={silo.href}
                    className="label-btn text-accent-700 inline-block py-1 underline underline-offset-4"
                  >
                    {silo.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}
