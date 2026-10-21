import { vehicleAfterPhoto } from '@/features/realisations'
import { HeroEmblem } from '@/shared/ui/HeroEmblem'
import { HeroFigure } from '@/shared/ui/HeroFigure'

import type { ServicePageContent } from '../content/types'

type HeroVisualPage = Pick<ServicePageContent, 'univers'> &
  Partial<Pick<ServicePageContent, 'image'>>

export function HeroVisual({ page }: { page: HeroVisualPage }) {
  if (page.image) return <HeroFigure image={page.image} />
  if (page.univers !== 'voiture') return <HeroEmblem />
  const photo = vehicleAfterPhoto()
  return photo ? <HeroFigure image={photo} landscape /> : null
}
