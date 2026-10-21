import Link from 'next/link'

import { hubHref, silosOfUnivers } from '@/shared/catalog'
import { formatServiceArea, siteConfig } from '@/features/site-settings'
import { UNIVERS_OPTIONS } from '@/shared/payload/univers'
import { ordinal } from '@/shared/ui/ordinal'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { homeTitles } from '../content/sections'
import { universIntro } from '../content/univers'

export function UniversSection() {
  return (
    <Section labelledBy="univers-titre" tone="surface">
      <div className="reveal">
        <SectionHeading id="univers-titre" {...homeTitles.univers} />
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
            <p className="text-neutral-700">{universIntro[option.value]}</p>
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
      <p className="text-body-lg reveal mt-10 max-w-prose text-pretty text-neutral-700">
        {formatServiceArea(siteConfig.serviceArea)}
      </p>
    </Section>
  )
}
