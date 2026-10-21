import Image from 'next/image'

import { quoteHref, siloBySlug } from '@/shared/catalog'
import { universLabel } from '@/shared/payload/univers'
import { JsonLd, type Publisher } from '@/shared/seo/jsonld'
import { AsideColumn } from '@/shared/ui/AsideColumn'
import { CtaBand } from '@/shared/ui/CtaBand'
import { PageHero } from '@/shared/ui/PageHero'
import { Section } from '@/shared/ui/Section'
import { SectionHeading } from '@/shared/ui/SectionHeading'

import { toCardItem } from '../cards'
import { articleTitles } from '../content'
import { articleOutline } from '../lexical/outline'
import { relatedArticles } from '../related'
import { articleCrumbs, articleJsonLd } from '../seo'
import type { ArticleDetail } from '../types'
import { ArticleBody } from './ArticleBody'
import { ArticleCard } from './ArticleCard'
import { ArticleMeta } from './ArticleMeta'
import { LinkedService } from './LinkedService'

const RELATED_COUNT = 3

export async function ArticleDetailPage({
  article,
  publisher,
}: {
  article: ArticleDetail
  publisher: Publisher
}) {
  const outline = articleOutline(article.content)
  const related = await relatedArticles(article, RELATED_COUNT)
  const silo = siloBySlug(article.serviceSlug)
  const href = quoteHref(article.serviceSlug)
  return (
    <>
      {articleJsonLd(article, publisher).map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      <PageHero
        crumbs={articleCrumbs(article)}
        kicker={universLabel(article.univers)}
        title={article.title}
        intro={article.excerpt}
        meta={<ArticleMeta article={article} />}
      />
      {article.image ? (
        <div className="max-w-page px-margin mx-auto pb-12">
          <figure className="blueprint desktop:aspect-2/1 relative aspect-16/10">
            <Image
              src={article.image.url}
              alt={article.image.alt}
              fill
              priority
              sizes="(min-width: 90rem) 81rem, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      ) : null}
      <Section>
        <div className="desktop:grid desktop:grid-cols-12 desktop:gap-x-12">
          <div className="desktop:col-span-7 max-w-prose">
            <ArticleBody content={article.content} outline={outline} />
          </div>
          <div className="desktop:col-span-4 desktop:col-start-9 desktop:mt-0 mt-12">
            <AsideColumn
              lead={silo ? <LinkedService silo={silo} /> : null}
              headings={outline.headings}
              quoteHref={href}
            />
          </div>
        </div>
      </Section>
      {related.length > 0 ? (
        <Section labelledBy="autres-articles-titre" tone="surface">
          <div className="reveal">
            <SectionHeading id="autres-articles-titre" {...articleTitles.related} />
          </div>
          <ul className="reveal card-grid mt-12">
            {related.map((item) => (
              <li key={item.slug}>
                <ArticleCard item={toCardItem(item)} layout="grid" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      <CtaBand
        id="devis-titre"
        {...articleTitles.cta}
        text="Décrivez votre projet : nous revenons vers vous pour établir votre devis."
        cta={{ label: 'Devis gratuit', href }}
      />
    </>
  )
}
