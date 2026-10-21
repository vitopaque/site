import { vehicleAfterPhoto } from '@/features/realisations'
import { HeroEmblem } from '@/shared/ui/HeroEmblem'
import { HeroFigure } from '@/shared/ui/HeroFigure'

import type { ServicePageContent } from '../content/types'

export function HeroVisual({ page }: { page: ServicePageContent }) {
  if (page.image) return <HeroFigure image={page.image} />
  if (page.univers !== 'voiture') return <HeroEmblem />
  const photo = vehicleAfterPhoto()
  return photo ? <HeroFigure image={photo} landscape /> : null
}
