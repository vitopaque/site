import { QUOTE_SERVICE_PARAM, serviceSilos } from '@/features/services'

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
    <QuoteFormFromUrl silos={silos} param={QUOTE_SERVICE_PARAM} />
  ) : (
    <QuoteFormClient silos={silos} />
  )
}
