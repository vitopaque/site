export const slugify = (text) =>
  text
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[œŒ]/g, 'oe')
    .replace(/[æÆ]/g, 'ae')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
