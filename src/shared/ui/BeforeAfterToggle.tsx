'use client'

import { useState, type ReactNode } from 'react'

type Props = {
  label: string
  labels: { before: string; after: string }
  before: ReactNode
  after: ReactNode
}

const STATES = ['before', 'after'] as const

export function BeforeAfterToggle({ label, labels, before, after }: Props) {
  const [shown, setShown] = useState<(typeof STATES)[number]>('before')
  const layer = (state: (typeof STATES)[number]) =>
    `absolute inset-0 transition-opacity duration-(--duration-film) ${shown === state ? 'opacity-100' : 'opacity-0'}`

  return (
    <div className="flex flex-col gap-4">
      <div className="blueprint aspect-16/9 w-full min-w-0">
        <div className="absolute inset-0 overflow-hidden">
          <div aria-hidden={shown !== 'before'} className={layer('before')}>
            {before}
          </div>
          <div aria-hidden={shown !== 'after'} className={layer('after')}>
            {after}
          </div>
        </div>
      </div>
      <div role="group" aria-label={label} className="border-accent-700 flex border">
        {STATES.map((state) => (
          <button
            key={state}
            type="button"
            aria-pressed={shown === state}
            onClick={() => setShown(state)}
            className={`label-btn-lg focus-visible:outline-accent flex min-h-11 flex-1 cursor-pointer items-center justify-center px-3.5 py-2.5 text-center transition-colors duration-(--duration-hover) focus-visible:outline-2 focus-visible:-outline-offset-2 ${shown === state ? 'bg-accent-700 text-background' : 'hover:bg-accent-100'}`}
          >
            {labels[state]}
          </button>
        ))}
      </div>
    </div>
  )
}
