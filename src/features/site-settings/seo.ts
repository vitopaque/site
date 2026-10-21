import { absoluteUrl } from '@/shared/seo/metadata'

import { siteConfig } from './config'

const toInternational = (phone: string): string => phone.replace(/^0/, '+33 ')

export const localBusinessId = (): string => `${absoluteUrl('/')}#localbusiness`

export function localBusinessJsonLd(): Record<string, unknown> {
  const { name, contact, social, serviceArea } = siteConfig
  const { address, hours, email, phone } = contact
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': localBusinessId(),
    name,
    url: absoluteUrl('/'),
    telephone: toInternational(phone),
    ...(email ? { email } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(address.street ? { streetAddress: address.street } : {}),
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
      addressLocality: address.city,
      addressCountry: 'FR',
    },
    areaServed: [
      ...serviceArea.building.departments.map((department) => ({
        '@type': 'AdministrativeArea',
        name: department,
      })),
      { '@type': 'AdministrativeArea', name: serviceArea.building.region.name },
      { '@type': 'Country', name: serviceArea.liquidCrystal.country },
    ],
    ...(social.length > 0 ? { sameAs: social.map((link) => link.url) } : {}),
    ...(hours.length > 0
      ? {
          openingHoursSpecification: hours.map((slot) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: slot.days,
            opens: slot.opens,
            closes: slot.closes,
          })),
        }
      : {}),
  }
}
