import { formatServiceAreaFor } from '@/features/site-settings'
import type { FaqItem } from '@/shared/ui/FaqList'

export const homeFaq: FaqItem[] = [
  {
    question: 'Quel film choisir pour mes vitres ?',
    answer:
      'Cela dépend de votre besoin. Trop de chaleur et d’éblouissement : le film solaire. Un vitrage à protéger : le film anti-effraction. Une intimité à la demande : le vitrage opacifiant électrique. Une vitrine à habiller : la vitrophanie. Pour une voiture ou un bateau : les vitres teintées. Chaque prestation a sa page ; nous vous conseillons après avoir étudié votre vitrage.',
  },
  {
    question: 'Peut-on poser un film sur un vitrage existant ?',
    answer:
      'Oui, c’est le principe du film : il s’applique sur vos vitres en place, sans remplacer les fenêtres. Le type de vitrage influence le choix du film ; nous vérifions la compatibilité avant la pose.',
  },
  {
    question: 'Dans quelle zone intervenez-vous ?',
    answer: `Pour le bâtiment, nous intervenons ${formatServiceAreaFor('building')}. Pour votre voiture, nous vous recevons ${formatServiceAreaFor('automotive')}. Pour le vitrage opacifiant électrique en film PDLC, nous intervenons ${formatServiceAreaFor('liquidCrystal')}. Un doute sur votre situation ? Écrivez-nous depuis la page Contact et devis.`,
  },
]
