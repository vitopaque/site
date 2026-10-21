'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import type { NavLink } from '../types'

type Props = { links: NavLink[]; cta: NavLink }

export function MobileMenu({ links, cta }: Props) {
  const pathname = usePathname()
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const open = openedOn === pathname
  const close = () => setOpenedOn(null)

  useEffect(() => {
    const breakpoint = getComputedStyle(document.documentElement).getPropertyValue(
      '--breakpoint-desktop',
    )
    const desktop = window.matchMedia(`(min-width: ${breakpoint})`)
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenedOn(null)
    }
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpenedOn(null)
      buttonRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className="desktop:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        onClick={() => setOpenedOn(open ? null : pathname)}
        className="border-outline-inverse hover:bg-hover-inverse inline-flex size-11 items-center justify-center border"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
        </svg>
      </button>
      <div
        id="menu-mobile"
        hidden={!open}
        className="bg-accent-900 border-divider-inverse px-margin absolute inset-x-0 top-full z-20 max-h-[calc(100svh-var(--header-height))] overflow-y-auto border-t py-6"
      >
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                className="text-title-md hover:text-accent-300 block py-3"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={cta.href}
          onClick={close}
          className="blueprint blueprint-inverse label-btn-lg hover:bg-hover-inverse mt-6 flex justify-center px-6 py-4"
        >
          {cta.label}
        </Link>
      </div>
    </div>
  )
}
