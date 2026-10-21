import type { SectionTitle } from '@/shared/ui/SectionHeading'

export const homeTitles = {
  lab: {
    kicker: 'Laboratoire de films pour vitrages de bâtiment',
    lines: ['Faites glisser.', 'Voyez la différence.'],
  },
  method: {
    kicker: 'Pose de films pour vitrages : notre méthode',
    lines: ['Quatre gestes,', 'une vitre transformée.'],
  },
  univers: {
    kicker: 'Films pour bâtiment, voiture et bateau',
    lines: ['Trois univers,', 'une même exigence.'],
  },
  realisations: {
    kicker: 'Réalisations de pose de films pour vitrages',
    lines: ['Derrière le verre.'],
  },
  caseStudies: {
    kicker: 'Études de cas de pose de films',
    lines: ['Un besoin, un film,', 'un résultat.'],
  },
  reviews: { kicker: 'Avis Google sur VIT’OPAQUE', lines: ['Ce que disent', 'nos clients.'] },
  guides: {
    kicker: 'Conseils & expertises : films pour vitrages',
    lines: ['Comprendre', 'avant de choisir.'],
  },
  faq: {
    kicker: 'Films pour vitrages : questions fréquentes',
    lines: ['Vos questions,', 'nos réponses.'],
  },
} satisfies Record<string, SectionTitle>
