const CITY = /montpellier/
const CITY_WITH_NUMBER = /montpellier[^\p{L}\p{N}]{0,3}34(?:\d{3})?(?!\d)|\b34[\s.-]?740\b/u

const normalize = (value) =>
  value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[\u00AD\u180E\u200B-\u200F\u202A-\u202E\u2060\u2066-\u2069\uFEFF]/g, '')
    .replace(/[\u2010-\u2015\u2212]/g, '-')
    .toLowerCase()

export const noCityInTitle = (value) => {
  const normalized = normalize(value)
  return CITY.test(normalized) || CITY_WITH_NUMBER.test(normalized)
    ? 'La ville ne doit pas figurer dans les titres, H1 et textes alternatifs.'
    : true
}

export const noCityNumber = (value) =>
  CITY_WITH_NUMBER.test(normalize(value)) ? 'Ne pas associer la ville à « 34 » ou « 34740 ».' : true
