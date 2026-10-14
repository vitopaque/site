import Link from 'next/link'

import { siteConfig } from '../config'
import type { SocialNetwork } from '../types'
import { SocialIcon } from './SocialIcon'

const NETWORK_LABELS: Record<SocialNetwork, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
}

const telHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, '')}`

export function SiteFooter() {
  const { name, baseline, locationNote, contact, social, footerColumns } = siteConfig
  const { address } = contact
  const postal = [address.postalCode, address.city].filter(Boolean).join(' ')

  return (
    <footer className="border-outline mt-3xl border-t">
      <div className="max-w-page px-margin py-2xl mx-auto">
        <div className="gap-xl grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-headline-sm tracking-widest uppercase">{name}</p>
            <p className="label-caps text-outline mt-sm">{baseline}</p>
            {social.length > 0 ? (
              <ul className="mt-lg gap-md flex">
                {social.map((link) => (
                  <li key={link.network}>
                    <a
                      href={link.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label={`${NETWORK_LABELS[link.network]} (nouvel onglet)`}
                      className="border-outline text-on-surface-variant hover:text-on-surface hover:border-on-surface-variant inline-flex size-10 items-center justify-center rounded-sm border"
                    >
                      <SocialIcon network={link.network} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="gap-xl grid grid-cols-1 sm:grid-cols-2 md:col-span-7">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="label-caps text-on-surface">{column.title}</p>
                <ul className="mt-md gap-sm flex flex-col">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-on-surface-variant hover:text-on-surface"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <p className="label-caps text-on-surface">Contact</p>
              <ul className="mt-md gap-sm text-body-sm flex flex-col">
                <li>
                  <a href={telHref(contact.phone)} className="text-primary">
                    {contact.phone}
                  </a>
                </li>
                {address.street ? (
                  <li className="text-on-surface-variant">{address.street}</li>
                ) : null}
                <li className="text-on-surface-variant">{postal}</li>
                {locationNote ? <li className="text-on-surface-variant">{locationNote}</li> : null}
              </ul>
            </div>
          </div>
        </div>
        <p className="border-outline pt-lg mt-xl text-body-sm text-on-surface-variant border-t">
          © {new Date().getFullYear()} {name}
        </p>
      </div>
    </footer>
  )
}
