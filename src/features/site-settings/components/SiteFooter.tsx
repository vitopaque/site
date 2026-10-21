import Link from 'next/link'

import { siteConfig } from '../config'
import { telHref } from '../format'
import type { SocialNetwork } from '../types'
import { BrandLockup } from './BrandLockup'
import { SocialIcon } from './SocialIcon'

const NETWORK_LABELS: Record<SocialNetwork, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
}

export function SiteFooter() {
  const { name, baseline, locationNote, contact, social, footerColumns } = siteConfig
  const { address } = contact
  const postal = [address.postalCode, address.city].filter(Boolean).join(' ')

  return (
    <footer className="on-dark bg-accent-900 text-accent-200 border-divider-inverse border-t">
      <div className="max-w-page px-margin mx-auto py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-background">
              <BrandLockup />
            </div>
            <p className="label-caps text-accent-300 mt-4">{baseline}</p>
            {social.length > 0 ? (
              <ul className="mt-6 flex gap-4">
                {social.map((link) => (
                  <li key={link.network}>
                    <a
                      href={link.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label={`${NETWORK_LABELS[link.network]} (nouvel onglet)`}
                      className="border-outline-inverse text-accent-200 hover:bg-hover-inverse hover:text-background inline-flex size-11 items-center justify-center border"
                    >
                      <SocialIcon network={link.network} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:col-span-7">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="label-caps text-accent-300">{column.title}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-body-sm hover:text-background">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <p className="label-caps text-accent-300">Contact</p>
              <ul className="text-body-sm mt-4 flex flex-col gap-2">
                <li>
                  <a
                    href={telHref(contact.phone)}
                    className="text-background underline underline-offset-4"
                  >
                    {contact.phone}
                  </a>
                </li>
                {address.street ? <li>{address.street}</li> : null}
                <li>{postal}</li>
                {locationNote ? <li>{locationNote}</li> : null}
              </ul>
            </div>
          </div>
        </div>
        <p className="border-divider-inverse text-body-sm mt-12 border-t pt-6">
          © {new Date().getFullYear()} {name}
        </p>
      </div>
    </footer>
  )
}
