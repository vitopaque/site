import type { Univers } from '@/shared/payload/univers'

import { toGuide } from './cards'
import { articlesForService, articlesForUnivers, latestArticles } from './queries'
import type { Guide } from './types'

const GUIDES_COUNT = 3

// La grille de l'accueil compte 3 cartes : en dessous, la section est masquée
// plutôt que de laisser une grille incomplète. Ailleurs, un seul guide suffit.
const HOME_GUIDES_MIN = GUIDES_COUNT

export const guidesForService = async (slug: string): Promise<Guide[]> =>
  (await articlesForService(slug, GUIDES_COUNT)).map(toGuide)

export const guidesForUnivers = async (univers: Univers): Promise<Guide[]> =>
  (await articlesForUnivers(univers, GUIDES_COUNT)).map(toGuide)

export async function homeGuides(): Promise<Guide[]> {
  const latest = await latestArticles(GUIDES_COUNT)
  return latest.length >= HOME_GUIDES_MIN ? latest.map(toGuide) : []
}
