import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

import { createArticleConverters } from '../lexical/converters'
import type { ArticleOutline } from '../lexical/outline'
import type { ArticleDetail } from '../types'

type Props = { content: ArticleDetail['content']; outline: ArticleOutline }

export function ArticleBody({ content, outline }: Props) {
  if (!content) return null
  return (
    <RichText
      data={content as Parameters<typeof RichText>[0]['data']}
      converters={createArticleConverters({ idOf: outline.idOf, Link, Image })}
      disableContainer
      disableIndent
      disableTextAlign
    />
  )
}
