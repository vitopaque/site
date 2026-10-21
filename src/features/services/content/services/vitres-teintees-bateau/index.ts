import type { ServicePageContent } from '../../types'
import Body from './body.mdx'

// alt prévu pour la photo (champ `image` à renseigner quand elle existe) :
// « Baie vitrée d’un bateau de plaisance équipée d’un film teinté »
export const vitresTeinteesBateau: ServicePageContent = {
  univers: 'bateau',
  slug: 'vitres-teintees-bateau',
  h1: 'Vitres teintées bateau : chaleur et intimité à bord',
  tagline: 'Plaisance',
  intro:
    'Des vitres teintées bateau apportent fraîcheur, confort et intimité sans dénaturer les lignes du navire. Au mouillage comme au port, le soleil chauffe le carré, les cabines et le poste de barre, et les regards ne s’arrêtent pas aux vitres : un film teinté adapté au vitrage nautique y répond. VIT’OPAQUE le pose depuis Vendargues, aux portes de Montpellier.',
  summary:
    'Moins de chaleur, plus d’intimité à bord : un film teinté adapté au vitrage de votre bateau.',
  seo: {
    title: 'Vitres teintées bateau : chaleur et intimité',
    description:
      'Vitres teintées bateau : films teintés pour moins de chaleur et plus d’intimité à bord. Pose par VIT’OPAQUE, aux portes de Montpellier. Devis gratuit.',
  },
  sectionTitles: {
    highlights: {
      kicker: 'Vitres teintées bateau : les atouts',
      lines: ['Un bord plus frais,', 'plus intime.'],
    },
    film: { kicker: 'Le film teinté nautique', lines: ['Le film teinté', 'en un coup d’œil.'] },
    lab: {
      kicker: 'Laboratoire : film teinté sur vitrage',
      lines: ['Avant, après :', 'le vitrage du bord.'],
    },
    realisations: {
      kicker: 'Réalisations de vitres teintées pour bateaux',
      lines: ['Des bateaux', 'à l’abri des regards.'],
    },
    reviews: {
      kicker: 'Avis clients sur la pose à bord',
      lines: ['À bord,', 'leurs retours.'],
    },
    faq: {
      kicker: 'Vitres teintées bateau : vos questions',
      lines: ['Chaleur, visibilité,', 'milieu marin.'],
    },
    otherServices: {
      kicker: 'Autres prestations VIT’OPAQUE',
      lines: ['Aussi pour', 'la terre ferme.'],
    },
    guides: {
      kicker: 'Conseils pour le vitrage de bateau',
      lines: ['Bien choisir', 'sa teinte.'],
    },
    cta: {
      kicker: 'Devis gratuit de vitres teintées pour bateau',
      lines: ['Parlons de', 'votre bateau.'],
    },
  },
  highlights: [
    {
      title: 'Fraîcheur à bord',
      text: 'Moins de chaleur dans le carré et les cabines exposées au soleil.',
    },
    {
      title: 'Intimité',
      text: 'Vos espaces de vie restent à l’abri des regards, au port comme au mouillage.',
    },
    {
      title: 'Moins d’éblouissement',
      text: 'Un confort visuel plus agréable, surtout sur l’eau, où la lumière se réfléchit.',
    },
    {
      title: 'Allure soignée',
      text: 'Une teinte homogène qui s’intègre aux lignes du bateau.',
    },
  ],
  faq: [
    {
      question: 'Un film teinté réduit-il la chaleur à bord ?',
      answer:
        'Oui, il filtre une partie du rayonnement solaire qui traverse le vitrage. L’effet dépend du film retenu ; nous vous présentons les options avant de décider.',
    },
    {
      question: 'Peut-on teinter tous les vitrages d’un bateau ?',
      answer:
        'Cela dépend de la forme et de la matière du vitrage. Nous examinons chaque cas avant de proposer une solution.',
    },
    {
      question: 'La teinte gêne-t-elle la visibilité ?',
      answer:
        'Une teinte trop foncée peut réduire la visibilité, notamment de nuit. Nous choisissons avec vous une teinte compatible avec la navigation.',
    },
    {
      question: 'Le film résiste-t-il au milieu marin ?',
      answer:
        'Le milieu marin est exigeant. Nous vous indiquons ce que le film retenu peut supporter et les précautions d’entretien à respecter.',
    },
    {
      question: 'Que décrire pour obtenir un devis de vitres teintées ?',
      answer:
        'Votre bateau et la forme de ses vitrages (baies, hublots, poste de barre), depuis la page Contact et devis. Le devis est gratuit et sans engagement.',
    },
  ],
  Body,
}
