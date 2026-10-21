import { siloOf } from '@/features/services'
import type { ProseSegment } from '@/shared/ui/Prose'

export const homeHero = {
  kicker: 'Films de prestige pour vitrage',
  subtitle: 'Films pour vitrages de bâtiment, de voiture et de bateau, posés à Vendargues.',
  intro: [
    'Aux portes de Montpellier, nous posons sur vos vitres le film qui décide de ce qui passe, et de ce qui reste dehors : ',
    { text: 'film solaire', href: siloOf('filmSolaire').href },
    ', ',
    { text: 'sécurité anti-effraction', href: siloOf('filmSecurite').href },
    ' ou ',
    { text: 'vitres teintées', href: siloOf('vitresAuto').href },
    '. Vous gardez la lumière.',
  ],
} satisfies { kicker: string; subtitle: string; intro: ProseSegment[] }
