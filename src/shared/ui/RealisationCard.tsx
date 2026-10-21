import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'

export type RealisationItem = {
  id: string
  title: string
  film: string
  href: string
  image: { src: StaticImageData; alt: string }
}

const LAYOUTS = {
  card: { ratio: 'aspect-4/5', sizes: '(min-width: 64rem) 30vw, 100vw' },
  large: { ratio: 'aspect-16/10', sizes: '(min-width: 64rem) 66vw, 100vw' },
} as const

type Props = { item: RealisationItem; layout?: keyof typeof LAYOUTS }

export function RealisationCard({ item, layout = 'card' }: Props) {
  const { ratio, sizes } = LAYOUTS[layout]
  return (
    <figure className="blueprint relative flex flex-col">
      <div className={`relative ${ratio}`}>
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <figcaption className="text-body-sm flex justify-between gap-4 px-4 py-3.5">
        <span className="font-heading text-body-lg uppercase">
          <Link href={item.href} className="hover:text-accent-700 after:absolute after:inset-0">
            {item.title}
          </Link>
        </span>
        <span className="text-accent-700">{item.film}</span>
      </figcaption>
    </figure>
  )
}
