import type { StaticImageData } from 'next/image'
import Image from 'next/image'

type Props = { image: { src: StaticImageData; alt: string }; landscape?: boolean }

export function HeroFigure({ image, landscape = false }: Props) {
  return (
    <figure className="blueprint">
      <div className={`duotone relative aspect-16/10 ${landscape ? '' : 'lg:aspect-4/5'}`}>
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
