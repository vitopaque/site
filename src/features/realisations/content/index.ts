import { siteConfig } from '@/features/site-settings'

import type { Realisation } from '../types'
import { listing } from './listing'
import { assertValidRealisations } from './validate'
import { vitresArriereTeinteesPorscheMacan } from './vitres-arriere-teintees-porsche-macan'

export { listing }

export const realisations: readonly Realisation[] = [vitresArriereTeinteesPorscheMacan]

assertValidRealisations({
  listing,
  realisations,
  titleTemplate: siteConfig.seo.titleTemplate,
})
