import Image from 'next/image'
import Link from 'next/link'

import { formatArticleDate } from '../format'
import type { ArticleCardItem, Guide } from '../types'

const LAYOUTS = {
  grid: {
    root: 'flex-col',
    image: 'aspect-16/10',
    sizes: '(min-width: 75rem) 30vw, (min-width: 40rem) 45vw, 100vw',
  },
  wide: {
    root: 'desktop:flex-row flex-col',
    image: 'desktop:aspect-auto desktop:w-5/12 desktop:shrink-0 aspect-16/10',
    sizes: '(min-width: 75rem) 40vw, 100vw',
  },
  text: { root: 'flex-col', image: '', sizes: '' },
} as const

type Props = {
  item: Guide | ArticleCardItem
  layout: keyof typeof LAYOUTS
  as?: 'h2' | 'h3'
}

export function ArticleCard({ item, layout, as: Heading = 'h3' }: Props) {
  const { root, image: imageClass, sizes } = LAYOUTS[layout]
  const image = layout !== 'text' && 'image' in item ? item.image : null
  return (
    <article className={`blueprint flex h-full ${root}`}>
      {image ? (
        <div className={`relative ${imageClass}`}>
          <Image src={image.url} alt={image.alt} fill sizes={sizes} className="object-cover" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="label-caps text-accent-700">{item.category}</p>
          <time dateTime={item.publishedAt} className="text-body-sm text-neutral-700">
            {formatArticleDate(item.publishedAt)}
          </time>
        </div>
        <Heading className="text-headline-sm uppercase">
          <Link href={item.href} className="hover:text-accent-700 after:absolute after:inset-0">
            {item.title}
          </Link>
        </Heading>
        <p className="text-neutral-700">{item.excerpt}</p>
      </div>
    </article>
  )
}
