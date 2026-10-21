import { realisationSeoEntries } from '@/features/realisations'
import { siteConfig } from '@/features/site-settings'

import { serviceSilos } from '@/shared/catalog'
import { batimentHub } from './hubs/batiment'
import { bateauHub } from './hubs/bateau'
import { voitureHub } from './hubs/voiture'
import { coveringEtFlocage } from './services/covering-et-flocage'
import { filmPdlcCristauxLiquides } from './services/film-pdlc-cristaux-liquides'
import { filmSecuriteAntiEffraction } from './services/film-securite-anti-effraction'
import { filmSolaireBatiment } from './services/film-solaire-batiment'
import { vitresTeinteesAuto } from './services/vitres-teintees-auto'
import { vitresTeinteesBateau } from './services/vitres-teintees-bateau'
import { vitrophanieSignaletique } from './services/vitrophanie-signaletique'
import type { HubPageContent, ServicePageContent } from './types'
import { assertValidContent, seoClashes } from './validate'

export const hubPages: HubPageContent[] = [batimentHub, voitureHub, bateauHub]

export const servicePages: ServicePageContent[] = [
  filmSolaireBatiment,
  filmSecuriteAntiEffraction,
  filmPdlcCristauxLiquides,
  vitrophanieSignaletique,
  vitresTeinteesAuto,
  vitresTeinteesBateau,
  coveringEtFlocage,
]

assertValidContent({
  hubPages,
  servicePages,
  silos: serviceSilos,
  titleTemplate: siteConfig.seo.titleTemplate,
  otherSeo: realisationSeoEntries(),
  home: siteConfig.seo.home,
  internalHrefs: siteConfig.footerColumns.flatMap((column) =>
    column.links.map((link) => link.href),
  ),
})

export const seoClashesWithPages = (label: string, seo: { title: string; description: string }) =>
  seoClashes(label, seo, {
    hubPages,
    servicePages,
    home: siteConfig.seo.home,
    otherSeo: realisationSeoEntries(),
  })
