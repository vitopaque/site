import type { ReactNode } from 'react'

import type { Crumb } from '../seo/jsonld'
import { Breadcrumb } from './Breadcrumb'

type Props = {
  crumbs: readonly Crumb[]
  kicker?: string
  title: string
  intro: string
  actions?: ReactNode
  aside?: ReactNode
}

export function PageHero({ crumbs, kicker, title, intro, actions, aside }: Props) {
  return (
    <header className="bg-background text-foreground">
      <div className="max-w-page px-margin mx-auto pt-8 pb-12">
        <Breadcrumb crumbs={crumbs} />
        <div className="mt-12 grid items-end gap-12 lg:grid-cols-12">
          <div className={`flex flex-col gap-6 ${aside ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            {kicker ? <p className="label-caps text-accent-700">{kicker}</p> : null}
            <h1 className="text-headline-xl wrap-break-word hyphens-auto uppercase">{title}</h1>
            <p className="text-body-lg max-w-prose text-pretty text-neutral-700">{intro}</p>
            {actions ? <div className="mt-1.5 flex flex-wrap gap-4">{actions}</div> : null}
          </div>
          {aside ? <div className="lg:col-span-5">{aside}</div> : null}
        </div>
      </div>
    </header>
  )
}
