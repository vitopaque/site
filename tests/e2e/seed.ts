import { readFile } from 'node:fs/promises'
import path from 'node:path'

import type { Payload, Where } from 'payload'

import type { Article } from '../../src/shared/payload-types'
import { assertAllowedTarget, assertNotProduction } from '../../src/shared/script-guards'
import { node, text } from './helpers/lexical'

const AUTHOR_NAME = 'e2e-auteur'
const ARTICLE_SLUG = 'e2e-article'
const MEDIA_ALT = 'e2e : vitres arrière teintées d’un véhicule'
const MEDIA_FILENAME = 'e2e-image.webp'
const MEDIA_SOURCE = 'public/realisations/vitres-arriere-teintees-porsche-macan.webp'

const block = (type: string, children: object[], extra: object = {}) =>
  node(type, children, { direction: 'ltr', format: '', indent: 0, ...extra })

const body = {
  root: block(
    'root',
    [
      block('paragraph', [
        text('Article de test automatisé : un film solaire limite la chaleur et l’éblouissement.'),
      ]),
      block('heading', [text('Pourquoi poser un film solaire')], { tag: 'h2' }),
      block('paragraph', [
        text('Il réduit les apports de chaleur sans assombrir fortement les pièces.'),
      ]),
    ],
    { type: 'root' },
  ),
} as unknown as Article['content']

async function findOne(payload: Payload, collection: 'authors', where: Where) {
  const { docs } = await payload.find({ collection, where, limit: 1, depth: 0, pagination: false })
  return docs[0]
}

async function ensureMedia(payload: Payload): Promise<number> {
  const { docs } = await payload.find({
    collection: 'media',
    where: { alt: { equals: MEDIA_ALT } },
    limit: 1,
    depth: 0,
    pagination: false,
  })
  if (docs[0]) return docs[0].id
  const data = await readFile(path.resolve(process.cwd(), MEDIA_SOURCE))
  const media = await payload.create({
    collection: 'media',
    data: { alt: MEDIA_ALT },
    file: { data, name: MEDIA_FILENAME, mimetype: 'image/webp', size: data.length },
  })
  return media.id
}

async function seed(payload: Payload): Promise<void> {
  const authorData = { name: AUTHOR_NAME, role: 'Poseur de films' }
  const existingAuthor = await findOne(payload, 'authors', { name: { equals: AUTHOR_NAME } })
  const author = existingAuthor
    ? await payload.update({ collection: 'authors', id: existingAuthor.id, data: authorData })
    : await payload.create({ collection: 'authors', data: authorData })

  const image = await ensureMedia(payload)
  const articleData = {
    title: 'Article de test e2e',
    slug: ARTICLE_SLUG,
    excerpt: 'Article réservé aux tests automatisés du blog.',
    content: body,
    image,
    author: author.id,
    service: 'film-solaire-batiment' as const,
    seo: {
      title: 'Article de test pour le blog',
      description:
        'Article réservé aux tests automatisés : il vérifie le parcours du blog, les balises SEO et les données structurées.',
    },
    _status: 'published' as const,
  }
  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: ARTICLE_SLUG } },
    limit: 1,
    depth: 0,
    draft: true,
    pagination: false,
  })
  if (docs[0]) {
    await payload.update({
      collection: 'articles',
      id: docs[0].id,
      data: articleData,
      draft: false,
    })
  } else {
    await payload.create({ collection: 'articles', data: articleData, draft: false })
  }
}

async function clean(payload: Payload): Promise<void> {
  await payload.delete({ collection: 'articles', where: { slug: { equals: ARTICLE_SLUG } } })
  await payload.delete({ collection: 'authors', where: { name: { equals: AUTHOR_NAME } } })
  await payload.delete({ collection: 'media', where: { alt: { equals: MEDIA_ALT } } })
}

assertAllowedTarget('Seed e2e', 'E2E_ALLOWED_DB_REF')
assertNotProduction('Seed e2e')
const { getPayload } = await import('payload')
const { default: config } = await import('../../payload.config')
const payload = await getPayload({ config })
try {
  if (process.env.E2E_SEED_MODE === 'clean') await clean(payload)
  else await seed(payload)
} finally {
  await payload.destroy()
}
