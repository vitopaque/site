import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPage, listSlugs, pageMetadata, PageTemplate } from '@/features/services'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return listSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getPage((await params).slug)
  return entry ? pageMetadata(entry) : {}
}

export default async function Page({ params }: Props) {
  const entry = getPage((await params).slug)
  if (!entry) notFound()
  return <PageTemplate entry={entry} />
}
