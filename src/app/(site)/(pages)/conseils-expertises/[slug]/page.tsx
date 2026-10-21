import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  articleMetadata,
  ArticleDetailPage,
  articleSlugRule,
  getPublishedArticle,
  publishedArticleSlugs,
} from '@/features/articles'
import { localBusinessId, siteConfig } from '@/features/site-settings'
import { absoluteUrl } from '@/shared/seo/metadata'

const publisher = { id: localBusinessId(), name: siteConfig.name, url: absoluteUrl('/') }

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 3600

export const dynamicParams = true

export async function generateStaticParams() {
  return (await publishedArticleSlugs()).map(({ slug }) => ({ slug }))
}

async function load(params: Props['params']) {
  const { slug } = await params
  if (articleSlugRule(slug) !== true) notFound()
  const article = await getPublishedArticle(slug)
  if (!article) notFound()
  return article
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return articleMetadata(await load(params))
}

export default async function Page({ params }: Props) {
  return <ArticleDetailPage article={await load(params)} publisher={publisher} />
}
