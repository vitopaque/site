import type { ServiceKey, ServiceSilo } from '@/features/services'
import type { Univers } from '@/shared/payload/univers'

export type QuoteSilo = Pick<ServiceSilo, 'key' | 'slug' | 'univers' | 'label'>

export const UNKNOWN_NEED = 'inconnu'

export type NeedChoice = ServiceKey | typeof UNKNOWN_NEED

export type QuoteValues = {
  name: string
  contact: string
  univers: Univers
  need: NeedChoice
  details: string
  consent: boolean
}

export type QuoteField = 'name' | 'contact' | 'need' | 'consent'

export type QuoteErrors = Partial<Record<QuoteField, string>>
