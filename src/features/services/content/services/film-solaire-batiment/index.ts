import type { ServicePageContent } from '../../types'
import Body from './body.mdx'

// alt prévu pour la photo (champ `image` à renseigner quand elle existe) :
// « Baie vitrée de bureaux équipée d’un film solaire, vue sur l’extérieur »
export const filmSolaireBatiment: ServicePageContent = {
  univers: 'batiment',
  slug: 'film-solaire-batiment',
  h1: 'Film solaire fenêtre : maîtrisez la chaleur et l’éblouissement',
  tagline: 'Confort thermique',
  intro:
    'Un film solaire fenêtre tempère la chaleur et l’éblouissement d’une baie plein sud, d’une véranda ou d’un open space sous le soleil, sans toucher à votre vitrage. VIT’OPAQUE le pose depuis Vendargues, aux portes de Montpellier, pour les bureaux, commerces, vérandas et villas.',
  summary: 'Des baies, vérandas et bureaux plus frais et plus lumineux, sans remplacer le vitrage.',
  seo: {
    title: 'Film solaire fenêtre anti-chaleur pour bâtiment',
    description:
      'Film solaire fenêtre pour baies, vérandas et bureaux : moins de chaleur et d’éblouissement. Pose par VIT’OPAQUE, aux portes de Montpellier. Devis gratuit.',
  },
  sectionTitles: {
    highlights: {
      kicker: 'Pourquoi poser un film solaire fenêtre',
      lines: ['Chaleur tempérée,', 'lumière préservée.'],
    },
    film: { kicker: 'Le film solaire en détail', lines: ['Le film solaire', 'en un coup d’œil.'] },
    lab: {
      kicker: 'Laboratoire : film solaire sur vitrage',
      lines: ['Faites glisser,', 'voyez la lumière.'],
    },
    realisations: {
      kicker: 'Réalisations de films solaires',
      lines: ['Des baies', 'qui respirent.'],
    },
    reviews: {
      kicker: 'Avis clients sur nos films solaires',
      lines: ['La parole', 'à nos clients.'],
    },
    faq: {
      kicker: 'Questions sur le film solaire fenêtre',
      lines: ['Tout savoir sur', 'le film solaire.'],
    },
    otherServices: {
      kicker: 'Autres films pour vitrage de bâtiment',
      lines: ['Un vitrage,', 'plusieurs réponses.'],
    },
    guides: {
      kicker: 'Conseils sur le film solaire',
      lines: ['Choisir son film', 'en connaissance de cause.'],
    },
    cta: {
      kicker: 'Devis gratuit de pose de film solaire',
      lines: ['Parlons de', 'vos fenêtres exposées.'],
    },
  },
  highlights: [
    {
      title: 'Moins de chaleur',
      text: 'Le film filtre une partie du rayonnement solaire avant qu’il ne s’installe dans la pièce.',
    },
    {
      title: 'Moins d’éblouissement',
      text: 'Écrans lisibles et regard à l’aise, sans fermer les stores en plein jour.',
    },
    {
      title: 'Vitrage conservé',
      text: 'Le film se pose sur vos fenêtres existantes, sans travaux lourds.',
    },
    { title: 'Garanti 10 ans', text: 'Une garantie de 10 ans sur nos films solaires.' },
  ],
  faq: [
    {
      question: 'Pourquoi installer un film solaire sur ses vitrages ?',
      answer:
        'Pour cinq bénéfices concrets. Moins de chaleur : le film filtre une partie du rayonnement solaire et rend l’intérieur plus agréable en été, tout en conservant la clarté naturelle. Moins de climatisation : une pièce moins chauffée par le soleil sollicite moins la climatisation. Plus d’intimité de jour : un film à effet miroir protège des regards. Moins d’éblouissement : les écrans deviennent plus lisibles, la vue sur l’extérieur reste claire. Un mobilier mieux protégé : le film filtre une partie des UV, qui contribuent à décolorer parquets, tapis, rideaux et meubles.',
    },
    {
      question: 'Comment choisir le film solaire idéal pour mes fenêtres ?',
      answer:
        'Quatre critères comptent : le type de vitrage, l’exposition de la pièce, le besoin d’intimité et l’esthétique du bâtiment (finition miroir, fumée ou discrète, contraintes de copropriété). Selon le vitrage, la pose se fait à l’intérieur ou à l’extérieur, et certains vitrages demandent un film précis. Nous étudions votre cas avant de vous proposer un film.',
    },
    {
      question: 'Quels sont les différents types de films solaires ?',
      answer:
        'Film anti-chaleur, film neutre ou clair (spectro-sélectif), film miroir anti-vis-à-vis, film d’isolation thermique dit « 4 saisons » et film de sécurité solaire. Chacun répond à un besoin ; nous vous les présentons pour choisir celui qui convient à votre vitrage.',
    },
    {
      question: 'Pourquoi confier la pose à un professionnel ?',
      answer:
        'Parce que la pose compte autant que le film. Sur de grandes surfaces, en hauteur ou sur un vitrage sensible au choc thermique, la méthode et le matériel font la différence. Nous vérifions la compatibilité de votre vitrage avant d’intervenir et nous posons le film vitre par vitre.',
    },
    {
      question: 'Combien de temps dure un film solaire ?',
      answer:
        'Nos films solaires sont garantis 10 ans. Nous vous détaillons ce que couvre la garantie avec le devis.',
    },
    {
      question: 'Comment entretenir des vitres équipées d’un film ?',
      answer:
        'Avec de l’eau tiède, un savon doux et un chiffon microfibre ou une raclette souple. Évitez les produits abrasifs, l’ammoniaque et les grattoirs. Nous vous remettons des consignes précises à la pose.',
    },
    {
      question: 'Un film solaire fait-il perdre de la luminosité à l’intérieur ?',
      answer:
        'Il filtre une part de la lumière, plus ou moins selon le modèle. Les films neutres, dits spectro-sélectifs, sont ceux qui préservent le mieux la clarté naturelle. Nous cherchons avec vous le bon compromis entre protection et lumière, selon la pièce et son exposition.',
    },
    {
      question:
        'Peut-on poser un film solaire sur une véranda, une fenêtre de toit ou une baie coulissante ?',
      answer:
        'Oui, ce sont des cas courants, et des surfaces très exposées à la chaleur. Le type de vitrage et l’exposition déterminent le film adapté : nous les étudions au cas par cas avant de poser.',
    },
    {
      question: 'Un film solaire protège-t-il du vis-à-vis ?',
      answer:
        'Un film à effet miroir protège des regards de jour, quand l’extérieur est plus lumineux que l’intérieur. Le soir, avec la lumière allumée, l’effet s’atténue ou s’inverse. Pour une intimité de nuit, nous vous orientons vers un autre type de film.',
    },
    {
      question: 'Le film se voit-il de l’extérieur ?',
      answer:
        'Cela dépend de la gamme retenue. Certains films restent très discrets, d’autres, comme les films miroir, modifient davantage l’aspect de la façade. Nous vous présentons les options avant de décider.',
    },
    {
      question: 'Un film solaire peut-il abîmer mon vitrage ?',
      answer:
        'Le choix du film dépend du type de vitrage. Certains vitrages, notamment des doubles vitrages ou des vitrages feuilletés, appellent un film précis pour éviter tout risque de choc thermique. Nous vérifions la compatibilité avant la pose.',
    },
    {
      question: 'Combien coûte la pose d’un film solaire ?',
      answer:
        'De 80 à 300 € HT/m² posé (96 à 360 € TTC), selon le type de vitrage, l’accessibilité et le film. Ce montant est indicatif : le devis est gratuit et sans engagement.',
    },
    {
      question: 'Où intervenez-vous ?',
      answer:
        'Dans l’Hérault, le Gard et l’Aude, et jusqu’à toute l’Occitanie pour les chantiers d’au moins 30 m².',
    },
    {
      question: 'Que préparer pour obtenir un devis de film solaire ?',
      answer:
        'Le type de lieu, le nombre de vitrages, leur exposition et quelques photos suffisent pour commencer. Envoyez-les depuis la page Contact et devis : le devis est gratuit et sans engagement.',
    },
  ],
  Body,
}
