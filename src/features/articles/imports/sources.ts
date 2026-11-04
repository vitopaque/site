import type { Article } from '@/shared/payload-types'

export type ArticleSource = {
  enabled: boolean
  slug: string
  title: string
  excerpt: string
  service: Article['service']
  seoTitle: string
  seoDescription: string
  image: { file: string; alt: string } | null
}

export const AUTHOR = { name: 'Magalie Toader', role: 'Équipe VIT’OPAQUE' }

export const articleSources: readonly ArticleSource[] = [
  {
    enabled: true,
    slug: 'vitre-teintee-loi',
    title: 'Vitres teintées : que dit la loi sur les vitres avant ?',
    excerpt:
      'Quelles vitres peut-on teinter, et jusqu’où ? Ce que prévoit la réglementation pour le pare-brise, les vitres avant et les vitres arrière, et comment rester en règle.',
    service: 'vitres-teintees-auto',
    seoTitle: 'Vitre teintée loi : ce qui est autorisé à l’avant',
    seoDescription:
      'Vitre teintée loi : ce que la réglementation autorise à l’avant comme à l’arrière, et comment rester en règle. Conseils VIT’OPAQUE, près de Montpellier.',
    image: {
      file: 'vitres-teintees-bmw-x3.webp',
      alt: 'BMW X3 blanc dont les vitres arrière sont teintées et les vitres avant restées claires',
    },
  },
  {
    enabled: true,
    slug: 'choisir-film-solaire-fenetre',
    title: 'Quel film solaire choisir pour ses fenêtres ?',
    excerpt:
      'Type de vitrage, exposition, intimité, esthétique : les quatre critères pour choisir un film solaire, et les grandes familles de films pour trouver celui qui vous convient.',
    service: 'film-solaire-batiment',
    seoTitle: 'Quel film solaire choisir : types et critères',
    seoDescription:
      'Quel film solaire choisir ? Types de films, exposition, vitrage et intimité : les critères pour décider. Conseils VIT’OPAQUE, près de Montpellier.',
    image: {
      file: 'film-solaire-villa.webp',
      alt: 'Villa contemporaine dont les grandes baies de l’étage sont équipées d’un film solaire à effet miroir',
    },
  },
  {
    enabled: true,
    slug: 'film-anti-graffiti-vitrine',
    title: 'Film anti-graffiti : comment protéger une vitrine des tags et du vandalisme ?',
    excerpt:
      'Tags, gravures, rayures : le film anti-graffiti encaisse l’agression à la place du verre. Principe, atouts et conseils de pose pour protéger la vitrine de votre commerce.',
    service: 'film-securite-anti-effraction',
    seoTitle: 'Film anti-graffiti vitrine : tags et rayures évités',
    seoDescription:
      'Tags, gravures, rayures : le film anti-graffiti protège votre vitrine et se remplace sans changer le vitrage. Conseils VIT’OPAQUE, près de Montpellier.',
    image: {
      file: 'film-anti-graffiti-vitrine.webp',
      alt: 'Film anti-graffiti transparent couvert de tags, décollé d’une vitrine de boutique',
    },
  },
]
