import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

import { serviceSilos } from '../../src/shared/catalog'
import { WCAG_TAGS } from './helpers/a11y'

const SERVICE_HREFS = serviceSilos.map((silo) => silo.href)

const content = (page: Page, selector: string) =>
  page.locator(selector).first().getAttribute('content')

async function jsonLdTypes(page: Page): Promise<string[]> {
  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((node) => node.textContent ?? ''))
  return blocks.map((block) => (JSON.parse(block) as { '@type': string })['@type'])
}

test.describe('blog : parcours de l’article publié e2e-article', () => {
  const path = '/conseils-expertises/e2e-article'

  test('index : un seul H1, canonique absolue', async ({ page }) => {
    await page.goto('/conseils-expertises')
    await expect(page.locator('h1')).toHaveCount(1)
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toMatch(
      /^https?:\/\/[^/]+\/conseils-expertises$/,
    )
  })

  test('article : un seul H1, titre et méta uniques, canonique absolue', async ({ page }) => {
    await page.goto('/conseils-expertises')
    const indexTitle = await page.title()
    const indexDescription = await content(page, 'meta[name="description"]')

    await page.goto(path)
    await expect(page.locator('h1')).toHaveCount(1)
    const title = await page.title()
    const description = await content(page, 'meta[name="description"]')
    expect(title.trim()).not.toBe('')
    expect(title).not.toBe(indexTitle)
    expect(description?.trim()).toBeTruthy()
    expect(description).not.toBe(indexDescription)
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toMatch(
      new RegExp(`^https?://[^/]+${path}$`),
    )
  })

  test('article : JSON-LD BlogPosting et BreadcrumbList', async ({ page }) => {
    await page.goto(path)
    const types = await jsonLdTypes(page)
    expect(types).toContain('BlogPosting')
    expect(types).toContain('BreadcrumbList')
  })

  test('article : lien vers sa page de service', async ({ page }) => {
    await page.goto(path)
    const hrefs = await page
      .locator('main a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')))
    expect(hrefs.some((href) => href && SERVICE_HREFS.includes(href))).toBe(true)
  })

  test('article : aucune violation axe (WCAG AA)', async ({ page }) => {
    await page.goto(path)
    const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
    expect(violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([])
  })

  test('toutes les images de l’article ont un alt non vide', async ({ page }) => {
    await page.goto(path)
    const images = page.locator('main img')
    expect(await images.count()).toBeGreaterThan(0)
    const alts = await images.evaluateAll((imgs) => imgs.map((img) => img.getAttribute('alt')))
    for (const alt of alts) expect(alt?.trim()).toBeTruthy()
  })
})
