import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  getPublishedPage,
  listPublishedSlugs,
  pageMetadata,
  PageTemplate,
} from '@/features/services'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await listPublishedSlugs()).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPublishedPage((await params).slug)
  return page ? pageMetadata(page) : {}
}

export default async function Page({ params }: Props) {
  const page = await getPublishedPage((await params).slug)
  if (!page) notFound()
  return <PageTemplate page={page} />
}
