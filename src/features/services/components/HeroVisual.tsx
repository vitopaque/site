import type { StaticImageData } from 'next/image'

import { HeroEmblem } from '@/shared/ui/HeroEmblem'
import { HeroFigure } from '@/shared/ui/HeroFigure'

import { poseFilmTeinteVitreVoiture, yachtBaieVitreeFilmSolaire } from '../assets/hero-photos'
import type { ServicePageContent } from '../content/types'

type HeroVisualPage = Pick<ServicePageContent, 'univers'> &
  Partial<Pick<ServicePageContent, 'image'>>

type HeroImage = { src: StaticImageData; alt: string }

const UNIVERS_IMAGE: Partial<Record<ServicePageContent['univers'], HeroImage>> = {
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
  const image = UNIVERS_IMAGE[page.univers]
  return image ? <HeroFigure image={image} landscape /> : <HeroEmblem />
}
