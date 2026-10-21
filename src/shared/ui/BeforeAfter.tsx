'use client'

import Image, { type StaticImageData } from 'next/image'

import { SplitSlider } from './SplitSlider'

export type BeforeAfterImage = { src: StaticImageData; alt: string }

export type BeforeAfterPair = {
  before: BeforeAfterImage
  after: BeforeAfterImage
  caption?: string
}

type Props = { pair: BeforeAfterPair }

const SIZES = '(min-width: 64rem) 66vw, 100vw'

export function BeforeAfter({ pair: { before, after, caption } }: Props) {
  return (
    <figure className="flex flex-col gap-4">
      <SplitSlider
        label="Comparer avant et après la pose"
        valueText={(split) => `Avant / Après, ${split} %`}
        className="aspect-16/9"
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          quality={75}
          sizes={SIZES}
          className="object-cover"
        />
        <div className="film-clip absolute inset-0">
          <Image
            src={after.src}
            alt={after.alt}
            fill
            quality={75}
            sizes={SIZES}
            className="object-cover"
          />
        </div>
        <span className="label-sm bg-accent-900 text-background pointer-events-none absolute top-4 left-4 px-2.5 py-1.5">
          Avant
        </span>
        <span className="label-sm bg-background text-accent-900 pointer-events-none absolute top-4 right-4 px-2.5 py-1.5">
          Après
        </span>
      </SplitSlider>
      {caption ? (
        <figcaption className="text-body-sm text-neutral-700">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
