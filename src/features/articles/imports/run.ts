import { readFile } from 'node:fs/promises'
import path from 'node:path'

import type { Payload } from 'payload'

import type { Article } from '@/shared/payload-types'
import { assertAllowedTarget, assertNotProduction } from '@/shared/script-guards'
import { markdownToLexical } from './markdown'
import { AUTHOR, articleSources, type ArticleSource } from './sources'

const LABEL = 'Import des articles'
const IMPORTS_DIR = path.resolve(process.cwd(), 'src/features/articles/imports')

function assertPreprod(): void {
  assertAllowedTarget(LABEL, 'PREPROD_DB_REF')
  assertNotProduction(LABEL)
  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    throw new Error(
      `${LABEL} refusé : BLOB_READ_WRITE_TOKEN absente (les médias iraient sur disque).`,
    )
  }
}

async function upsertAuthor(payload: Payload): Promise<number> {
  const { docs } = await payload.find({
    collection: 'authors',
    where: { name: { equals: AUTHOR.name } },
    limit: 1,
    depth: 0,
    pagination: false,
  })
  const existing = docs[0]
  if (existing) {
    await payload.update({ collection: 'authors', id: existing.id, data: AUTHOR })
    return existing.id
  }
  return (await payload.create({ collection: 'authors', data: AUTHOR })).id
}

async function upsertMedia(payload: Payload, image: NonNullable<ArticleSource['image']>) {
  const { docs } = await payload.find({
    collection: 'media',
    where: { filename: { equals: image.file } },
    limit: 1,
    depth: 0,
    pagination: false,
  })
  const existing = docs[0]
  if (existing) {
    await payload.update({ collection: 'media', id: existing.id, data: { alt: image.alt } })
    return existing.id
  }
  const data = await readFile(path.join(IMPORTS_DIR, 'images', image.file))
  const media = await payload.create({
    collection: 'media',
    data: { alt: image.alt },
    file: { data, name: image.file, mimetype: 'image/webp', size: data.length },
  })
  return media.id
}

async function upsertArticle(payload: Payload, source: ArticleSource, authorId: number) {
  const imageId = source.image ? await upsertMedia(payload, source.image) : undefined
  const markdown = await readFile(path.join(IMPORTS_DIR, `${source.slug}.md`), 'utf8')
  const content = (await markdownToLexical(
    payload.config,
    markdown,
  )) as unknown as Article['content']
  const data = {
    title: source.title,
    slug: source.slug,
    excerpt: source.excerpt,
    content,
    image: imageId,
    author: authorId,
    service: source.service,
    seo: { title: source.seoTitle, description: source.seoDescription },
  }
  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: source.slug } },
    limit: 1,
    depth: 0,
    draft: true,
    pagination: false,
  })
  const existing = docs[0]
  if (existing) {
    await payload.update({
      collection: 'articles',
      id: existing.id,
      data,
      draft: existing._status !== 'published',
    })
  } else {
    await payload.create({ collection: 'articles', data, draft: true })
  }
  console.log(`${existing ? 'Mis à jour' : 'Créé'} : ${source.slug}`)
}

assertPreprod()
const { getPayload } = await import('payload')
const { default: config } = await import('../../../../payload.config')
const payload = await getPayload({ config })
try {
  const authorId = await upsertAuthor(payload)
  for (const source of articleSources.filter(({ enabled }) => enabled)) {
    await upsertArticle(payload, source, authorId)
  }
} finally {
  await payload.destroy()
}
