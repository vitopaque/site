import type { ServicePageContent } from '../../types'
import Body from './body.mdx'

// alt prévu pour la photo (champ `image` à renseigner quand elle existe) :
// « Vitrine de commerce habillée d’un film adhésif dépoli avec logo découpé »
export const vitrophanieSignaletique: ServicePageContent = {
  univers: 'batiment',
  slug: 'vitrophanie-signaletique',
  h1: 'Vitrophanie et signalétique : habillez vos vitrines à votre image',
  tagline: 'Image de marque',
  intro:
    'La vitrophanie transforme une vitrine : logo, motifs, dépoli, informations pratiques, jusqu’à l’habillage de vos cloisons intérieures. Une vitrine est la première chose que l’on voit de votre activité. VIT’OPAQUE pose ces films adhésifs depuis Vendargues, aux portes de Montpellier, pour les commerces, bureaux et locaux professionnels.',
  summary: 'Dépoli, motifs et signalétique : vitrines et cloisons habillées à votre image.',
  seo: {
    title: 'Vitrophanie et signalétique pour vitrines',
    description:
      'Vitrophanie, films dépolis et signalétique : habillez vitrines et cloisons à votre image. Pose soignée par VIT’OPAQUE, aux portes de Montpellier.',
  },
  sectionTitles: {
    highlights: {
      kicker: 'Vitrophanie : habiller vitrines et cloisons',
      lines: ['Votre image,', 'sur le verre.'],
    },
    film: {
      kicker: 'Films dépolis et adhésifs',
      lines: ['Le film dépoli', 'en un coup d’œil.'],
    },
    lab: {
      kicker: 'Laboratoire : film dépoli sur vitrage',
      lines: ['Faites glisser,', 'dépolissez le verre.'],
    },
    realisations: {
      kicker: 'Réalisations de vitrophanie et de signalétique',
      lines: ['Des vitrines', 'à leur image.'],
    },
    reviews: {
      kicker: 'Avis clients sur la vitrophanie',
      lines: ['Vos vitrines,', 'leurs retours.'],
    },
    faq: {
      kicker: 'Vitrophanie et signalétique : vos questions',
      lines: ['Dépoli, logo, lettrage :', 'vos questions.'],
    },
    otherServices: {
      kicker: 'Autres prestations pour vos locaux',
      lines: ['Au-delà', 'de la vitrine.'],
    },
    guides: {
      kicker: 'Conseils sur la vitrophanie',
      lines: ['Habiller le verre', 'avec méthode.'],
    },
    cta: {
      kicker: 'Devis gratuit de vitrophanie',
      lines: ['Parlons de', 'votre vitrine.'],
    },
  },
  highlights: [
    {
      title: 'Une vitrine qui parle de vous',
      text: 'Logo, couleurs et message s’affichent directement sur le verre.',
    },
    {
      title: 'Intimité sans fermer',
      text: 'Un film dépoli masque les regards tout en laissant passer la lumière.',
    },
    {
      title: 'Sur mesure',
      text: 'Découpe et motifs adaptés à vos vitrages et à votre charte graphique.',
    },
    {
      title: 'Changeable',
      text: 'Un film adhésif se renouvelle plus facilement qu’une peinture ou une gravure.',
    },
  ],
  faq: [
    {
      question: 'Quelle est la différence entre vitrophanie et film dépoli ?',
      answer:
        'Le film dépoli est une des possibilités de la vitrophanie. La vitrophanie regroupe tous les habillages adhésifs du verre : dépoli, motifs, logos, lettrage, signalétique.',
    },
    {
      question: 'Un film dépoli protège-t-il du vis-à-vis ?',
      answer:
        'Oui. Il brouille la vue à travers la vitre, de jour comme de nuit, tout en laissant passer la lumière naturelle.',
    },
    {
      question: 'Peut-on reproduire mon logo sur la vitrine ?',
      answer:
        'Oui, à partir de vos fichiers ou de votre charte graphique. Envoyez-nous votre logo avec votre demande de devis.',
    },
    {
      question: 'Le film se retire-t-il facilement ?',
      answer:
        'Un film adhésif est conçu pour pouvoir être déposé et remplacé. La facilité de dépose dépend du film et de l’ancienneté de la pose ; nous vous renseignons au moment du devis.',
    },
    {
      question: 'Un film dépoli laisse-t-il passer la lumière ?',
      answer:
        'Oui, un film dépoli préserve la lumière naturelle tout en brouillant la vue. Le niveau de transparence varie selon le modèle.',
    },
    {
      question: 'Comment entretenir une vitrine habillée d’un film ?',
      answer:
        'Avec un chiffon doux et un nettoyant doux. Évitez les produits agressifs et les matériaux abrasifs.',
    },
    {
      question: 'Que fournir pour chiffrer un projet de vitrophanie ?',
      answer:
        'Les dimensions de vos vitrages et, si possible, votre logo ou votre charte graphique, depuis la page Contact et devis. Le devis est gratuit et sans engagement.',
    },
  ],
  Body,
}
