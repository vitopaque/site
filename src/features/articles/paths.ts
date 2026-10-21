export const ARTICLES_PATH = '/conseils-expertises'

export const ARTICLES_PER_PAGE = 9

export const MIN_INDEXABLE_ARTICLES = 3

const PAGE_NUMBER = /^[1-9]\d{0,5}$/

export const articlePath = (slug: string): string => `${ARTICLES_PATH}/${slug}`

export const indexPagePath = (page: number): string =>
  page <= 1 ? ARTICLES_PATH : `${ARTICLES_PATH}/page/${page}`

export function parsePageNumber(raw: string): number | null {
  if (!PAGE_NUMBER.test(raw)) return null
  const page = Number(raw)
  return page >= 2 ? page : null
}
