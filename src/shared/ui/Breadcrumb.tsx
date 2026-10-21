import Link from 'next/link'

import type { Crumb } from '../seo/jsonld'

export function Breadcrumb({ crumbs }: { crumbs: readonly Crumb[] }) {
  return (
    <nav aria-label="Fil d’Ariane">
      <ol className="text-body-sm flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="text-neutral-700">
                /
              </span>
            ) : null}
            {index === crumbs.length - 1 ? (
              <span aria-current="page">{crumb.name}</span>
            ) : (
              <Link
                href={crumb.path}
                className="text-accent-700 inline-block py-1 underline underline-offset-4"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
