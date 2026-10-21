import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']
const DESKTOP_MIN_WIDTH = 1200
const SLUGS = [
  'film-solaire-batiment',
  'film-securite-anti-effraction',
  'film-pdlc-cristaux-liquides',
  'vitrophanie-signaletique',
  'vitres-teintees-auto',
  'vitres-teintees-bateau',
  'covering-et-flocage',
]

for (const slug of SLUGS) {
  test.describe(`/${slug}`, () => {
    test('un seul H1, des ancres uniques, aucune violation axe', async ({ page }) => {
      await page.goto(`/${slug}`)
      await expect(page.locator('h1')).toHaveCount(1)
      const ids = await page.locator('[id]').evaluateAll((nodes) => nodes.map((n) => n.id))
      expect(new Set(ids).size).toBe(ids.length)
      const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
      expect(violations).toEqual([])
    })

    test('les points clés ne sont rendus qu’une fois', async ({ page }) => {
      const response = await page.goto(`/${slug}`)
      await expect(page.locator('#points-cles-titre')).toHaveCount(1)
      const texts = await page
        .locator('section[aria-labelledby="points-cles-titre"] li p')
        .allTextContents()
      expect(texts.length).toBeGreaterThan(0)
      const html = (await response?.text())?.replace(/<script[\s\S]*?<\/script>/g, '') ?? ''
      for (const text of texts) {
        await expect(page.getByText(text, { exact: true })).toHaveCount(1)
        expect(html.split(text).length - 1).toBe(1)
      }
    })

    test('les boutons de devis présélectionnent le service', async ({ page }) => {
      await page.goto(`/${slug}`)
      const expected = `/contact-devis?service=${slug}`
      const links = page.locator('main a', { hasText: 'Devis gratuit' })
      expect(await links.count()).toBeGreaterThanOrEqual(2)
      for (const href of await links.evaluateAll((nodes) =>
        nodes.map((n) => n.getAttribute('href')),
      )) {
        expect(href).toBe(expected)
      }
      await expect(
        page.locator('section[aria-labelledby="points-cles-titre"] + div a'),
      ).toHaveAttribute('href', expected)
    })

    test('le sommaire liste les H2 du corps et chaque lien mène à une ancre', async ({
      page,
    }, testInfo) => {
      test.skip(
        (testInfo.project.use.viewport?.width ?? 0) < DESKTOP_MIN_WIDTH,
        'sommaire affiché à partir du desktop',
      )
      await page.goto(`/${slug}`)
      const outline = page.getByRole('navigation', { name: 'Sommaire de la page' })
      const links = outline.getByRole('link')
      const targets = await links.evaluateAll((nodes) =>
        nodes.map((n) => ({
          id: (n.getAttribute('href') ?? '').slice(1),
          text: n.textContent?.replace(/^\d+/, '').trim() ?? '',
        })),
      )
      expect(targets.length).toBeGreaterThan(1)
      const body = await page
        .locator('main h2[id]:not(#points-cles-titre)')
        .evaluateAll((nodes) =>
          nodes
            .filter((n) => n.closest('.max-w-prose'))
            .map((n) => ({ id: n.id, text: n.textContent?.trim() ?? '' })),
        )
      expect(targets).toEqual(body)

      await links.first().click()
      await expect(page).toHaveURL(new RegExp(`#${targets[0]?.id}$`))
      await expect(page.locator(`#${targets[0]?.id}`)).toBeInViewport()
    })

    test('la colonne reste visible au défilement', async ({ page }, testInfo) => {
      test.skip(
        (testInfo.project.use.viewport?.width ?? 0) < DESKTOP_MIN_WIDTH,
        'colonne fixe à partir du desktop',
      )
      await page.goto(`/${slug}`)
      const outline = page.getByRole('navigation', { name: 'Sommaire de la page' })
      const before = (await outline.boundingBox())?.y ?? 0
      await page.evaluate((offset) => window.scrollBy(0, offset), before + 300)
      await expect
        .poll(async () => (await outline.boundingBox())?.y ?? -1)
        .toBeGreaterThanOrEqual(0)
      await expect(outline).toBeInViewport()
    })
  })
}
