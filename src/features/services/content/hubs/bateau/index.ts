import type { HubPageContent } from '../../types'
import Body from './body.mdx'

export const bateauHub: HubPageContent = {
  univers: 'bateau',
  h1: 'Films pour vitrages de bateau : confort et intimité à bord',
  tagline: 'Plaisance',
  intro:
    'Le soleil, la réverbération sur l’eau, les regards au port : le vitrage d’un bateau demande une réponse précise. VIT’OPAQUE, à Vendargues, aux portes de Montpellier, propose des films adaptés aux vitrages nautiques, pour un bord plus frais, plus intime et plus élégant.',
  seo: {
    title: 'Films pour vitrages de bateaux de plaisance',
    description:
      'Films pour le vitrage de votre bateau : chaleur, intimité et esthétique. VIT’OPAQUE, à Vendargues, aux portes de Montpellier. Devis gratuit.',
  },
  sectionTitles: {
    realisations: {
      kicker: 'Réalisations de films pour bateaux',
      lines: ['Des bords', 'plus intimes.'],
    },
    lab: {
      kicker: 'Laboratoire de films pour vitrage de bateau',
      lines: ['Faites glisser,', 'voyez le bord.'],
    },
    faq: {
      kicker: 'Films pour vitrage de bateau : vos questions',
      lines: ['Avant de teinter', 'le vitrage du bord.'],
    },
    cta: {
      kicker: 'Devis gratuit pour votre bateau',
      lines: ['Votre bateau,', 'notre expertise.'],
    },
  },
  faq: [
    {
      question: 'À qui s’adresse la pose de films sur un bateau ?',
      answer:
        'Aux propriétaires de bateaux de plaisance qui veulent un bord plus frais, plus intime et plus élégant, au port comme au mouillage, sans toucher à la structure du bateau.',
    },
    {
      question: 'Quelle prestation proposez-vous pour un bateau ?',
      answer:
        'Des vitres teintées, avec des films adaptés au vitrage nautique : baies, hublots, poste de barre. Nous étudions la forme et la matière de chaque vitrage avant de proposer un film.',
    },
    {
      question: 'Comment entretenir les vitres de mon bateau après la pose ?',
      answer:
        'Un chiffon doux et un nettoyant doux suffisent ; on évite les produits agressifs, les éponges abrasives et les grattoirs. Après la pose, nous vous indiquons comment laisser le film se stabiliser avant le premier nettoyage, et nous vous remettons des consignes adaptées à votre usage.',
    },
  ],
  Body,
}
