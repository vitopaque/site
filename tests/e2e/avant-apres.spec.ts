import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']
const SHOTS = process.env.SHOTS_DIR

for (const path of ['/vitres-teintees-auto', '/voiture']) {
  test.describe(`Curseur avant/après ${path}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path)
    })

    test('deux images avec alt, curseur accessible et utilisable au clavier', async ({
      page,
    }, testInfo) => {
      const slider = page.getByRole('slider', { name: 'Comparer avant et après la pose' })
      await slider.scrollIntoViewIfNeeded()
      await expect(slider).toHaveAttribute('aria-valuetext', 'Avant / Après, 50 %')

      const figure = page.locator('figure', { has: slider })
      await expect(figure.getByText('Avant', { exact: true })).toBeVisible()
      await expect(figure.getByText('Après', { exact: true })).toBeVisible()
      const alts = await figure
        .locator('img')
        .evaluateAll((imgs) => imgs.map((i) => i.getAttribute('alt') ?? ''))
      expect(alts).toHaveLength(2)
      for (const alt of alts) expect(alt.trim()).not.toBe('')
      expect(alts.join(' ')).not.toMatch(/montpellier/i)

      await slider.focus()
      await page.keyboard.press('ArrowRight')
      await expect(slider).toHaveValue('51')
      await expect(slider).toHaveAttribute('aria-valuetext', 'Avant / Après, 51 %')
      await page.keyboard.press('Home')
      await expect(slider).toHaveValue('2')
      await page.keyboard.press('ArrowRight')
      await expect(slider).toHaveValue('3')
      await page.keyboard.press('End')
      await expect(slider).toHaveValue('98')
      await page.keyboard.press('Home')
      await slider.fill('50')

      if (SHOTS) {
        await figure.scrollIntoViewIfNeeded()
        await figure.screenshot({
          path: `${SHOTS}/${path.slice(1)}-${testInfo.project.name}.png`,
        })
      }
    })

    test('aucune violation axe', async ({ page }) => {
      await page
        .getByRole('slider', { name: 'Comparer avant et après la pose' })
        .scrollIntoViewIfNeeded()
      const { violations } = await new AxeBuilder({ page })
        .include('section:has(input[type="range"])')
        .withTags(WCAG_TAGS)
        .analyze()
      expect(violations).toEqual([])
    })
  })
}

test('le curseur du laboratoire bâtiment reste fonctionnel', async ({ page }) => {
  await page.goto('/batiment')
  const slider = page.getByRole('slider', {
    name: 'Comparer le verre sans film et le verre avec film',
  })
  await expect(slider).toHaveAttribute('aria-valuetext', 'Film visible sur 50 % de la vitre')
  await slider.focus()
  await page.keyboard.press('ArrowRight')
  await expect(slider).toHaveAttribute('aria-valuetext', 'Film visible sur 49 % de la vitre')
  const split = await slider
    .locator('xpath=..')
    .evaluate((el) => getComputedStyle(el).getPropertyValue('--split'))
  expect(split.trim()).toBe('51%')
})
