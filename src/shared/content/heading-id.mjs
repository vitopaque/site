export const slugifyHeading = (text) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export function createHeadingIds() {
  const used = new Set()
  return (text) => {
    const base = slugifyHeading(text)
    if (!base) return null
    let id = base
    for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`
    used.add(id)
    return id
  }
}
