const SLUG_FORMAT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const RESERVED_SLUGS: readonly string[] = ['page']

export const slugify = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[œŒ]/g, 'oe')
    .replace(/[æÆ]/g, 'ae')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const articleSlugRule = (value: string): true | string => {
  if (!SLUG_FORMAT.test(value)) return 'Minuscules, chiffres et tirets uniquement, sans slash.'
  if (RESERVED_SLUGS.includes(value)) return 'Ce slug est réservé.'
  return true
}
