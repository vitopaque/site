import type { SectionTitle } from '@/shared/ui/SectionHeading'

import type { SectionKey, SectionTitles } from './types'

const DEFAULT_TITLES: Record<SectionKey, SectionTitle> = {
  highlights: { kicker: 'Points clés du film', lines: ['L’essentiel.'] },
  film: { kicker: 'Caractéristiques du film', lines: ['En un coup d’œil.'] },
  lab: { kicker: 'Laboratoire de films', lines: ['Faites glisser.', 'Voyez la différence.'] },
  realisations: { kicker: 'Réalisations de pose de films', lines: ['Derrière le verre.'] },
  reviews: { kicker: 'Avis clients sur Google', lines: ['Ce que disent', 'nos clients.'] },
  faq: { kicker: 'Questions sur la pose de films', lines: ['Questions fréquentes.'] },
  otherServices: { kicker: 'Prestations complémentaires', lines: ['Autres prestations.'] },
  guides: {
    kicker: 'Conseils & expertises sur les films',
    lines: ['Comprendre', 'avant de choisir.'],
  },
  cta: { kicker: 'Devis gratuit de pose de film', lines: ['Parlons de', 'votre vitrage.'] },
}

export const sectionTitle = (
  page: { sectionTitles?: SectionTitles },
  key: SectionKey,
): SectionTitle => page.sectionTitles?.[key] ?? DEFAULT_TITLES[key]
