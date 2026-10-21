import { serviceSilos } from '@/features/services'

import { UNKNOWN_NEED, type QuoteErrors, type QuoteValues } from './types'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_CHARS = /^[+\d\s().-]+$/
const MIN_PHONE_DIGITS = 9

export const nameError = (value: string): string | null =>
  value.trim() ? null : 'Indiquez votre nom.'

export const contactError = (value: string): string | null => {
  const contact = value.trim()
  if (!contact) return 'Indiquez un numéro de téléphone ou une adresse e-mail.'
  if (EMAIL.test(contact)) return null
  const digits = contact.replace(/\D/g, '')
  if (PHONE_CHARS.test(contact) && digits.length >= MIN_PHONE_DIGITS) return null
  return 'Ce numéro ou cette adresse e-mail ne semble pas valide.'
}

export const needError = (univers: QuoteValues['univers'], need: QuoteValues['need']) =>
  need === UNKNOWN_NEED ||
  serviceSilos.some((silo) => silo.key === need && silo.univers === univers)
    ? null
    : 'Choisissez un besoin correspondant à cet univers.'

export const consentError = (value: boolean): string | null =>
  value ? null : 'Votre accord est nécessaire pour traiter votre demande.'

export const validateQuote = (values: QuoteValues): QuoteErrors => {
  const checks: QuoteErrors = {
    name: nameError(values.name) ?? undefined,
    contact: contactError(values.contact) ?? undefined,
    need: needError(values.univers, values.need) ?? undefined,
    consent: consentError(values.consent) ?? undefined,
  }
  return Object.fromEntries(Object.entries(checks).filter(([, message]) => message))
}
