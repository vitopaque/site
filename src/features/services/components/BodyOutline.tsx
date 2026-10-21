import { ordinal } from '@/shared/ui/ordinal'

import type { BodyHeading } from '../content/types'

export function BodyOutline({ headings }: { headings: readonly BodyHeading[] }) {
  return (
    <nav
      aria-label="Sommaire de la page"
      className="blueprint blueprint-card [--card-min-height:0px]"
    >
      <p className="label-caps text-accent-700">Sommaire</p>
      <ol className="flex flex-col">
        {headings.map(({ id, text }, index) => (
          <li key={id} className="border-divider border-t first:border-t-0">
            <a
              href={`#${id}`}
              className="hover:text-accent-700 text-body-sm flex items-baseline gap-3 py-1.5"
            >
              <span className="font-heading text-accent-700 w-5 shrink-0">{ordinal(index)}</span>
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
