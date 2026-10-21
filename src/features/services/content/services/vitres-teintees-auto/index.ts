import type { ServicePageContent } from '../../types'
import Body from './body.mdx'

// alt prévu pour la photo (champ `image` à renseigner quand elle existe) :
// « Vitre latérale arrière d’une voiture équipée d’un film teinté »
export const vitresTeinteesAuto: ServicePageContent = {
  univers: 'voiture',
  slug: 'vitres-teintees-auto',
  h1: 'Film teinté voiture : discrétion, confort et élégance',
  tagline: 'Automobile',
  intro:
    'Un film teinté voiture change l’allure d’un véhicule et le confort de ceux qui l’occupent : moins d’éblouissement, plus de discrétion, une ligne plus affirmée. VIT’OPAQUE pose les vitres teintées avec le soin que l’on attend pour une voiture d’exception, dans son atelier de Vendargues, aux portes de Montpellier.',
  summary:
    'Plus de discrétion, moins d’éblouissement : une teinte posée avec le soin d’un travail d’orfèvre.',
  seo: {
    title: 'Film teinté voiture : discrétion et confort',
    description:
      'Film teinté voiture : confort et discrétion, pose soignée à l’atelier VIT’OPAQUE de Vendargues, aux portes de Montpellier. Devis gratuit.',
  },
  highlights: [
    {
      title: 'Discrétion',
      text: 'Les vitres teintées protègent l’habitacle et ce qu’il contient des regards.',
    },
    {
      title: 'Confort à bord',
      text: 'Moins d’éblouissement et un habitacle plus agréable sous le soleil.',
    },
    { title: 'Élégance', text: 'Une teinte homogène qui affine la ligne du véhicule.' },
    {
      title: 'Garanti 10 ans',
      text: 'Une garantie de 10 ans sur nos films, pose à l’atelier de Vendargues.',
    },
  ],
  faq: [
    {
      question: 'Quelle teinte choisir pour ma voiture ?',
      answer:
        'Cela dépend de l’effet recherché (discrétion, confort, esthétique), de votre véhicule et de la réglementation applicable. Nous vous présentons les options et vous conseillons en conséquence.',
    },
    {
      question: 'Les vitres teintées sont-elles autorisées ?',
      // Source : service-public.gouv.fr, fiche F19459 « Équipements obligatoires en voiture » (vérifiée le 11 juin 2026),
      // https://www.service-public.gouv.fr/particuliers/vosdroits/F19459, consultée le 21 octobre 2026 :
      // transmission régulière de la lumière d'au moins 70 % pour le pare-brise et les vitres latérales avant,
      // sauf exceptions liées à des raisons médicales. Légifrance inaccessible (403) : article du Code de la route à confirmer.
      answer:
        'Oui, dans le cadre de la loi. Le pare-brise et les vitres latérales avant doivent laisser passer au moins 70 % de la lumière, sauf exceptions liées à des raisons médicales. Nous vous invitons par ailleurs à vérifier les textes en vigueur.',
    },
    {
      question: 'Peut-on teinter la lunette arrière ?',
      answer:
        'Oui, c’est un cas courant. La pose demande de la précision autour des filaments de dégivrage et des éventuelles antennes.',
    },
    {
      question: 'Peut-on poser un film sur un toit panoramique ?',
      answer:
        'Oui, un film occultant peut équiper un toit panoramique pour atténuer la lumière directe. Parlez-nous de votre véhicule : nous vous proposons le film adapté.',
    },
    {
      question: 'Le film abîme-t-il les vitres ?',
      answer:
        'Un film posé correctement sur un vitrage en bon état ne pose pas de difficulté particulière. Nous contrôlons l’état des vitres avant la pose.',
    },
    {
      question: 'Où la pose a-t-elle lieu ?',
      answer: 'Dans nos locaux de Vendargues.',
    },
    {
      question: 'Combien coûte un film teinté pour voiture ?',
      answer:
        'De 60 à 90 € HT/m² posé (72 à 108 € TTC), selon le véhicule. Ce montant est indicatif : le devis est gratuit et sans engagement.',
    },
    {
      question: 'Quelle est la garantie ?',
      answer: 'Nos films sont garantis 10 ans.',
    },
    {
      question: 'Combien de temps faut-il attendre avant de nettoyer les vitres ?',
      answer:
        'Nous vous communiquons un délai précis à la pose, selon le film. Respectez-le avant le premier nettoyage et avant de manipuler les vitres.',
    },
    {
      question: 'Comment obtenir un devis ?',
      answer:
        'Depuis la page Contact et devis, en précisant le modèle du véhicule et les vitres concernées. Le devis est gratuit et sans engagement.',
    },
  ],
  Body,
}
