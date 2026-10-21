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
  h1: 'Contact et devis',
  intro:
    'Un projet de film pour vos vitrages, votre voiture ou votre bateau ? Décrivez-le-nous : le devis est gratuit. Notre atelier est à Vendargues, aux portes de Montpellier.',
  seo: {
    title: 'Contact et devis gratuit pour votre vitrage',
    description:
      'Demandez votre devis gratuit pour un film de vitrage : bâtiment, voiture ou bateau. VIT’OPAQUE, à Vendargues, aux portes de Montpellier.',
  },
  form: {
    kicker: 'Formulaire',
    lines: ['Votre projet.'],
    intro:
      'Plus votre demande est détaillée, plus notre proposition est juste. Indiquez, selon le cas : le type de lieu, de véhicule ou de bateau ; le besoin (chaleur, intimité, sécurité, esthétique) ; les surfaces ou le modèle ; et quelques photos si vous le pouvez.',
  },
  steps: [
    {
      title: 'Nous recevons votre demande',
      text: 'Elle arrive directement chez nous avec les informations et les photos que vous avez jointes.',
    },
    {
      title: 'Nous échangeons avec vous',
      text: 'Nous prenons contact pour préciser votre besoin, vos vitrages ou votre véhicule, et répondre à vos questions.',
    },
    {
      title: 'Vous recevez votre devis',
      text: 'Il détaille la solution proposée, adaptée à votre projet. Il est gratuit et sans engagement de votre part.',
    },
  ],
  faq: [
    {
      question: 'Le devis est-il vraiment gratuit ?',
      answer: 'Oui, le devis est gratuit et sans engagement.',
    },
    {
      question: 'Quelles informations dois-je donner ?',
      answer:
        'Le type de projet (bâtiment, voiture ou bateau), ce que vous souhaitez améliorer, les surfaces ou le modèle concerné, et vos coordonnées. Plus c’est précis, plus notre réponse l’est aussi.',
    },
    {
      question: 'Dois-je joindre des photos ?',
      answer:
        'Ce n’est pas obligatoire, mais c’est très utile : quelques photos de vos vitrages ou de votre véhicule nous permettent de mieux comprendre votre demande.',
    },
    {
      question: 'Où intervenez-vous ?',
      answer:
        'Pour la voiture, la pose se fait dans nos locaux de Vendargues. Pour le bâtiment, nous intervenons dans l’Hérault, le Gard et l’Aude, et jusqu’à toute l’Occitanie pour les chantiers d’au moins 30 m². Pour le film à cristaux liquides, nous intervenons dans toute la France.',
    },
    {
      question: 'Travaillez-vous pour les particuliers comme pour les professionnels ?',
      answer:
        'Oui. Particuliers, entreprises, commerces et gestionnaires de locaux peuvent nous solliciter, pour le bâtiment, la voiture ou le bateau.',
    },
  ],
}

assertValidContactPage(contactPage)
