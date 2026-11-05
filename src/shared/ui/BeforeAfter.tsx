import Image, { type StaticImageData } from 'next/image'

import { BeforeAfterToggle } from './BeforeAfterToggle'

export type BeforeAfterImage = { src: StaticImageData; alt: string }

export type BeforeAfterPair = {
  before: BeforeAfterImage
  after: BeforeAfterImage
  caption?: string
  labels?: { before: string; after: string }
}

type Props = { pair: BeforeAfterPair }

const DEFAULT_LABELS = { before: 'Vitres d’origine', after: 'Vitres teintées' }

const SIZES = '(min-width: 64rem) 66vw, 100vw'

export function BeforeAfter({ pair: { before, after, caption, labels } }: Props) {
  const text = labels ?? DEFAULT_LABELS

  return (
    <figure className="flex flex-col gap-4">
      <BeforeAfterToggle
        label={`Comparer : ${text.before} et ${text.after}`}
        labels={text}
        before={
          <Image
            src={before.src}
            alt={before.alt}
            fill
            quality={75}
            sizes={SIZES}
            className="object-cover"
          />
        }
        after={
          <Image
            src={after.src}
            alt={after.alt}
            fill
            quality={75}
            sizes={SIZES}
            className="object-cover"
          />
        }
      />
      {caption ? (
        <figcaption className="text-body-sm text-neutral-700">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
