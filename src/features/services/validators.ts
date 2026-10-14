import { UNIVERS_OPTIONS } from '@/shared/payload/univers'

const SLUG_FORMAT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const RESERVED_SLUGS: readonly string[] = [
  'realisations',
  'conseils-expertises',
  'a-propos',
  'contact-devis',
  'mentions-legales',
  'politique-de-confidentialite',
  'admin',
  'api',
  'sitemap',
  'robots',
]

const HUB_SLUGS: readonly string[] = UNIVERS_OPTIONS.map((option) => option.value)

export const isHubSlug = (slug: string): boolean => HUB_SLUGS.includes(slug)

export const servicePageSlugRule = (value: string): true | string => {
  if (!SLUG_FORMAT.test(value)) return 'Minuscules, chiffres et tirets uniquement, sans slash.'
  if (RESERVED_SLUGS.includes(value) || isHubSlug(value)) return 'Ce slug est réservé.'
  return true
}
