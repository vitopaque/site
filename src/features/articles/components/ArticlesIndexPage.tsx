import { quoteHref } from '@/shared/catalog'
import { breadcrumbList, JsonLd } from '@/shared/seo/jsonld'
import { CtaBand } from '@/shared/ui/CtaBand'
import { PageHero } from '@/shared/ui/PageHero'
import { Section } from '@/shared/ui/Section'

import { toCardItem } from '../cards'
import { articleTitles, listing } from '../content'
import { MIN_INDEXABLE_ARTICLES } from '../paths'
import { indexCrumbs } from '../seo'
import type { ArticlePage } from '../types'
import { ArticleCard } from './ArticleCard'
import { EmptyState } from './EmptyState'
import { Pagination } from './Pagination'

export function ArticlesIndexPage({ data }: { data: ArticlePage }) {
  const { items, page, totalPages, totalDocs } = data
  const crumbs = indexCrumbs(page)
  const grid = totalDocs >= MIN_INDEXABLE_ARTICLES
  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <PageHero crumbs={crumbs} kicker={listing.tagline} title={listing.h1} intro={listing.intro} />
      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <Section>
          <ul className={grid ? 'reveal card-grid' : 'flex flex-col gap-7'}>
            {items.map((article) => (
              <li key={article.slug}>
                <ArticleCard item={toCardItem(article)} layout={grid ? 'grid' : 'wide'} as="h2" />
              </li>
            ))}
          </ul>
          <Pagination page={page} totalPages={totalPages} />
        </Section>
      )}
      <CtaBand
        id="devis-titre"
        {...articleTitles.cta}
        text="Décrivez votre projet : nous revenons vers vous pour établir votre devis."
        cta={{ label: 'Devis gratuit', href: quoteHref() }}
      />
    </>
  )
}
