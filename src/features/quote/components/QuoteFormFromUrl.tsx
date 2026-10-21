'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import type { QuoteSilo } from '../types'
import { serviceFromParam } from '../validators'
import { QuoteFormClient } from './QuoteFormClient'

type Props = { silos: readonly QuoteSilo[]; param: string }

function PreselectedQuoteForm({ silos, param }: Props) {
  const service = serviceFromParam(useSearchParams().get(param), silos)
  return <QuoteFormClient silos={silos} initialService={service} />
}

export function QuoteFormFromUrl({ silos, param }: Props) {
  return (
    <Suspense fallback={<QuoteFormClient silos={silos} />}>
      <PreselectedQuoteForm silos={silos} param={param} />
    </Suspense>
  )
}
