import type { SectionTitle } from '@/shared/ui/SectionHeading'

export const homeTitles = {
  lab: {
    kicker: 'Laboratoire de films pour le bâtiment',
    lines: ['Faites glisser.', 'Voyez la différence.'],
  },
  method: {
    kicker: 'Notre méthode de pose de films',
    lines: ['Quatre gestes,', 'une vitre transformée.'],
  },
  univers: {
    kicker: 'Films pour bâtiment, voiture et bateau',
    lines: ['Trois univers,', 'une même exigence.'],
  },
  realisations: { kicker: 'Réalisations de pose de films', lines: ['Derrière le verre.'] },
  caseStudies: {
    kicker: 'Études de cas de pose de films',
    lines: ['Un besoin, un film,', 'un résultat.'],
  },
  reviews: { kicker: 'Avis clients sur Google', lines: ['Ce que disent', 'nos clients.'] },
  guides: {
    kicker: 'Conseils & expertises sur les films',
    lines: ['Comprendre', 'avant de choisir.'],
  },
  faq: { kicker: 'Questions sur la pose de films', lines: ['Questions fréquentes.'] },
} satisfies Record<string, SectionTitle>
