import { QUOTE_SERVICE_PARAM, QUOTE_UNIVERS_PARAM, serviceSilos } from '@/shared/catalog'

import type { QuoteSilo } from '../types'
import { QuoteFormClient } from './QuoteFormClient'
import { QuoteFormFromUrl } from './QuoteFormFromUrl'

const silos: QuoteSilo[] = serviceSilos.map(({ key, slug, univers, label }) => ({
  key,
  slug,
  univers,
  label,
}))

export function QuoteForm({ preselectFromUrl = false }: { preselectFromUrl?: boolean }) {
  return preselectFromUrl ? (
    <QuoteFormFromUrl
      silos={silos}
      serviceParam={QUOTE_SERVICE_PARAM}
      universParam={QUOTE_UNIVERS_PARAM}
    />
  ) : (
    <QuoteFormClient silos={silos} />
  )
}
