import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticlesIndexPage, getIndexPage, indexMetadata } from '@/features/articles'

export const revalidate = 3600

async function load() {
  const data = await getIndexPage(1)
  if (!data) notFound()
  return data
}

export async function generateMetadata(): Promise<Metadata> {
  const { totalDocs } = await load()
  return indexMetadata({ page: 1, totalDocs })
}

export default async function Page() {
  return <ArticlesIndexPage data={await load()} />
}
