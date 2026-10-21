import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']
const DESKTOP_MIN_WIDTH = 1200
const AA_TEXT_RATIO = 4.5
const PAGES = ['/', '/vitres-teintees-auto']

const isDesktop = (width?: number) => (width ?? 0) >= DESKTOP_MIN_WIDTH

const headerBox = async (page: Page) => {
  const box = await page.locator('body > header').boundingBox()
  if (!box) throw new Error('en-tête introuvable')
  return box
}

const scrollDown = async (page: Page) => {
  await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000)
}

const luminance = ([r, g, b]: number[]) => {
  const [lr, lg, lb] = [r, g, b].map((c) => {
    const s = (c ?? 0) / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * (lr ?? 0) + 0.7152 * (lg ?? 0) + 0.0722 * (lb ?? 0)
}

const rgbOf = (css: string) => (css.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number)

test.describe('en-tête fixe', () => {
  for (const path of PAGES) {
    test(`${path} : l’en-tête reste visible après défilement`, async ({ page }) => {
      await page.goto(path)
      await scrollDown(page)
      const box = await headerBox(page)
      expect(box.y).toBe(0)
      await expect(page.locator('body > header')).toBeInViewport({ ratio: 1 })
    })

    test(`${path} : aucune violation axe, en haut puis après défilement`, async ({ page }) => {
      await page.goto(path)
      expect((await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()).violations).toEqual([])
      await scrollDown(page)
      expect((await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()).violations).toEqual([])
    })
  }

  test('le lien Accueil est présent et mène à /', async ({ page }, testInfo) => {
    await page.goto('/batiment')
    if (isDesktop(testInfo.project.use.viewport?.width)) {
      const nav = page.getByRole('navigation', { name: 'Navigation principale' })
      await expect(nav.getByRole('link').first()).toHaveText('Accueil')
      await nav.getByRole('link', { name: 'Accueil' }).click()
    } else {
      await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
      const menu = page.locator('#menu-mobile')
      await expect(menu.getByRole('link').first()).toHaveText('Accueil')
      await menu.getByRole('link', { name: 'Accueil' }).click()
    }
    await expect(page).toHaveURL(/\/$/)
  })

  test('le menu mobile reste utilisable après défilement', async ({ page }, testInfo) => {
    test.skip(isDesktop(testInfo.project.use.viewport?.width), 'menu mobile sous le desktop')
    await page.goto('/vitres-teintees-auto')
    await scrollDown(page)
    await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
    await expect(
      page.locator('#menu-mobile').getByRole('link', { name: 'Accueil' }),
    ).toBeInViewport()
  })

  test.describe('ancres du sommaire', () => {
    const PAGE = '/vitres-teintees-auto'
    const STABLE_FRAMES = 10

    const scrollSettled = (page: Page) =>
      page.evaluate(
        (frames) =>
          new Promise<void>((resolve) => {
            let last = window.scrollY
            let stable = 0
            const tick = () => {
              stable = window.scrollY === last ? stable + 1 : 0
              last = window.scrollY
              if (stable >= frames) resolve()
              else requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }),
        STABLE_FRAMES,
      )

    const expectH2BelowHeader = async (page: Page, id: string) => {
      await scrollSettled(page)
      const { height } = await headerBox(page)
      const h2 = page.locator(`#${id}`)
      expect((await h2.boundingBox())?.y ?? -1).toBeGreaterThanOrEqual(height)
      expect(await h2.evaluate((node) => getComputedStyle(node).scrollMarginTop)).not.toBe('0px')
    }

    const h2Ids = async (page: Page) => {
      const ids = await page
        .locator('.max-w-prose h2[id]')
        .evaluateAll((nodes) => nodes.map((n) => n.id))
      expect(ids.length).toBeGreaterThan(2)
      return ids
    }

    test('un clic sur le sommaire place le H2 sous l’en-tête', async ({ page }, testInfo) => {
      test.skip(!isDesktop(testInfo.project.use.viewport?.width), 'sommaire masqué sous le desktop')
      await page.goto(PAGE)
      const id = (await h2Ids(page))[2] ?? ''
      await page
        .getByRole('navigation', { name: 'Sommaire de la page' })
        .locator(`a[href="#${id}"]`)
        .click()
      await expect(page).toHaveURL(new RegExp(`#${id}$`))
      await expectH2BelowHeader(page, id)
    })

    test('une URL avec ancre place le H2 sous l’en-tête', async ({ page }) => {
      await page.goto(PAGE)
      const id = (await h2Ids(page))[2] ?? ''
      await page.goto(`${PAGE}#${id}`)
      await expectH2BelowHeader(page, id)
    })
  })

  test('le MDX applique puces, numéros et espacement des H3', async ({ page }) => {
    await page.goto('/vitres-teintees-auto')
    const lists = page.locator('.max-w-prose :is(ul, ol)')
    expect(await lists.count()).toBeGreaterThan(0)
    for (const list of await lists.all()) {
      expect(await list.evaluate((node) => getComputedStyle(node).listStyleType)).not.toBe('none')
    }
    const h3s = page.locator('.max-w-prose h3')
    expect(await h3s.count()).toBeGreaterThan(1)
    expect(
      await h3s.nth(1).evaluate((node) => parseFloat(getComputedStyle(node).marginTop)),
    ).toBeGreaterThan(0)
  })

  test('accueil : en-tête plein après défilement, texte lisible', async ({ page }) => {
    await page.goto('/')
    await scrollDown(page)
    const header = page.locator('body > header')
    await expect
      .poll(() => header.evaluate((node) => getComputedStyle(node).backgroundColor))
      .toBe('rgb(29, 45, 61)')
    const colors = await page.evaluate(() => {
      const header = document.querySelector('body > header')
      if (!header) throw new Error('en-tête introuvable')
      const bg = getComputedStyle(header).backgroundColor
      const texts = [...header.querySelectorAll('a, span')]
        .filter((n) => n.checkVisibility() && n.textContent?.trim())
        .map((n) => getComputedStyle(n).color)
      return { bg, texts }
    })
    expect(colors.texts.length).toBeGreaterThan(0)
    const bgLum = luminance(rgbOf(colors.bg))
    for (const text of colors.texts) {
      const textLum = luminance(rgbOf(text))
      const ratio = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05)
      expect(ratio).toBeGreaterThanOrEqual(AA_TEXT_RATIO)
    }
  })

  test('le lien d’évitement apparaît au focus, au-dessus de l’en-tête', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Aller au contenu' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeInViewport()
    const onTop = await skip.evaluate((node) => {
      const { x, y } = node.getBoundingClientRect()
      return document.elementFromPoint(x + 2, y + 2) === node
    })
    expect(onTop).toBe(true)
  })
})
