import type { ServicePageContent } from '../../types'
import Body from './body.mdx'

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
        'De 80 à 300 € HT/m² posé (96 à 360 € TTC), selon le type de vitrage, l’accessibilité et le film. Ce montant est indicatif : le devis est gratuit et sans engagement.',
    },
    {
      question: 'Quelle est la garantie ?',
      answer: 'Nos films de sécurité sont garantis 10 ans.',
    },
    {
      question: 'Où intervenez-vous ?',
      answer:
        'Dans l’Hérault, le Gard et l’Aude, et jusqu’à toute l’Occitanie pour les chantiers d’au moins 30 m².',
    },
    {
      question: 'Comment obtenir un devis ?',
      answer:
        'Depuis la page Contact et devis, en précisant le type de lieu, le nombre de vitrages et, si possible, quelques photos. Le devis est gratuit et sans engagement.',
    },
  ],
  Body,
}
