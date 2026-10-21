import { lexicalTexts } from '@/shared/payload/lexical-text'

import type { ArticleDetail } from './types'

const WORDS_PER_MINUTE = 200

export function readingMinutes(content: ArticleDetail['content']): number {
  const text = lexicalTexts(content?.root as Parameters<typeof lexicalTexts>[0]).join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}
