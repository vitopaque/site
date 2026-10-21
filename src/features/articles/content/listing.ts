import type { SectionTitle } from '@/shared/ui/SectionHeading'

export const listing = {
  h1: 'Conseils et expertises sur les films pour vitrages',
  tagline: 'Conseils & expertises',
  intro:
    'Film solaire, sécurité, PDLC, vitres teintées : nos guides expliquent les choix, les usages et la pose, pour décider en connaissance de cause.',
  seo: {
    title: 'Conseils et expertises : films pour vitrages',
    description:
      'Guides et conseils d’experts sur les films pour vitrages : solaire, sécurité, PDLC, vitres teintées auto et bateau. Par VIT’OPAQUE.',
  },
}

export const articleTitles = {
  empty: { kicker: 'Bientôt', lines: ['Nos premiers guides', 'arrivent bientôt.'] },
  related: { kicker: 'Conseils & expertises', lines: ['Poursuivre', 'la lecture.'] },
  cta: { kicker: 'Devis gratuit de pose de film', lines: ['Parlons de', 'votre vitrage.'] },
} satisfies Record<string, SectionTitle>

export const pageSeo = (page: number): { title: string; description: string } =>
  page <= 1
    ? listing.seo
    : {
        title: `${listing.seo.title} – page ${page}`,
        description: `${listing.seo.description} Page ${page}.`,
      }
