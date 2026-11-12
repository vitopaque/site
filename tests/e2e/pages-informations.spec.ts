import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { sitemapFor } from '../../src/shared/seo/sitemap'
import { robotsMetadata } from '../../src/shared/seo/indexing'
import { WCAG_TAGS } from './helpers/a11y'

const LEGAL = ['/mentions-legales', '/politique-de-confidentialite']
const INFO = ['/a-propos', ...LEGAL]
const SERVICES = [
  '/film-solaire-batiment',
  '/film-securite-anti-effraction',
  '/film-pdlc-cristaux-liquides',
  '/vitrophanie-signaletique',
  '/vitres-teintees-auto',
  '/vitres-teintees-bateau',
  '/covering-et-flocage',
]
const SITE = [...INFO, '/', '/contact-devis', '/batiment', '/voiture', '/bateau', ...SERVICES]

const CLIENTS = /\b(DELL|Ligier|UXCO|Orano)\b/i
const MEDIATOR = /médiateur|médiation de la consommation/i
const FORBIDDEN_TEXT = /non déposée|\[À/
const HEADQUARTERS = /Lavérune/i
const CITY_IN_FRAME = /Montpellier|34740/i

async function meta(page: Page, selector: string, name: string) {
  return page.locator(selector).first().getAttribute(name)
}

async function jsonLdTypes(page: Page) {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()
  return blocks.flatMap((block) => {
    const json = JSON.parse(block)
    return (Array.isArray(json) ? json : (json['@graph'] ?? [json])).map(
      (item: { '@type': string }) => item['@type'],
    )
  })
}

test.describe('nouvelles pages : balises SEO', () => {
  const titles = new Map<string, string>()
  const descriptions = new Map<string, string>()

  for (const path of INFO) {
    test(`${path} : 200, un H1, titre et description uniques, canonique absolue, fil d’Ariane`, async ({
      page,
    }) => {
      expect((await page.goto(path))?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)

      const title = (await page.title()).trim()
      const description = ((await meta(page, 'meta[name="description"]', 'content')) ?? '').trim()
      expect(title).not.toBe('')
      expect(description).not.toBe('')
      expect(titles.get(title), `titre déjà utilisé par ${titles.get(title)}`).toBeUndefined()
      expect(descriptions.get(description)).toBeUndefined()
      titles.set(title, path)
      descriptions.set(description, path)

      const canonical = await meta(page, 'link[rel="canonical"]', 'href')
      expect(canonical).toMatch(new RegExp(`^https?://[^/]+${path}$`))
      expect(await jsonLdTypes(page)).toContain('BreadcrumbList')
    })
  }

  for (const path of LEGAL) {
    test(`${path} : noindex, follow`, async ({ page }) => {
      await page.goto(path)
      const robots = (await meta(page, 'meta[name="robots"]', 'content')) ?? ''
      expect(robots).toContain('noindex')
      expect(robots).toContain('follow')
      expect(robots).not.toContain('nofollow')
    })
  }

  test('/a-propos : noindex tant que le site n’est pas indexable (environnement)', async ({
    page,
  }) => {
    await page.goto('/a-propos')
    expect((await meta(page, 'meta[name="robots"]', 'content')) ?? '').toContain('noindex')
  })
})

test.describe('robots : logique d’indexation des nouvelles pages', () => {
  const saved = { ...process.env }
  test.afterEach(() => {
    process.env = { ...saved }
  })

  const seoSource = (feature: string) =>
    readFileSync(join(process.cwd(), `src/features/${feature}/seo.ts`), 'utf8')

  test('site indexable : le gabarit n’émet aucune directive, /a-propos n’en ajoute pas', () => {
    Object.assign(process.env, { VERCEL_ENV: 'production', SITE_URL: 'https://www.vitopaque.com' })
    expect(robotsMetadata()).toBeUndefined()
    expect(seoSource('about')).not.toMatch(/robots/)
  })

  test('site non indexable : le gabarit émet noindex, nofollow', () => {
    Object.assign(process.env, { VERCEL_ENV: 'preview', SITE_URL: 'https://www.vitopaque.com' })
    expect(robotsMetadata()).toEqual({ index: false, follow: false })
  })

  test('pages légales : noindex, follow fixé dans leur métadonnée', () => {
    expect(seoSource('legal')).toContain('robots: { index: false, follow: true }')
  })
})

test.describe('sitemap : nouvelles pages', () => {
  const saved = { ...process.env }
  test.afterEach(() => {
    process.env = { ...saved }
  })
  const source = readFileSync(join(process.cwd(), 'src/app/sitemap.ts'), 'utf8')

  test('/a-propos est déclaré, les pages légales ne le sont pas', () => {
    expect(source).toMatch(/ABOUT_PATH/)
    expect(readFileSync(join(process.cwd(), 'src/features/about/seo.ts'), 'utf8')).toContain(
      "ABOUT_PATH = '/a-propos'",
    )
    expect(source).not.toMatch(/legal|mentions-legales|politique-de-confidentialite/i)
  })

  test('site indexable : /a-propos est émis par sitemapFor, les pages légales sont absentes', () => {
    Object.assign(process.env, { VERCEL_ENV: 'production', SITE_URL: 'https://www.vitopaque.com' })
    const urls = sitemapFor(['/', '/a-propos']).map((entry) => entry.url)
    expect(urls).toContain('https://www.vitopaque.com/a-propos')
    expect(urls.join()).not.toMatch(/mentions-legales|politique-de-confidentialite/)
  })
})

test.describe('contenu : ce qui ne doit pas apparaître', () => {
  for (const path of SITE) {
    test(`${path} : pas de nom de client, de médiateur, de marque non déposée ni de marqueur`, async ({
      page,
    }) => {
      await page.goto(path)
      const body = (await page.locator('body').innerText()).replace(/\s+/g, ' ')
      expect(body).not.toMatch(CLIENTS)
      expect(body).not.toMatch(MEDIATOR)
      expect(body).not.toMatch(FORBIDDEN_TEXT)
    })

    test(`${path} : ville ni code postal dans H1, titre ou alt ; siège de Lavérune réservé aux pages légales`, async ({
      page,
    }) => {
      await page.goto(path)
      const h1 = await page.locator('h1').allTextContents()
      const alts = await page
        .locator('img')
        .evaluateAll((imgs) => imgs.map((i) => i.getAttribute('alt') ?? ''))
      for (const text of [await page.title(), ...h1, ...alts])
        expect(text).not.toMatch(CITY_IN_FRAME)

      const body = await page.locator('body').innerText()
      if (LEGAL.includes(path)) expect(body).toMatch(HEADQUARTERS)
      else expect(body).not.toMatch(HEADQUARTERS)
    })
  }

  test('aucun « Montpellier 34 » dans le contenu des pages de service', async ({ page }) => {
    for (const path of SERVICES) {
      await page.goto(path)
      expect(await page.locator('main').innerText(), path).not.toMatch(/Montpellier 34|34740/)
    }
  })

  test('articles d’import : aucun nom de client ni médiateur', () => {
    const dir = join(process.cwd(), 'src/features/articles/imports')
    for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
      const content = readFileSync(join(dir, file), 'utf8')
      expect(content, file).not.toMatch(CLIENTS)
      expect(content, file).not.toMatch(MEDIATOR)
    }
  })
})

