export type ArticleTextFields = {
  title: string
  excerpt: string
  seoDescription: string
  body: string
}

export type WorkMarker = {
  field: keyof ArticleTextFields
  marker: string
  line: number
}

const WORK_MARKER = /\[à[^\]\n]*\]?/gi

export function findWorkMarkers(fields: ArticleTextFields): WorkMarker[] {
  return (Object.keys(fields) as (keyof ArticleTextFields)[]).flatMap((field) =>
    fields[field]
      .normalize('NFC')
      .split('\n')
      .flatMap((text, index) =>
        Array.from(text.matchAll(WORK_MARKER), ([marker]) => ({
          field,
          marker,
          line: index + 1,
        })),
      ),
  )
}
