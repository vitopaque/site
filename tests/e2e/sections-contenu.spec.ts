import { expect, test } from '@playwright/test'

const HUBS = ['/batiment', '/voiture', '/bateau']
const SERVICES = [
  '/film-solaire-batiment',
  '/film-securite-anti-effraction',
  '/film-pdlc-cristaux-liquides',
  '/vitrophanie-signaletique',
  '/vitres-teintees-auto',
  '/vitres-teintees-bateau',
  '/covering-et-flocage',
]
const VEHICLE = ['/vitres-teintees-auto', '/vitres-teintees-bateau', '/covering-et-flocage']

for (const path of ['/', ...HUBS, ...SERVICES]) {
  test.describe(path, () => {
    test('un seul H1, aucun emplacement « À intégrer », aucune image sans alt', async ({
      page,
    }) => {
      await page.goto(path)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('body')).not.toContainText(/À intégrer|Photo provisoire/)
      expect(await page.locator('img:not([alt])').count()).toBe(0)
    })

    test('chaque section est rattachée à son titre', async ({ page }) => {
      await page.goto(path)
      const orphans = await page.locator('section[aria-labelledby]').evaluateAll((sections) =>
        sections
          .filter((section) => {
            const id = section.getAttribute('aria-labelledby') ?? ''
            return !document.getElementById(id)
          })
          .map((section) => section.getAttribute('aria-labelledby')),
      )
      expect(orphans).toEqual([])
    })
  })
}

test.describe('Accueil', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('« Manifeste » n’est plus un H2', async ({ page }) => {
    await expect(page.locator('h2', { hasText: /^Manifeste$/ })).toHaveCount(0)
  })

  test('FAQ et bandeau de garanties avant le contact, FAQPage en JSON-LD', async ({ page }) => {
    const order = await page
      .locator('section[aria-labelledby]')
      .evaluateAll((sections) => sections.map((s) => s.getAttribute('aria-labelledby')))
    expect(order.indexOf('engagements-titre')).toBeGreaterThan(order.indexOf('univers-titre'))
    expect(order.indexOf('faq-titre')).toBeGreaterThan(order.indexOf('engagements-titre'))
    expect(order.indexOf('contact-titre')).toBeGreaterThan(order.indexOf('faq-titre'))
    const types = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) => nodes.map((n) => JSON.parse(n.textContent ?? '{}')['@type']))
    expect(types).toContain('FAQPage')
  })
})

test.describe('Maillage des pages véhicule', () => {
  for (const path of VEHICLE) {
    test(`${path} : les deux autres prestations véhicule et le lien vers le hub`, async ({
      page,
    }) => {
      await page.goto(path)
      const section = page.locator('section[aria-labelledby="prestations-titre"]')
      for (const other of VEHICLE.filter((href) => href !== path)) {
        await expect(section.locator(`a[href="${other}"]`)).toBeVisible()
      }
      await expect(section.locator('a[href^="/voiture"], a[href^="/bateau"]').last()).toBeVisible()
    })
  }
})
