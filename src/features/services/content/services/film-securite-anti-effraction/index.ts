import type { ServicePageContent } from '../../types'
import Body, { headings } from './body.mdx'

// alt prévu pour la photo (champ `image` à renseigner quand elle existe) :
// « Vitrine de commerce équipée d’un film de sécurité transparent »
export const filmSecuriteAntiEffraction: ServicePageContent = {
  univers: 'batiment',
  slug: 'film-securite-anti-effraction',
  h1: 'Film anti-effraction vitre : un vitrage renforcé, sans le voir',
  tagline: 'Sécurité',
  intro:
    'Un film anti-effraction vitre maintient le verre en place en cas de choc et retarde l’intrusion, sans changer l’aspect de la baie ou de la vitrine. Une vitre brisée, c’est une porte ouverte et des éclats partout ; un vitrage renforcé, c’est du temps gagné. VIT’OPAQUE le pose depuis Vendargues, aux portes de Montpellier, pour les commerces, bureaux et villas.',
  summary: 'Un film transparent qui renforce vos vitrages et retient le verre en cas de choc.',
  seo: {
    title: 'Film anti-effraction vitre : un vitrage renforcé',
    description:
      'Film anti-effraction vitre : transparent, il renforce baies et vitrines et retient le verre en cas de choc. Pose par VIT’OPAQUE, près de Montpellier.',
  },
  sectionTitles: {
    highlights: {
      kicker: 'Film anti-effraction pour baie vitrée et vitrine',
      lines: ['Un vitrage renforcé,', 'une allure inchangée.'],
    },
    film: {
      kicker: 'Le film de sécurité en détail',
      lines: ['La sécurité', 'en un coup d’œil.'],
    },
    lab: {
      kicker: 'Laboratoire : film de sécurité sur vitrage',
      lines: ['Le verre, avant', 'et après le film.'],
    },
    realisations: {
      kicker: 'Réalisations de films de sécurité',
      lines: ['Vitrines et baies,', 'côté chantier.'],
    },
    reviews: {
      kicker: 'Avis clients sur nos films de sécurité',
      lines: ['Ils nous ont', 'confié leurs vitrages.'],
    },
    faq: {
      kicker: 'Film anti-effraction : vos questions',
      lines: ['Ce qu’un film', 'peut (et ne peut pas) faire.'],
    },
    otherServices: {
      kicker: 'Autres solutions pour vos vitrages',
      lines: ['Compléter', 'la protection.'],
    },
    guides: {
      kicker: 'Conseils sur la sécurité des vitrages',
      lines: ['Mieux protéger', 'vos vitres.'],
    },
    cta: {
      kicker: 'Devis gratuit de film de sécurité',
      lines: ['Sécurisons', 'vos vitrages.'],
    },
  },
  highlights: [
    {
      title: 'Verre retenu',
      text: 'En cas de choc, le verre se fissure mais reste maintenu au lieu de se projeter.',
    },
    {
      title: 'Intrusion ralentie',
      text: 'Un vitrage plus difficile à franchir décourage les tentatives rapides.',
    },
    {
      title: 'Invisible',
      text: 'Le film est transparent : l’aspect de la vitrine ou de la baie ne change pas.',
    },
    { title: 'Garanti 10 ans', text: 'Une garantie de 10 ans sur nos films de sécurité.' },
  ],
  faq: [
    {
      question: 'Un film de sécurité rend-il la vitre incassable ?',
      answer:
        'Non. Il retient le verre lorsqu’il se brise et rend le vitrage plus difficile à franchir, mais il ne le rend pas incassable. Nous vous expliquons ce que l’on peut raisonnablement en attendre pour votre configuration.',
    },
    {
      question: 'Un film anti-effraction est-il efficace sur une baie vitrée ?',
      answer:
        'Oui, les baies vitrées et les baies coulissantes figurent parmi ses usages courants. Le film retient le verre et ralentit l’intrusion ; selon le projet, sa fixation au cadre peut renforcer l’ensemble. Nous l’étudions avec vous.',
    },
    {
      question: 'Le film change-t-il l’aspect de mes vitrages ?',
      answer:
        'Un film de sécurité est transparent : il préserve la lumière et la vue. Dans la plupart des cas, il se remarque à peine.',
    },
    {
      question: 'Peut-on le poser sur n’importe quel vitrage ?',
      answer:
        'Le type de vitrage, son épaisseur et son cadre influencent le choix du film et la façon de le poser. Nous les examinons avant de proposer une solution.',
    },
    {
      question: 'Le film protège-t-il aussi des rayures et des graffitis ?',
      answer:
        'Certains films sont conçus pour protéger la surface du vitrage. Dites-nous si c’est un enjeu pour vous, nous orienterons le choix.',
    },
    {
      question: 'Combien coûte un film de sécurité ?',
      answer:
        'De 80 à 300 € HT/m² posé (96 à 360 € TTC), selon le type de vitrage, l’accessibilité et le film. Ce montant est indicatif : le devis est gratuit et sans engagement.',
    },
    {
      question: 'Quelle garantie sur un film de sécurité ?',
      answer:
        'Nos films de sécurité sont garantis 10 ans. Nous vous détaillons ce que couvre la garantie avec le devis.',
    },
    {
      question: 'Que faut-il pour chiffrer la protection de mes vitrages ?',
      answer:
        'Indiquez les vitrages les plus exposés (vitrine, baie, porte vitrée), leur nombre et, si possible, quelques photos depuis la page Contact et devis. Le devis est gratuit et sans engagement.',
    },
  ],
  headings,
  Body,
}
