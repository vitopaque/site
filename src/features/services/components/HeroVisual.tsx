import type { StaticImageData } from 'next/image'

import { HeroFigure } from '@/shared/ui/HeroFigure'

import {
  bureauFilmSolaireAvantApres,
  poseFilmTeinteVitreVoiture,
  yachtBaieVitreeFilmSolaire,
} from '../assets/hero-photos'
import type { ServicePageContent } from '../content/types'

type HeroVisualPage = Pick<ServicePageContent, 'univers'> &
  Partial<Pick<ServicePageContent, 'image'>>

type HeroImage = { src: StaticImageData; alt: string }

const UNIVERS_IMAGE: Record<ServicePageContent['univers'], HeroImage> = {
  batiment: {
    src: bureauFilmSolaireAvantApres,
    alt: 'Bureau avant et après la pose d’un film solaire : stores fermés d’un côté, vue dégagée de l’autre',
  },
  voiture: {
    src: poseFilmTeinteVitreVoiture,
    alt: 'Pose d’un film teinté sur une vitre de voiture à la raclette, en atelier',
  },
  bateau: {
    src: yachtBaieVitreeFilmSolaire,
    alt: 'Yacht à quai au coucher du soleil, baie vitrée du salon protégée par un film',
  },
}

export function HeroVisual({ page }: { page: HeroVisualPage }) {
  if (page.image) return <HeroFigure image={page.image} landscape />
  return <HeroFigure image={UNIVERS_IMAGE[page.univers]} landscape />
}
