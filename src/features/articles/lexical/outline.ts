import { createHeadingIds } from '@/shared/content/heading-id.mjs'
import { lexicalTexts } from '@/shared/payload/lexical-text'
import type { OutlineHeading } from '@/shared/ui/BodyOutline'

import type { ArticleDetail } from '../types'

type Node = Parameters<typeof lexicalTexts>[0] & { tag?: string }

export type ArticleOutline = {
  headings: OutlineHeading[]
  idOf: WeakMap<object, string>
}

export function articleOutline(content: ArticleDetail['content']): ArticleOutline {
  const headingId = createHeadingIds()
  const headings: OutlineHeading[] = []
  const idOf = new WeakMap<object, string>()
  for (const node of (content?.root.children ?? []) as Node[]) {
    if (node.type !== 'heading' || node.tag !== 'h2') continue
    const text = lexicalTexts(node).join(' ').trim()
    const id = headingId(text)
    if (!id) continue
    idOf.set(node, id)
    headings.push({ id, text })
  }
  return { headings, idOf }
}
