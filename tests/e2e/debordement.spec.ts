import { expect, test } from '@playwright/test'

const PATHS = [
  '/',
  '/batiment',
  '/voiture',
  '/bateau',
  '/film-solaire-batiment',
  '/film-securite-anti-effraction',
  '/film-pdlc-cristaux-liquides',
  '/vitrophanie-signaletique',
  '/vitres-teintees-auto',
  '/vitres-teintees-bateau',
  '/covering-et-flocage',
  '/a-propos',
  '/contact-devis',
  '/realisations',
  '/realisations/vitres-arriere-teintees-porsche-macan',
]
const SHOTS = process.env.SHOTS_DIR
const SHOT_PATHS = new Set([
  '/voiture',
  '/vitres-teintees-auto',
  '/realisations/vitres-arriere-teintees-porsche-macan',
  '/batiment',
])

for (const path of PATHS) {
  test(`${path} : aucun débordement horizontal ni titre coupé`, async ({ page }, testInfo) => {
    await page.goto(path)
    const overflow = await page.evaluate(() => {
      const viewport = document.documentElement.clientWidth
      const wide = [...document.body.querySelectorAll<HTMLElement>('*')]
        .filter((el) => el.getBoundingClientRect().right > viewport + 1)
        .filter((el) => !el.closest('[aria-hidden="true"], .overflow-hidden, .overflow-x-clip'))
        .map((el) => `${el.tagName.toLowerCase()}.${el.className}`)
      const headings = [...document.querySelectorAll<HTMLElement>('h1, h2, h3')]
        .filter((el) => !el.classList.contains('sr-only') && el.scrollWidth > el.clientWidth + 1)
        .map((el) => el.textContent)
      return { scroll: document.documentElement.scrollWidth - viewport, wide, headings }
    })
    expect(overflow.scroll).toBeLessThanOrEqual(0)
    expect(overflow.headings).toEqual([])
    expect(overflow.wide).toEqual([])

    if (SHOTS && SHOT_PATHS.has(path)) {
      await page.addStyleTag({ content: '.reveal { animation: none !important }' })
      await page.screenshot({
        path: `${SHOTS}/${path.replace(/\//g, '_').slice(1)}-${testInfo.project.name}.png`,
        fullPage: true,
      })
    }
  })
}
