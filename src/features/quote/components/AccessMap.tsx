import Image from 'next/image'

import { siteConfig } from '@/features/site-settings'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { accessMap } from '../content/access'

const HOVER = { light: 'hover:bg-surface', surface: 'hover:bg-background' } as const

export function hasAccessBlock(): boolean {
  return siteConfig.contact.address.street !== null
}

export function AccessMap({ tone }: { tone: keyof typeof HOVER }) {
  const { street, postalCode, city } = siteConfig.contact.address
  if (!street) return null
  const address = [street, [postalCode, city].filter(Boolean).join(' ')].join(', ')
  const route = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`

  return (
    <Section labelledBy="acces-titre" tone={tone}>
      <div className="reveal flex flex-col items-start gap-8">
        <SectionHeading id="acces-titre" kicker="Accès" lines={['Plan d’accès.']} />
        <p className="text-body-lg">{address}</p>
        {accessMap ? (
          <figure className="blueprint w-full">
            <Image
              src={accessMap.src}
              alt={accessMap.alt}
              sizes="(min-width: 90rem) 90rem, 100vw"
              className="h-auto w-full"
            />
          </figure>
        ) : null}
        <a
          href={route}
          target="_blank"
          rel="noopener noreferrer"
          className={`label-btn-lg border-accent-700 inline-flex min-h-11 items-center border px-5 py-3 ${HOVER[tone]}`}
        >
          Itinéraire
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      </div>
    </Section>
  )
}