test.describe('adresse de l’atelier', () => {
  test('pied de page : adresse et repère', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toContainText('202 route de Sommières')
    await expect(footer).toContainText('34740 Vendargues')
    await expect(footer).toContainText('M610, parking station Esso')
  })

  test('contact : adresse, repère, plan d’accès ; repère hors itinéraire et streetAddress', async ({
    page,
  }) => {
    await page.goto('/contact-devis')
    const main = page.locator('main')
    await expect(main).toContainText('202 route de Sommières')
    await expect(main).toContainText('M610, parking station Esso')
    await expect(page.getByRole('heading', { name: /Plan d’accès/ })).toBeVisible()
    await expect(main).toContainText('202 route de Sommières, 34740 Vendargues')

    const route = page.getByRole('link', { name: /Itinéraire/ })
    const href = decodeURIComponent((await route.getAttribute('href')) ?? '')
    expect(href).toContain('202 route de Sommières, 34740 Vendargues')
    expect(href).not.toMatch(/M610|Esso/)

    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join()
    expect(ld).toContain('"streetAddress":"202 route de Sommières"')
    expect(ld).not.toMatch(/M610|Esso/)
  })

  test('/a-propos : les 3 liens du pied de page sont présents', async ({ page }) => {
    await page.goto('/a-propos')
    for (const name of ['À propos', 'Mentions légales', 'Politique de confidentialité']) {
      await expect(page.locator('footer').getByRole('link', { name })).toBeVisible()
    }
  })
})

test.describe('accessibilité (WCAG AA) : nouvelles pages', () => {
  for (const path of INFO) {
    test(`aucune violation axe sur ${path}`, async ({ page }) => {
      await page.goto(path)
      const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
      expect(violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([])
    })

    test(`${path} : titres sans saut de niveau`, async ({ page }) => {
      await page.goto(path)
      const levels = await page
        .locator('h1, h2, h3, h4')
        .evaluateAll((els) => els.map((el) => Number(el.tagName[1])))
      expect(levels[0]).toBe(1)
      levels.slice(1).forEach((level, i) => expect(level - (levels[i] ?? 0)).toBeLessThanOrEqual(1))
    })
  }
})
