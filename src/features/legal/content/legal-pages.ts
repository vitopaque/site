import { siteConfig } from '@/features/site-settings'
import type { TextPageContent } from '@/shared/content/text-page'

import { assertValidLegalPages } from '../validate'

const { legal, contact } = siteConfig
const hq = legal.headquarters
const workshop = [
  contact.address.street,
  [contact.address.postalCode, contact.address.city].filter(Boolean).join(' '),
]
  .filter(Boolean)
  .join(', ')

const HOST_ADDRESS = 'Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis'

export type LegalKey = 'mentions' | 'privacy'

export const legalPages: Record<LegalKey, TextPageContent & { path: string }> = {
  mentions: {
    path: '/mentions-legales',
    h1: 'Mentions légales',
    intro: `Informations légales relatives au site vitopaque.com, édité par ${legal.companyName}.`,
    seo: {
      title: 'Mentions légales',
      description: `Mentions légales du site vitopaque.com : éditeur ${legal.companyName}, directeur de la publication, hébergeur et crédits photos.`,
    },
    sections: [
      {
        title: 'Éditeur du site',
        blocks: [
          [
            `Raison sociale : ${legal.companyName}, société par actions simplifiée`,
            `Capital social : ${legal.capital}`,
            `SIRET : ${legal.siret}`,
            `Immatriculation : RCS ${legal.rcsCity}`,
            `Siège social : ${hq.street}, ${hq.postalCode} ${hq.city}`,
            `Atelier : ${workshop}`,
            `Téléphone : ${contact.phone}`,
            ...(contact.email ? [`E-mail : ${contact.email}`] : []),
          ],
        ],
      },
      {
        title: 'Directeur de la publication',
        blocks: [`${legal.president}, président de ${legal.companyName}.`],
      },
      {
        title: 'Hébergement',
        blocks: [
          `Le site est hébergé par ${HOST_ADDRESS}. Site : vercel.com. Les fonctions du site sont exécutées dans l’Union européenne.`,
        ],
      },
      {
        title: 'Propriété intellectuelle',
        blocks: [
          'Les textes, images, vidéos, logos et éléments graphiques du site sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite.',
        ],
      },
      {
        title: 'Crédits photos',
        blocks: [
          'Les photographies et vidéos du site sont réalisées par VIT’OPAQUE. Certaines images de la partie films à cristaux liquides sont fournies par nos fournisseurs.',
        ],
      },
      {
        title: 'Responsabilité',
        blocks: [
          'Nous veillons à l’exactitude des informations publiées, sans pouvoir garantir qu’elles soient exemptes d’erreur. Les liens vers des sites tiers sont fournis à titre d’information ; nous ne maîtrisons pas leur contenu.',
        ],
      },
    ],
  },
  privacy: {
    path: '/politique-de-confidentialite',
    h1: 'Politique de confidentialité',
    intro:
      'Comment VIT’OPAQUE utilise les informations que vous nous confiez lors d’une demande de devis, et quels sont vos droits.',
    seo: {
      title: 'Politique de confidentialité',
      description:
        'Données collectées par le formulaire de devis de vitopaque.com, durée de conservation, mesure d’audience après consentement et exercice de vos droits.',
    },
    sections: [
      {
        title: 'Responsable du traitement',
        blocks: [
          `${legal.companyName}, ${hq.street}, ${hq.postalCode} ${hq.city}. Contact pour les données personnelles : ${legal.dataEmail}.`,
        ],
      },
      {
        title: 'Données collectées par le formulaire de devis',
        blocks: [
          'Lorsque vous demandez un devis, nous recueillons les informations que vous saisissez :',
          [
            'votre nom ;',
            'votre numéro de téléphone ou votre adresse e-mail ;',
            'l’univers de votre projet (bâtiment, voiture ou bateau) et le besoin concerné ;',
            'la surface approximative (bâtiment) ou la marque et le modèle (voiture, bateau), si vous les renseignez ;',
            'votre consentement, enregistré avec votre demande.',
          ],
        ],
      },
      {
        title: 'Finalité',
        blocks: [
          'Ces données servent uniquement à répondre à votre demande de devis. Elles ne sont utilisées ni pour de la prospection commerciale ni pour d’autres finalités, et ne sont pas cédées à des tiers.',
          'Les demandes de devis ne sont transmises à aucun tiers : seule VIT’OPAQUE les reçoit.',
          'Elles sont traitées par des prestataires d’hébergement, qui agissent pour notre compte : Vercel Inc. (site), Supabase (base de données, région eu-west-1, Irlande, Union européenne), Webdock (serveur d’automatisation, Danemark) et OVH (envoi des e-mails de notification).',
        ],
      },
      {
        title: 'Base légale et consentement',
        blocks: [
          'Le traitement repose sur votre consentement, que vous donnez en cochant la case prévue avant l’envoi du formulaire. Il est enregistré avec votre demande.',
        ],
      },
      {
        title: 'Durée de conservation',
        blocks: ['Les demandes de devis sont conservées 36 mois au maximum, puis supprimées.'],
      },
      {
        title: 'Mesure d’audience',
        blocks: [
          'Nous mesurons la fréquentation du site avec Google Analytics 4. Aucun traceur n’est déposé avant votre accord, que vous pouvez donner ou refuser dans le bandeau de consentement.',
          'Nous utilisons également Vercel Analytics pour des statistiques de fréquentation, qui ne dépose pas de cookie tiers.',
        ],
      },
      {
        title: 'Vos droits',
        blocks: [
          'Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition, ainsi que d’un droit de retirer votre consentement à tout moment et d’un droit à la portabilité de vos données.',
          `Pour les exercer, écrivez-nous à ${legal.dataEmail}. Vous pouvez aussi introduire une réclamation auprès de la CNIL (cnil.fr).`,
        ],
      },
    ],
  },
}

assertValidLegalPages(legalPages)
