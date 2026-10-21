import { formatOpeningHours, siteConfig, telHref } from '@/features/site-settings'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

const LINK = 'text-accent-700 inline-block py-1 underline underline-offset-4'

export function ContactDetails() {
  const { phone, email, address, hours } = siteConfig.contact
  const hoursLines = formatOpeningHours(hours)
  const postal = [address.postalCode, address.city].filter(Boolean).join(' ')

  return (
    <Section labelledBy="coordonnees-titre">
      <div className="reveal">
        <SectionHeading id="coordonnees-titre" kicker="Coordonnées" lines={['Nous joindre.']} />
      </div>
      <dl className="reveal mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-x-12 gap-y-8">
        <div className="flex flex-col gap-2">
          <dt className="label-caps text-accent-700">Téléphone</dt>
          <dd className="text-body-lg">
            <a href={telHref(phone)} className={LINK}>
              {phone}
            </a>
          </dd>
        </div>
        {email ? (
          <div className="flex flex-col gap-2">
            <dt className="label-caps text-accent-700">E-mail</dt>
            <dd className="text-body-lg">
              <a href={`mailto:${email}`} className={LINK}>
                {email}
              </a>
            </dd>
          </div>
        ) : null}
        <div className="flex flex-col gap-2">
          <dt className="label-caps text-accent-700">Adresse</dt>
          <dd className="text-body-lg">
            {address.street ? <span className="block">{address.street}</span> : null}
            <span className="block">{postal}</span>
            {siteConfig.locationNote ? (
              <span className="block text-neutral-700">{siteConfig.locationNote}</span>
            ) : null}
          </dd>
        </div>
        {hoursLines.length > 0 ? (
          <div className="flex flex-col gap-2">
            <dt className="label-caps text-accent-700">Horaires</dt>
            <dd className="text-body-lg">
              {hoursLines.map((line) => (
                <span key={line.days} className="block">
                  {line.days} : {line.slots}
                </span>
              ))}
            </dd>
          </div>
        ) : null}
      </dl>
    </Section>
  )
}
