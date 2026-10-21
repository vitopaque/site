import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  getRealisation,
  listRealisationSlugs,
  RealisationPage,
  realisationMetadata,
} from '@/features/realisations'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return listRealisationSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getRealisation((await params).slug)
  return item ? realisationMetadata(item) : {}
}

export default async function Page({ params }: Props) {
  const item = getRealisation((await params).slug)
  if (!item) notFound()
  return <RealisationPage item={item} />
}
