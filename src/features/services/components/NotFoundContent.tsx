import Link from 'next/link'

import { hubHref } from '../catalog'
import { UNIVERS_OPTIONS } from '@/shared/payload/univers'
import { Section } from '@/shared/ui/Section'

export function NotFoundContent() {
  return (
    <Section labelledBy="introuvable-titre">
      <div className="flex flex-col gap-6">
        <p className="label-caps text-accent-700">Erreur 404</p>
        <h1 id="introuvable-titre" className="text-headline-xl wrap-break-word uppercase">
          Page introuvable.
        </h1>
        <p className="text-body-lg max-w-105 text-neutral-700">
          Cette adresse n’existe pas ou n’existe plus. Reprenez le fil par l’un de nos univers.
        </p>
        <ul className="card-grid mt-6">
          {UNIVERS_OPTIONS.map((option) => (
            <li key={option.value}>
              <Link
                href={hubHref(option.value)}
                className="blueprint hover:bg-surface label-btn-lg block p-5"
              >
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="label-btn-lg text-accent-700 self-start underline underline-offset-4"
        >
          Retour à l’accueil
        </Link>
      </div>
    </Section>
  )
}
