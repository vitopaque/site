import type { ServicePageContent } from '../../types'
import Body from './body.mdx'

// alt prévu pour la photo (champ `image` à renseigner quand elle existe) :
// « Voiture partiellement recouverte d’un film adhésif de couleur, détail du capot »
export const coveringEtFlocage: ServicePageContent = {
  univers: 'voiture',
  slug: 'covering-et-flocage',
  h1: 'Covering voiture et flocage : une carrosserie à votre image',
  tagline: 'Personnalisation',
  intro:
    'Le covering voiture change la couleur d’une carrosserie sans repeindre, affirme un style ou habille un véhicule professionnel ; le flocage la marque à votre nom. Ensemble, ils donnent à une carrosserie une seconde identité. VIT’OPAQUE les réalise dans son atelier de Vendargues, aux portes de Montpellier, avec la précision que demande un véhicule soigné.',
  summary:
    'Changez de couleur, personnalisez ou marquez votre véhicule avec un film adhésif posé sur mesure.',
  seo: {
    title: 'Covering voiture et flocage sur mesure',
    description:
      'Covering voiture et flocage : changez de couleur, personnalisez ou marquez votre véhicule. Atelier VIT’OPAQUE à Vendargues, aux portes de Montpellier.',
  },
  highlights: [
    {
      title: 'Une autre allure',
      text: 'Couleur, finition mate, satinée ou brillante : le véhicule se renouvelle sans peinture.',
    },
    {
      title: 'Partiel ou total',
      text: 'Toit, capot, rétroviseurs, bandes ou carrosserie entière, selon votre projet.',
    },
    {
      title: 'Marquage pro',
      text: 'Nom, logo et coordonnées de l’entreprise sur un véhicule professionnel.',
    },
    {
      title: 'Pose précise',
      text: 'Découpe, jonctions et raccords travaillés pour un rendu net.',
    },
  ],
  faq: [
    {
      question: 'Quelle différence entre covering et flocage ?',
      answer:
        'Le covering recouvre tout ou partie de la carrosserie d’un film de couleur ou de finition différente. Le flocage désigne ici le marquage du véhicule : lettres, logos, inscriptions.',
    },
    {
      question: 'Peut-on faire un covering partiel ?',
      answer:
        'Oui : toit, capot, rétroviseurs, bandes ou autres éléments. C’est une façon de personnaliser un véhicule avec mesure.',
    },
    {
      question: 'Le film peut-il être retiré ?',
      answer:
        'Un film adhésif est conçu pour pouvoir être déposé. Les conditions dépendent du film, de la durée écoulée et de l’état de la peinture ; nous vous renseignons au devis.',
    },
    {
      question: 'Le film protège-t-il la peinture ?',
      answer:
        'Il la recouvre et peut en protéger certains aspects, mais l’effet varie selon les films. Nous vous disons précisément ce que le produit retenu apporte.',
    },
    {
      question: 'Un changement de couleur doit-il être déclaré ?',
      answer:
        'Un changement de couleur complet peut avoir des conséquences administratives. Nous vous recommandons de vous renseigner auprès des organismes concernés avant de décider.',
    },
    {
      question: 'Comment obtenir un devis ?',
      answer:
        'Depuis la page Contact et devis, avec le modèle du véhicule et votre idée. Le devis est gratuit.',
    },
  ],
  Body,
}
