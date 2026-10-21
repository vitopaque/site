import type { HubPageContent } from '../../types'
import Body from './body.mdx'

export const voitureHub: HubPageContent = {
  univers: 'voiture',
  h1: 'Films pour voiture : l’exigence d’un travail d’orfèvre',
  tagline: 'Automobile',
  intro:
    'Une voiture d’exception mérite une pose à sa hauteur. VIT’OPAQUE accueille votre véhicule dans son atelier de Vendargues, aux portes de Montpellier, pour deux savoir-faire : les vitres teintées, pour la discrétion et le confort, et le covering, pour une carrosserie qui vous ressemble.',
  seo: {
    title: 'Films pour voiture : vitres et carrosserie',
    description:
      'Vitres teintées et covering pour votre voiture : l’expertise VIT’OPAQUE, atelier à Vendargues, aux portes de Montpellier. Devis gratuit.',
  },
  sectionTitles: {
    realisations: {
      kicker: 'Réalisations de films pour voiture',
      lines: ['Des véhicules', 'au détail près.'],
    },
    lab: {
      kicker: 'Laboratoire de films pour voiture',
      lines: ['Faites glisser,', 'voyez la teinte.'],
    },
    faq: {
      kicker: 'Films pour voiture : vos questions',
      lines: ['Teinte ou covering :', 'vos questions.'],
    },
    cta: {
      kicker: 'Devis gratuit pour votre voiture',
      lines: ['Votre voiture,', 'notre atelier.'],
    },
  },
  faq: [
    {
      question: 'Vitres teintées ou covering : que choisir ?',
      answer:
        'Les vitres teintées apportent discrétion et confort à bord ; le covering change la couleur et la finition de la carrosserie, ou la marque à votre image. Les deux prestations se complètent. Nous vous conseillons selon votre projet.',
    },
    {
      question: 'Comment se passe la prise en charge de mon véhicule ?',
      answer:
        'Nous échangeons d’abord sur votre projet, puis nous vous proposons le film le plus juste. La pose a lieu à notre atelier de Vendargues, où nous vous recevons. Le devis est gratuit et sans engagement.',
    },
    {
      question: 'Peut-on marquer un véhicule d’entreprise ?',
      answer:
        'Oui. Le covering et le flocage permettent d’habiller un véhicule professionnel et de le marquer à l’image de votre entreprise : nom, logo, coordonnées.',
    },
  ],
  Body,
}
