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
  date: '2019-03',
  place: 'Atelier de Vendargues',
  lede: 'Une Porsche Macan noire gagne en intimité à bord grâce à un film teinté sur les vitres arrière, posé en 4 heures à l’atelier de Vendargues.',
  problem:
    'Le propriétaire de cette Porsche Macan noire souhaitait préserver l’intimité à l’intérieur du véhicule.',
  // Seuil de 70 % : service-public.gouv.fr, fiche F19459 (https://www.service-public.gouv.fr/particuliers/vosdroits/F19459),
  // comme sur la page vitres-teintees-auto : pare-brise et vitres latérales avant, au moins 70 %, sauf exceptions médicales.
  solution:
    'Nous avons teinté les vitres arrière : préparation du vitrage, découpe du film sur mesure, puis pose soignée et finition, le tout à l’atelier de Vendargues. Les vitres avant n’ont pas été touchées ; le pare-brise et les vitres latérales avant sont soumis à une transmission lumineuse d’au moins 70 %, sauf exceptions pour raisons médicales.',
  result: {
    text: 'En 4 heures, l’habitacle gagne en intimité grâce aux vitres arrière teintées. Les vitres avant sont restées telles quelles.',
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
    thumbnail: '/realisations/vitres-arriere-teintees-porsche-macan.webp',
    duration: 'PT29S',
    uploadDate: '2026-10-21',
  },
  seo: {
    title: 'Vitres arrière teintées Porsche Macan noire',
    description:
      'Vitres arrière teintées sur une Porsche Macan noire : intimité à bord, vitres avant inchangées. Pose en 4 heures à l’atelier VIT’OPAQUE de Vendargues.',
  },
}
