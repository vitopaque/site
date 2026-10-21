import type { ServicePageContent } from '../../types'
import Body from './body.mdx'

export const filmSolaireBatiment: ServicePageContent = {
  univers: 'batiment',
  slug: 'film-solaire-batiment',
  h1: 'Film solaire pour le bâtiment',
  tagline: 'À intégrer : accroche de la page.',
  intro: 'À intégrer : introduction de la page, avec une mention naturelle de Montpellier.',
  summary: 'À intégrer : phrase de présentation pour les cartes du hub.',
  seo: {
    title: 'À intégrer : film solaire',
    description:
      'À intégrer : méta-description de la page film solaire, avec une mention naturelle de Montpellier.',
  },
  highlights: [
    { title: 'Point clé 1', text: 'À intégrer : explication du premier point clé.' },
    { title: 'Point clé 2', text: 'À intégrer : explication du deuxième point clé.' },
    { title: 'Point clé 3', text: 'À intégrer : explication du troisième point clé.' },
  ],
  faq: [
    { question: 'À intégrer : première question ?', answer: 'À intégrer : première réponse.' },
    { question: 'À intégrer : seconde question ?', answer: 'À intégrer : seconde réponse.' },
  ],
  Body,
}
