import { formatServiceAreaFor } from '@/features/site-settings'

import type { ServicePageContent } from '../../types'
import Body from './body.mdx'

// alt prévu pour la photo (champ `image` à renseigner quand elle existe) :
// « Cloison vitrée de salle de réunion équipée d’un film PDLC, état translucide »
export const filmPdlcCristauxLiquides: ServicePageContent = {
  univers: 'batiment',
  slug: 'film-pdlc-cristaux-liquides',
  h1: 'Vitrage opacifiant électrique : l’intimité à la demande',
  tagline: 'Intimité à la demande',
  intro:
    'Un vitrage opacifiant électrique devient translucide d’une simple pression, puis redevient transparent : c’est le principe du film à cristaux liquides, ou film PDLC, que l’on cherche aussi sous le nom de vitre opaque électrique. VIT’OPAQUE l’installe sur vos vitrages existants, et propose aussi le verre opacifiant pour les projets neufs. Bureaux, salles de réunion, salles de bain, espaces d’accueil : nous intervenons depuis Vendargues, aux portes de Montpellier.',
  summary: 'D’un geste, la vitre passe du transparent au translucide, sans stores ni rideaux.',
  seo: {
    title: 'Vitrage opacifiant électrique : film PDLC, verre',
    description:
      'Vitrage opacifiant électrique : film PDLC ou verre, de transparent à translucide d’un geste. Pose par VIT’OPAQUE, aux portes de Montpellier.',
  },
  sectionTitles: {
    highlights: {
      kicker: 'Vitrage opacifiant électrique : les atouts',
      lines: ['L’intimité,', 'd’une simple pression.'],
    },
    film: { kicker: 'Le film PDLC en détail', lines: ['Le film PDLC', 'en un coup d’œil.'] },
    lab: {
      kicker: 'Laboratoire : vitre transparente ou translucide',
      lines: ['Transparent,', 'puis translucide.'],
    },
    realisations: {
      kicker: 'Réalisations de vitrages opacifiants',
      lines: ['Des cloisons', 'à la demande.'],
    },
    reviews: {
      kicker: 'Avis clients sur le vitrage opacifiant',
      lines: ['L’avis', 'de nos clients.'],
    },
    faq: {
      kicker: 'Vitrage opacifiant électrique : vos questions',
      lines: ['Comprendre le film', 'à cristaux liquides.'],
    },
    otherServices: {
      kicker: 'Autres solutions pour vos vitrages',
      lines: ['Autres façons', 'd’habiller le verre.'],
    },
    guides: {
      kicker: 'Conseils sur le vitrage opacifiant',
      lines: ['PDLC, électrochrome :', 'y voir clair.'],
    },
    cta: {
      kicker: 'Devis gratuit de vitrage opacifiant électrique',
      lines: ['Parlons de', 'vos cloisons vitrées.'],
    },
  },
  highlights: [
    {
      title: 'Intimité instantanée',
      text: 'Une commande suffit pour basculer entre vitre transparente et vitre translucide.',
    },
    {
      title: 'Lumière conservée',
      text: 'Même opacifié, le film laisse passer la lumière naturelle.',
    },
    {
      title: 'Film ou verre',
      text: 'Un film sur vitrage existant, ou un verre opacifiant feuilleté pour un projet neuf.',
    },
    {
      title: 'Écran de projection',
      text: 'À l’état translucide, la vitre peut servir de surface de projection.',
    },
  ],
  faq: [
    {
      question: 'Comment fonctionne un film PDLC ?',
      answer:
        'Le film contient des cristaux liquides pris entre deux couches de plastique. Sans courant, les cristaux sont désordonnés : ils diffusent la lumière et le film est translucide. Sous tension, ils s’alignent et le film devient transparent. Le passage de l’un à l’autre est instantané et sans pièce mobile.',
    },
    {
      question: 'Le vitrage devient-il complètement opaque ?',
      answer:
        'Non. Hors tension, il est translucide et laiteux : il laisse passer la lumière mais empêche de distinguer ce qui se trouve derrière. Sous tension, il redevient transparent.',
    },
    {
      question: 'Quelle est la consommation électrique d’un film PDLC ?',
      answer:
        'Elle est faible : selon les fiches techniques de nos fournisseurs, de l’ordre de 4 à 5 W par mètre carré. Nous vous précisons les besoins d’alimentation de votre installation dans le devis.',
    },
    {
      question: 'Comment entretenir un verre ou un film commutable ?',
      answer:
        'Avec un chiffon doux et un nettoyant doux. Évitez les produits chimiques agressifs et les matériaux abrasifs.',
    },
    {
      question: 'Peut-on l’installer sur une vitre existante ?',
      answer:
        'Oui, le film est découpé sur mesure et s’applique sur un vitrage existant, sans le remplacer. Nous vérifions le type de vitrage avant le devis.',
    },
    {
      question: 'Film ou verre opacifiant : que choisir ?',
      answer:
        'Le film s’applique sur un vitrage en place. Le verre opacifiant feuilleté convient à un projet neuf ou à un vitrage à remplacer. Nous vous conseillons selon votre chantier.',
    },
    {
      question: 'Quel est le délai pour un verre opacifiant ?',
      answer:
        'Le verre opacifiant feuilleté est fourni par notre partenaire Glassteinte, avec un délai d’environ trois mois.',
    },
    {
      question: 'Comment le contrôle-t-on ?',
      answer:
        'Selon la documentation du fabricant : interrupteur mural, télécommande, smartphone ou commande vocale, avec la possibilité de commander plusieurs vitrages ensemble. Nous choisissons la solution la plus adaptée avec vous.',
    },
    {
      question: 'Le film bloque-t-il les UV ?',
      answer:
        'Selon les fiches techniques de nos fournisseurs, la protection contre les UV est supérieure à 99 %, que le film soit transparent ou translucide.',
    },
    {
      question: 'Combien coûte un vitrage opacifiant électrique ?',
      answer:
        'Pour le film : de 450 à 1 000 € HT/m² posé (540 à 1 200 € TTC), hors frais de déplacement, selon le film choisi. Pour le verre opacifiant : à partir de 700 € HT/m² (840 € TTC). Ces montants sont indicatifs : le devis est gratuit et sans engagement.',
    },
    {
      question: 'Quelle garantie pour un vitrage opacifiant électrique ?',
      answer:
        'Le film est garanti 2 ans, les accessoires (transformateur, télécommande, câblage et autres) 1 an. Même garantie pour le verre opacifiant.',
    },
    {
      question: 'Intervenez-vous en dehors de la région ?',
      answer: `Pour le film à cristaux liquides, oui : nous intervenons ${formatServiceAreaFor('liquidCrystal')}.`,
    },
    {
      question: 'Quelles informations donner pour chiffrer mon projet ?',
      answer:
        'Décrivez les vitrages concernés, leurs dimensions et, si possible, joignez quelques photos depuis la page Contact et devis. Dites-nous aussi si vous visez un film sur vitrage existant ou un verre opacifiant. Le devis est gratuit et sans engagement.',
    },
  ],
  Body,
}
