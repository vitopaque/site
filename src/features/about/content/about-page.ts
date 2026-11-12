import { siteConfig } from '@/features/site-settings'
import type { TextPageContent } from '@/shared/content/text-page'

import { assertValidAboutPage } from '../validate'

export type AboutPageContent = Omit<TextPageContent, 'sections'> & {
  story: { title: string; text: string }
  figures: { value: string; label: string }[]
  partners: { title: string; text: string }[]
  references: { title: string; text: string }
  guarantees: { title: string; text: string }[]
  cta: { kicker: string; lines: string[]; text: string; label: string }
}

export const aboutPage: AboutPageContent = {
  h1: 'À propos de VIT’OPAQUE',
  intro: `Poseur de films pour vitrages depuis 2022, à Vendargues, aux portes de Montpellier : bâtiment, automobile et bateau, avec un savoir-faire construit sur le terrain. Notre zone d’intervention : ${siteConfig.contact.address.city} pour l’automobile, ${siteConfig.serviceArea.building.departments.map((d) => d.name).join(', ')} pour le bâtiment.`,
  seo: {
    title: 'Notre savoir-faire et nos garanties',
    description:
      'VIT’OPAQUE, poseur de films pour vitrages à Vendargues, aux portes de Montpellier : parcours, formation, partenaires et garanties.',
  },
  story: {
    title: 'Un métier appris par la pratique',
    text: 'VIT’OPAQUE a été créée en mars 2022. Notre expérience vient d’abord de la pose de films solaires sur les véhicules, puis des vitrages de bâtiment, pour lesquels nous nous sommes formés chez Hexis, à Frontignan. Nous continuons de nous former sur la compatibilité entre le verre et le film, le calcul des apports de chaleur et des économies de climatisation, ou encore la luminosité : chaque film est choisi pour votre vitrage, pas l’inverse.',
  },
  figures: [
    { value: '2015', label: 'début de la pose de film automobile' },
    {
      value: '2021',
      label: 'début de la pose de film pour le bâtiment, après formation chez Hexis',
    },
    { value: '2022', label: 'création de VIT’OPAQUE, en mars' },
  ],
  partners: [
    {
      title: 'Bâtiment et automobile',
      text: 'Nous posons des films du groupe Saint-Gobain pour le bâtiment (solaires, de sécurité et anti-graffiti) et des films Hexis pour l’automobile.',
    },
    {
      title: 'Films à cristaux liquides',
      text: 'Nos films à cristaux liquides, qui passent du transparent au translucide d’un geste, viennent de Glassteinte, fabricant spécialisé.',
    },
  ],
  references: {
    title: 'Ils nous ont fait confiance',
    text: 'Nous sommes intervenus pour de grands groupes industriels et tertiaires, des établissements scolaires et des commerces locaux : le même soin, quelle que soit la taille du chantier.',
  },
  guarantees: [
    {
      title: 'Films solaires et de sécurité : 10 ans',
      text: 'La garantie couvre le décollement, les défauts du film ou de la pose, le jaunissement, le craquellement, la décoloration et le risque de casse du vitrage dû au film. Pour le film solaire, l’efficacité solaire est également garantie 10 ans.',
    },
    {
      title: 'Vitres teintées de bateau',
      text: 'Les mêmes garanties que le film solaire pour le bâtiment.',
    },
    {
      title: 'Vitrophanie et signalétique',
      text: 'De 5 à 10 ans selon l’emplacement, l’exposition et la couleur.',
    },
    {
      title: 'Covering et flocage',
      text: 'De 1 à 3 ans.',
    },
  ],
  cta: {
    kicker: 'Votre projet',
    lines: ['Parlons de vos vitrages.'],
    text: 'Décrivez-nous votre besoin : le devis est gratuit.',
    label: 'Demander un devis',
  },
}

assertValidAboutPage(aboutPage)
