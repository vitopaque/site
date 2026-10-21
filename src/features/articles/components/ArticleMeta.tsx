import { formatArticleDate } from '../format'
import { readingMinutes } from '../reading-time'
import type { ArticleDetail } from '../types'

export function ArticleMeta({ article }: { article: ArticleDetail }) {
  const { author, publishedAt, contentUpdatedAt } = article
  const items = [
    author ? (
      <>
        Par <span className="text-foreground font-semibold">{author.name}</span>, {author.role}
      </>
    ) : null,
    <>
      Publié le <time dateTime={publishedAt}>{formatArticleDate(publishedAt)}</time>
    </>,
    contentUpdatedAt ? (
      <>
        Mis à jour le <time dateTime={contentUpdatedAt}>{formatArticleDate(contentUpdatedAt)}</time>
      </>
    ) : null,
    <>{readingMinutes(article.content)} min de lecture</>,
  ].filter((item) => item !== null)
  return (
    <ul className="text-body-sm flex flex-wrap gap-x-6 gap-y-1 text-neutral-700">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}
