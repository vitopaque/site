import { expect, test } from '@playwright/test'
import { sitemapFor } from '../../src/shared/seo/sitemap'

const PATHS = ['/', '/batiment', '/film-solaire-batiment', '/contact-devis']

test.describe('sitemap.xml et robots.txt (site non indexable)', () => {
  test('sitemap.xml répond 200 en XML, sans aucune URL', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('xml')
    expect(await response.text()).not.toContain('<loc>')
  })

  test('robots.txt interdit tout et ne déclare pas de sitemap', async ({ request }) => {
    const body = await (await request.get('/robots.txt')).text()
    expect(body).toMatch(/Disallow: \//)
    expect(body).not.toMatch(/Sitemap:/i)
  })
})

test.describe('sitemapFor', () => {
  const saved = { ...process.env }
  test.afterEach(() => {
    process.env = { ...saved }
  })

  test('indexable : URLs absolues du domaine officiel, sans localhost ni slash final', () => {
    Object.assign(process.env, {
      VERCEL_ENV: 'production',
      SITE_URL: 'https://www.vitopaque.com',
    })
    const urls = sitemapFor(PATHS).map((entry) => entry.url)
    expect(urls).toEqual([
      'https://www.vitopaque.com/',
      'https://www.vitopaque.com/batiment',
      'https://www.vitopaque.com/film-solaire-batiment',
      'https://www.vitopaque.com/contact-devis',
    ])
    expect(urls.join()).not.toContain('localhost')
  })

  test('non indexable : vide', () => {
    Object.assign(process.env, { VERCEL_ENV: 'preview', SITE_URL: 'https://www.vitopaque.com' })
    expect(sitemapFor(PATHS)).toEqual([])
  })
})
