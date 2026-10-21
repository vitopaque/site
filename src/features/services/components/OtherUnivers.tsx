import Link from 'next/link'

import type { Univers } from '@/shared/payload/univers'
import { UNIVERS_OPTIONS } from '@/shared/payload/univers'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { hubHref, silosOfUnivers } from '../catalog'

type Props = { current: Univers; tone?: 'light' | 'surface' }

export function OtherUnivers({ current, tone = 'light' }: Props) {
  return (
    <Section labelledBy="univers-titre" tone={tone}>
      <div className="reveal">
        <SectionHeading
          id="univers-titre"
          kicker="Films pour vitrages"
          lines={['Autres univers.']}
        />
      </div>
      <ul className="reveal card-grid mt-12">
        {UNIVERS_OPTIONS.filter((option) => option.value !== current).map((option) => (
          <li key={option.value} className="blueprint blueprint-card">
            <h3 className="text-headline-sm uppercase">
              <Link href={hubHref(option.value)} className="hover:text-accent-700">
                {option.label}
              </Link>
            </h3>
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
