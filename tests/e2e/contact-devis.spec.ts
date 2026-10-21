import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']

test.describe('Contact et devis', () => {
  test('un seul H1, fil d’Ariane et canonique', async ({ page }) => {
    await page.goto('/contact-devis')
    await expect(page.locator('h1')).toHaveCount(1)
    const crumbs = page.getByRole('navigation', { name: 'Fil d’Ariane' })
    await expect(crumbs.locator('[aria-current="page"]')).toHaveCount(1)
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toMatch(/\/contact-devis$/)
  })

  test('FAQ utilisable au clavier', async ({ page }) => {
    await page.goto('/contact-devis')
    const summary = page.locator('details > summary').first()
    await summary.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('details').first()).toHaveAttribute('open', '')
  })

  test('présélection par ?service=', async ({ page }) => {
    await page.goto('/contact-devis?service=vitres-teintees-auto')
    await expect(page.getByLabel('Type de besoin')).toHaveValue('vitresAuto')
    await expect(page.getByRole('radio', { name: 'Voiture' })).toBeChecked()
  })

  test('paramètre inconnu ignoré', async ({ page }) => {
    await page.goto('/contact-devis?service=inconnu')
    await expect(page.getByLabel('Type de besoin')).toHaveValue('inconnu')
    await expect(page.getByRole('radio', { name: 'Bâtiment & Pro' })).toBeChecked()
  })

  test('présélection de l’univers par ?univers=', async ({ page }) => {
    await page.goto('/contact-devis?univers=bateau')
    await expect(page.getByRole('radio', { name: 'Bateau' })).toBeChecked()
    await expect(page.getByLabel('Type de besoin')).toHaveValue('inconnu')
  })

  test('univers inconnu ignoré', async ({ page }) => {
    await page.goto('/contact-devis?univers=avion')
    await expect(page.getByRole('radio', { name: 'Bâtiment & Pro' })).toBeChecked()
  })

  test('?service= l’emporte sur ?univers=', async ({ page }) => {
    await page.goto('/contact-devis?service=vitres-teintees-auto&univers=bateau')
    await expect(page.getByRole('radio', { name: 'Voiture' })).toBeChecked()
    await expect(page.getByLabel('Type de besoin')).toHaveValue('vitresAuto')
  })

  test('aucune violation axe', async ({ page }) => {
    await page.goto('/contact-devis')
    const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
    expect(violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([])
  })
})
