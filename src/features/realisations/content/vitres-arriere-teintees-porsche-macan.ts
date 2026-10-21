import {
  vitresTeinteesVoitureApres,
  vitresTeinteesVoitureAvant,
} from '@/shared/assets/photos/vitres-teintees-voiture'

import type { Realisation } from '../types'

const AFTER_ALT = 'Porsche Macan noire de profil, vitres arrière teintées'

export const vitresArriereTeinteesPorscheMacan: Realisation = {
  slug: 'vitres-arriere-teintees-porsche-macan',
  title: 'Vitres arrière teintées sur une Porsche Macan noire',
  silos: ['vitres-teintees-auto'],
  date: '2026-10', // À CONFIRMER PAR HERY (format et valeur)
  place: 'Atelier de Vendargues',
  // BROUILLON À VALIDER PAR HERY
  lede: 'Une Porsche Macan noire équipée d’un film teinté sur les vitres arrière, posé à l’atelier de Vendargues.',
  // BROUILLON À VALIDER PAR HERY
  problem:
    'Le véhicule arrive avec ses vitres d’origine. La réglementation impose de laisser claires les vitres avant : le pare-brise et les vitres latérales avant doivent laisser passer au moins 70 % de la lumière.',
  // BROUILLON À VALIDER PAR HERY
  solution:
    'Un film teinté est posé sur les vitres arrière, dans notre atelier de Vendargues. Les vitres avant restent claires, conformément à la réglementation.',
  // BROUILLON À VALIDER PAR HERY
  result: {
    text: 'Les vitres arrière sont teintées et les vitres avant restent claires, conformément à la réglementation.',
  },
  cover: { src: vitresTeinteesVoitureApres, alt: AFTER_ALT },
  beforeAfter: {
    before: {
      src: vitresTeinteesVoitureAvant,
      alt: 'Porsche Macan noire de profil, vitres d’origine',
    },
    after: { src: vitresTeinteesVoitureApres, alt: AFTER_ALT },
  },
  video: {
    url: 'https://0o2mn0e2eovq20dz.public.blob.vercel-storage.com/realisations/film-teinte-vitres-arriere.mp4',
    poster: vitresTeinteesVoitureApres,
    duration: 'PT29S',
    uploadDate: '2026-10-21', // À CONFIRMER PAR HERY
  },
  // BROUILLON À VALIDER PAR HERY
  seo: {
    title: 'Vitres arrière teintées sur Porsche Macan',
    description:
      'Réalisation VIT’OPAQUE : vitres arrière teintées sur une Porsche Macan noire, vitres avant laissées claires. Pose à l’atelier de Vendargues.',
  },
}
