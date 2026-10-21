import Link from 'next/link'

import { siteConfig } from '../config'
import { BrandLockup } from './BrandLockup'
import { MobileMenu } from './MobileMenu'

const VARIANTS = {
  solid: 'bg-accent-900 relative',
  overlay: 'absolute inset-x-0 top-0',
} as const

export function SiteHeader({ variant = 'solid' }: { variant?: keyof typeof VARIANTS }) {
  const { links, cta } = siteConfig.navigation

  return (
    <header className={`on-dark text-background z-20 ${VARIANTS[variant]}`}>
      <div className="max-w-page px-margin desktop:gap-10 mx-auto flex items-center gap-6 py-5">
        <div className="mr-auto">
          <BrandLockup />
        </div>
        <nav aria-label="Navigation principale" className="desktop:block hidden">
          <ul className="flex gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="label-nav hover:text-accent-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href={cta.href}
          className="blueprint blueprint-inverse label-btn hover:bg-hover-inverse desktop:inline-flex hidden px-4 py-2"
        >
          {cta.label}
        </Link>
        <MobileMenu links={links} cta={cta} />
      </div>
    </header>
  )
}
