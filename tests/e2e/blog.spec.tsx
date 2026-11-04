import { expect, test } from '@playwright/test'
import { renderToStaticMarkup } from 'react-dom/server'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { createArticleConverters } from '../../src/features/articles/lexical/converters'
import { articleOutline } from '../../src/features/articles/lexical/outline'
import {
  ARTICLES_PER_PAGE,
  MIN_INDEXABLE_ARTICLES,
  parsePageNumber,
} from '../../src/features/articles/paths'
import { readingMinutes } from '../../src/features/articles/reading-time'
import { articleJsonLd, blogSitemapPaths, indexMetadata } from '../../src/features/articles/seo'
import type { ArticleDetail } from '../../src/features/articles/types'
import { isIndexable } from '../../src/shared/seo/indexing'
import { sitemapFor } from '../../src/shared/seo/sitemap'
import { node, text } from './helpers/lexical'

const content = {
  root: node(
    'root',
    [
      node('paragraph', [text('Introduction.')]),
      node('heading', [text('Pourquoi poser un film ?')], { tag: 'h2' }),
      node(
        'paragraph',
        [
          text('Voir '),
          node('link', [text('la page')], { fields: { linkType: 'custom', url: '/batiment' } }),
        ],
        {},
      ),
      node('heading', [text('Pourquoi poser un film ?')], { tag: 'h2' }),
      node(
        'list',
        [
          node('listitem', [text('Premier point')], { value: 1 }),
          node('listitem', [text('Second point')], { value: 2 }),
        ],
        { tag: 'ul', listType: 'bullet' },
      ),
      {
        type: 'upload',
        version: 1,
        value: {
          url: '/api/media/file/vitre.webp',
          alt: 'Vitre avec film solaire',
          mimeType: 'image/webp',
          width: 800,
          height: 600,
        },
        fields: null,
      },
    ],
    { direction: 'ltr', format: '', indent: 0 },
  ),
} as unknown as ArticleDetail['content']

const publisher = {
  id: 'https://www.example.com/#localbusiness',
  name: 'Atelier Test',
  url: 'https://www.example.com/',
}

const article: ArticleDetail = {
  slug: 'choisir-un-film',
  title: 'Choisir un film',
  excerpt: 'Un extrait.',
  publishedAt: '2026-03-02T09:00:00.000Z',
  contentUpdatedAt: null,
  serviceSlug: 'film-solaire-batiment',
  univers: 'batiment',
  image: { url: 'https://cdn.example.com/a.webp', alt: 'Vitre', width: 10, height: 10 },
  content,
  author: { name: 'Jean Dupont', role: 'Poseur', bio: null, url: null, photo: null },
  seo: { title: 'Choisir un film', description: 'Description.' },
}

test.describe('rendu Lexical', () => {
  const outline = articleOutline(content)
  const html = renderToStaticMarkup(
    <RichText
      data={content as never}
      disableContainer
      converters={createArticleConverters({
        idOf: outline.idOf,
        Link: ({ href, className, children }) => (
          <a href={href} className={className}>
            {children}
          </a>
        ),
        // eslint-disable-next-line @next/next/no-img-element
        Image: ({ src, alt, className }) => <img src={src} alt={alt} className={className} />,
      })}
    />,
  )

  test('H2 avec identifiants uniques et marge d’ancre', () => {
    expect(html).toContain('id="pourquoi-poser-un-film"')
    expect(html).toContain('id="pourquoi-poser-un-film-2"')
    expect(html).toContain('scroll-mt-(--anchor-offset)')
  })

  test('liste, lien interne et image avec alt', () => {
    expect(html).toMatch(/<ul[^>]*><li[^>]*>Premier point<\/li>/)
    expect(html).toContain('href="/batiment"')
    expect(html).toContain('alt="Vitre avec film solaire"')
  })

  test('sommaire aligné sur les H2', () => {
    expect(articleOutline(content).headings.map((h) => h.id)).toEqual([
      'pourquoi-poser-un-film',
      'pourquoi-poser-un-film-2',
    ])
  })

  test('temps de lecture d’au moins une minute', () => {
    expect(readingMinutes(content)).toBe(1)
  })
})

