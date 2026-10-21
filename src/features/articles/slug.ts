import { slugify } from '@/shared/content/slugify.mjs'

const SLUG_FORMAT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const RESERVED_SLUGS: readonly string[] = ['page']

export { slugify }

export const articleSlugRule = (value: string): true | string => {
  if (!SLUG_FORMAT.test(value)) return 'Minuscules, chiffres et tirets uniquement, sans slash.'
  if (RESERVED_SLUGS.includes(value)) return 'Ce slug est réservé.'
  return true
}
