import type { StaticImageData } from 'next/image'
import Image from 'next/image'

type Props = { image: { src: StaticImageData; alt: string } }

export function HeroFigure({ image }: Props) {
  return (
    <figure className="blueprint">
      <div className="duotone relative aspect-16/10 lg:aspect-4/5">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 64rem) 36vw, 100vw"
          className="object-cover"
        />
      </div>
    </figure>
  )
}
