'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import type { QuoteSilo } from '../types'
import { serviceFromParam, universFromParam } from '../validators'
import { QuoteFormClient } from './QuoteFormClient'

type Props = { silos: readonly QuoteSilo[]; serviceParam: string; universParam: string }

function PreselectedQuoteForm({ silos, serviceParam, universParam }: Props) {
  const params = useSearchParams()
  const service = serviceFromParam(params.get(serviceParam), silos)
  const univers = universFromParam(params.get(universParam))
  return <QuoteFormClient silos={silos} initialService={service} initialUnivers={univers} />
}

export function QuoteFormFromUrl({ silos, serviceParam, universParam }: Props) {
  return (
    <Suspense fallback={<QuoteFormClient silos={silos} />}>
      <PreselectedQuoteForm silos={silos} serviceParam={serviceParam} universParam={universParam} />
    </Suspense>
  )
}
