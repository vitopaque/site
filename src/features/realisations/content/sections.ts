import type { SectionTitle } from '@/shared/ui/SectionHeading'

export const realisationTitles = {
  study: {
    kicker: 'Étude de cas : du besoin au résultat',
    lines: ['Un besoin, un film,', 'un résultat.'],
  },
  beforeAfter: {
    kicker: 'Avant et après la pose du film',
    lines: ['Faites glisser,', 'voyez la différence.'],
  },
  video: { kicker: 'La pose en vidéo', lines: ['La pose,', 'en mouvement.'] },
  gallery: { kicker: 'Galerie de la réalisation', lines: ['La pose,', 'en détail.'] },
  related: { kicker: 'Autres réalisations de films', lines: ['D’autres poses,', 'le même soin.'] },
  cta: { kicker: 'Devis gratuit de pose de film', lines: ['Votre projet,', 'notre atelier.'] },
  listingCta: {
    kicker: 'Devis gratuit de film pour vitrage',
    lines: ['Votre projet,', 'notre savoir-faire.'],
  },
} satisfies Record<string, SectionTitle>