test.describe('SEO des articles', () => {
  test('BlogPosting', () => {
    const [post] = articleJsonLd(article, publisher) as Record<string, unknown>[]
    expect(post).toMatchObject({
      '@type': 'BlogPosting',
      headline: 'Choisir un film',
      image: ['https://cdn.example.com/a.webp'],
      datePublished: '2026-03-02T09:00:00.000Z',
      dateModified: '2026-03-02T09:00:00.000Z',
      author: { '@type': 'Person', name: 'Jean Dupont' },
      publisher: {
        '@type': 'Organization',
        '@id': publisher.id,
        name: publisher.name,
        url: publisher.url,
      },
    })
    expect(post).not.toHaveProperty('author.url')
  })

  test('dateModified suit contentUpdatedAt', () => {
    const [post] = articleJsonLd(
      { ...article, contentUpdatedAt: '2026-04-01T10:00:00.000Z' },
      publisher,
    ) as Record<string, unknown>[]
    expect(post?.dateModified).toBe('2026-04-01T10:00:00.000Z')
  })

  test('index noindex sous 3 articles, indexable ensuite (domaine officiel)', () => {
    const saved = { ...process.env }
    Object.assign(process.env, { VERCEL_ENV: 'production', SITE_URL: 'https://www.vitopaque.com' })
    try {
      expect(indexMetadata({ page: 1, totalDocs: 2 }).robots).toEqual({
        index: false,
        follow: true,
      })
      expect(indexMetadata({ page: 1, totalDocs: 3 }).robots).toBeUndefined()
      expect(indexMetadata({ page: 2, totalDocs: 12 }).alternates?.canonical).toBe(
        'https://www.vitopaque.com/conseils-expertises/page/2',
      )
    } finally {
      process.env = saved
    }
  })

  test('sitemap : index seulement à partir de 3 articles', () => {
    const entry = (slug: string) => ({ slug, lastModified: '2026-03-02T09:00:00.000Z' })
    expect(blogSitemapPaths([entry('a'), entry('b')])).toHaveLength(2)
    const paths = blogSitemapPaths([entry('a'), entry('b'), entry('c')])
    expect(paths[0]).toMatchObject({ path: '/conseils-expertises' })
    expect(paths).toHaveLength(4)
    Object.assign(process.env, { VERCEL_ENV: 'production', SITE_URL: 'https://www.vitopaque.com' })
    try {
      expect(sitemapFor(paths)[1]).toEqual({
        url: 'https://www.vitopaque.com/conseils-expertises/a',
        lastModified: '2026-03-02T09:00:00.000Z',
      })
    } finally {
      delete process.env.VERCEL_ENV
      delete process.env.SITE_URL
    }
  })

  test('numéro de page : seules les pages 2 et suivantes sont valides', () => {
    expect(['1', '0', 'abc', '02', '-3', '2', '15'].map(parsePageNumber)).toEqual([
      null,
      null,
      null,
      null,
      null,
      2,
      15,
    ])
  })
})

test.describe('/conseils-expertises (index, 404 et pagination)', () => {
  // La page compte tous les articles publiés, e2e-article inclus (queries.ts : seul le filtre _status).
  let publishedCount = 0

  test.beforeAll(async ({ request }) => {
    const response = await request.get('/api/articles', { params: { limit: '0' } })
    publishedCount = ((await response.json()) as { totalDocs: number }).totalDocs
    expect(
      publishedCount,
      `Le test « pagination hors limites » suppose au plus ${ARTICLES_PER_PAGE} articles publiés (/page/2 en 404) ; la base en compte ${publishedCount}.`,
    ).toBeLessThanOrEqual(ARTICLES_PER_PAGE)
  })

  test('répond 200, un seul H1, indexation conforme au seuil et à l’environnement', async ({
    page,
    request,
  }) => {
    const response = await page.goto('/conseils-expertises')
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    const robots = page.locator('meta[name="robots"]')
    const sitemap = await (await request.get('/sitemap.xml')).text()
    // Le serveur de test hérite de l'environnement de ce processus : préproduction, donc non indexable.
    const indexable = isIndexable()
    if (!indexable || publishedCount < MIN_INDEXABLE_ARTICLES) {
      await expect(robots).toHaveAttribute('content', /noindex/)
      expect(sitemap).not.toContain('conseils-expertises')
    } else {
      expect((await robots.getAttribute('content').catch(() => null)) ?? '').not.toMatch(/noindex/)
      expect(sitemap).toContain('/conseils-expertises<')
    }
  })

  test('slug inconnu : 404', async ({ request }) => {
    expect((await request.get('/conseils-expertises/article-inconnu')).status()).toBe(404)
    expect((await request.get('/conseils-expertises/Slug_Invalide')).status()).toBe(404)
  })

  test('page 404 : un seul H1', async ({ page }) => {
    const response = await page.goto('/conseils-expertises/article-inconnu')
    expect(response?.status()).toBe(404)
    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('pagination hors limites : 404 ; page 1 redirigée vers l’index', async ({ request }) => {
    expect((await request.get('/conseils-expertises/page/2')).status()).toBe(404)
    expect((await request.get('/conseils-expertises/page/abc')).status()).toBe(404)
    expect((await request.get('/conseils-expertises/page')).status()).toBe(404)
    const redirect = await request.get('/conseils-expertises/page/1', { maxRedirects: 0 })
    expect(redirect.status()).toBe(301)
    expect(redirect.headers()['location']).toMatch(/\/conseils-expertises$/)
  })
})
