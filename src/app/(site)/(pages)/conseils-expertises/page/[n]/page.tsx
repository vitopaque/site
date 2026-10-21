import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  ArticlesIndexPage,
  getIndexPage,
  indexMetadata,
  parsePageNumber,
} from '@/features/articles'

type Props = { params: Promise<{ n: string }> }

export const revalidate = 3600

export const dynamicParams = true

export function generateStaticParams() {
  return []
}

async function load(params: Props['params']) {
  const page = parsePageNumber((await params).n)
  if (!page) notFound()
  const data = await getIndexPage(page)
  if (!data) notFound()
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load(params)
  return indexMetadata({ page: data.page, totalDocs: data.totalDocs })
}

export default async function Page({ params }: Props) {
  return <ArticlesIndexPage data={await load(params)} />
}
