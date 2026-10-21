import { slugify } from './slugify.mjs'

export function createHeadingIds() {
  const used = new Set()
  return (text) => {
    const base = slugify(text)
    if (!base) return null
    let id = base
    for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`
    used.add(id)
    return id
  }
}
