import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']
const FORBIDDEN = /Montpellier 34|34740/i
const NOT_FOUND_PATHS = ['/inexistant', '/a/b/c']

async function attr(page: Page, selector: string, name: string) {
  return page.locator(selector).first().getAttribute(name)
}

test.describe('Accueil : balises SEO', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('un seul H1', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('titre non vide', async ({ page }) => {
    expect((await page.title()).trim()).not.toBe('')
  })

  test('méta-description non vide, au plus une mention de Montpellier', async ({ page }) => {
    const description = ((await attr(page, 'meta[name="description"]', 'content')) ?? '').trim()
    expect(description).not.toBe('')
    expect(description.match(/Montpellier/gi)?.length ?? 0).toBeLessThanOrEqual(1)
  })

  test('aucun « Montpellier 34 » ni « 34740 » dans titre, H1 et alt', async ({ page }) => {
    const h1 = await page.locator('h1').allTextContents()
    const alts = await page
      .locator('img')
      .evaluateAll((imgs) => imgs.map((img) => img.getAttribute('alt') ?? ''))
    for (const text of [await page.title(), ...h1, ...alts]) {
      expect(text).not.toMatch(FORBIDDEN)
    }
  })

  test('canonique absolue sans slash final', async ({ page }) => {
    const href = await attr(page, 'link[rel="canonical"]', 'href')
    expect(href).toMatch(/^https?:\/\/[^/]+(\/.*[^/])?$/)
  })

  test('toutes les images ont un attribut alt', async ({ page }) => {
    const missing = await page.locator('img:not([alt])').count()
    expect(missing).toBe(0)
  })
})

test.describe('Accessibilité (WCAG AA)', () => {
  for (const path of ['/', '/url-inconnue']) {
    test(`aucune violation axe sur ${path}`, async ({ page }) => {
      await page.goto(path)
      const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
      expect(violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([])
    })
  }
})

test.describe('404', () => {
  for (const path of NOT_FOUND_PATHS) {
    test(`${path} : statut 404, un seul H1, noindex`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(404)
      await expect(page.locator('h1')).toHaveCount(1)
      const robots = (await attr(page, 'meta[name="robots"]', 'content')) ?? ''
      expect(robots).toContain('noindex')
    })
  }
})
