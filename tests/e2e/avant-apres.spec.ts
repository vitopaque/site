import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { WCAG_TAGS } from './helpers/a11y'

const SHOTS = process.env.SHOTS_DIR

const TINTED = { before: 'Vitres d’origine', after: 'Vitres teintées' }
const PDLC = { before: 'Vitre transparente', after: 'Vitre opacifiée' }

async function checkToggle(page: Page, labels: { before: string; after: string }) {
  const group = page.getByRole('group', {
    name: `Comparer : ${labels.before} et ${labels.after}`,
  })
  await group.scrollIntoViewIfNeeded()
  const before = group.getByRole('button', { name: labels.before, exact: true })
  const after = group.getByRole('button', { name: labels.after, exact: true })
  const figure = page.locator('figure', { has: group })
  await expect(before).toHaveAttribute('aria-pressed', 'true')
  await expect(after).toHaveAttribute('aria-pressed', 'false')

  const hidden = figure.locator('[aria-hidden="true"] img')
  const visible = figure.locator('div:not([aria-hidden="true"]) > img')
  await expect(hidden).toHaveCount(1)
  await expect(visible).toHaveCount(1)
  const beforeAlt = await visible.getAttribute('alt')
  expect(beforeAlt?.trim()).toBeTruthy()
  expect(beforeAlt).not.toMatch(/montpellier/i)

  await after.click()
  await expect(after).toHaveAttribute('aria-pressed', 'true')
  await expect(before).toHaveAttribute('aria-pressed', 'false')
  const afterAlt = await visible.getAttribute('alt')
  expect(afterAlt?.trim()).toBeTruthy()
  expect(afterAlt).not.toBe(beforeAlt)

  await before.focus()
  await page.keyboard.press('Enter')
  await expect(before).toHaveAttribute('aria-pressed', 'true')
  await after.focus()
  await page.keyboard.press('Space')
  await expect(after).toHaveAttribute('aria-pressed', 'true')
  await expect(visible.getAttribute('alt')).resolves.toBe(afterAlt)
  await before.click()
  return { group, figure }
}

for (const path of ['/vitres-teintees-auto', '/voiture']) {
  test.describe(`Bascule avant/après ${path}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path)
    })

    test('deux boutons, image visible avec alt, image masquée en aria-hidden, clavier', async ({
      page,
    }, testInfo) => {
      const { figure } = await checkToggle(page, TINTED)
      if (SHOTS) {
        await figure.scrollIntoViewIfNeeded()
        await figure.screenshot({
          path: `${SHOTS}/${path.slice(1)}-${testInfo.project.name}.png`,
        })
      }
    })

    test('aucune violation axe', async ({ page }) => {
      await page.getByRole('group', { name: /^Comparer :/ }).scrollIntoViewIfNeeded()
      const { violations } = await new AxeBuilder({ page })
        .include('section:has([aria-pressed]):has(figure)')
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

test('la bascule PDLC a ses libellés, se manipule au clavier et reste sans doublon de titre', async ({
  page,
}) => {
  await page.goto('/film-pdlc-cristaux-liquides')
  await checkToggle(page, PDLC)

  const titles = await page.locator('h2').allInnerTexts()
  expect(new Set(titles).size).toBe(titles.length)
  await expect(page.locator('h1')).toHaveCount(1)
})
