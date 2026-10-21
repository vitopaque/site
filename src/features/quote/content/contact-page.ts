import type { FaqItem } from '@/shared/ui/FaqList'

import { assertValidContactPage } from './validate'

export type ContactPageContent = {
  h1: string
  intro: string
  seo: { title: string; description: string }
  form: { kicker: string; lines: readonly string[]; intro: string }
  steps: { title: string; text: string }[]
  faq: FaqItem[]
}

export const contactPage: ContactPageContent = {
  h1: 'Demandez votre devis',
  intro:
    'Décrivez votre vitrage et votre projet : nous revenons vers vous pour établir votre devis.',
  seo: {
    title: 'Devis gratuit et contact',
    description:
      'Demandez un devis gratuit à VIT’OPAQUE, à Vendargues, aux portes de Montpellier : films pour le bâtiment, la voiture et le bateau.',
  },
  form: {
    kicker: 'Formulaire',
    lines: ['Votre projet.'],
    intro: 'Quelques champs suffisent : votre univers, votre besoin et un moyen de vous joindre.',
  },
  steps: [
    {
      title: 'Décrivez',
      text: 'Indiquez l’univers, le besoin et vos coordonnées dans le formulaire.',
    },
    { title: 'Échangeons', text: 'Nous revenons vers vous pour préciser votre besoin.' },
    { title: 'Devis', text: 'Vous recevez votre devis, gratuit.' },
  ],
  faq: [
    {
      question: 'Le devis est-il gratuit ?',
      answer: 'Oui, le devis est gratuit.',
    },
    {
      question: 'Quelles informations dois-je indiquer ?',
      answer:
        'Votre nom, un numéro de téléphone ou une adresse e-mail, votre univers et votre type de besoin. La surface ou le modèle sont facultatifs.',
    },
  ],
}

assertValidContactPage(contactPage)
