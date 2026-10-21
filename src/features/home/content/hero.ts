import { siloOf } from '@/features/services'
import type { ProseSegment } from '@/shared/ui/Prose'

export const homeHero = {
  kicker: 'Films de prestige pour vitrages',
  subtitle:
    'Films solaires, anti-effraction, vitrage opacifiant et vitres teintées : bâtiment, voiture et bateau, posés depuis notre atelier de Vendargues.',
  intro: [
    'Aux portes de Montpellier, VIT’OPAQUE pose sur vos vitres le film qui décide de ce qui passe, et de ce qui reste dehors. Un ',
    { text: 'film solaire pour fenêtre', href: siloOf('filmSolaire').href },
    ' tempère la chaleur, un ',
    { text: 'film anti-effraction', href: siloOf('filmSecurite').href },
    ' renforce vos vitrages, et nos ',
    { text: 'vitres teintées pour voiture', href: siloOf('vitresAuto').href },
    ' apportent discrétion et confort à bord. Le tout se pose sur votre vitrage existant.',
  ],
} satisfies { kicker: string; subtitle: string; intro: ProseSegment[] }
