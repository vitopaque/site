import Link from 'next/link'

import { indexPagePath } from '../paths'

const LINK_CLASS =
  'blueprint hover:bg-surface label-btn-lg inline-flex min-h-11 items-center px-5 py-3'

type Props = { page: number; totalPages: number }

export function Pagination({ page, totalPages }: Props) {
  if (totalPages < 2) return null
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-between gap-6">
      {page > 1 ? (
        <Link href={indexPagePath(page - 1)} rel="prev" className={LINK_CLASS}>
          Précédent
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      <p className="text-body-md text-neutral-700">
        Page {page} sur {totalPages}
      </p>
      {page < totalPages ? (
        <Link href={indexPagePath(page + 1)} rel="next" className={LINK_CLASS}>
          Suivant
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  )
}
