import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']
const LIST = '/realisations'
const ITEM = '/realisations/vitres-arriere-teintees-porsche-macan'
const SHOTS = process.env.SHOTS_DIR

const jsonLd = (page: Page) =>
  page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((n) => JSON.parse(n.textContent ?? '{}')))

for (const path of [LIST, ITEM]) {
  test.describe(path, () => {
    test('répond 200, un seul H1, canonique sans slash final, alt renseignés', async ({
      page,
    }, testInfo) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('body')).not.toContainText(/À intégrer|Photo provisoire/)
      expect(await page.locator('img:not([alt])').count()).toBe(0)
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(new URL(canonical ?? '').pathname).toBe(path)
      const types = (await jsonLd(page)).map((data) => data['@type'])
      expect(types).toContain('BreadcrumbList')
      expect(types).not.toContain('Article')

      if (SHOTS) {
        await page.addStyleTag({ content: '.reveal { animation: none !important }' })
        await page.screenshot({
          path: `${SHOTS}/${path.replace(/\//g, '_').slice(1)}-${testInfo.project.name}.png`,
          fullPage: true,
        })
      }
    })

    test('aucune violation axe', async ({ page }) => {
      await page.goto(path)
      const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
      expect(violations).toEqual([])
    })
  })
}

test.describe('Page de réalisation', () => {
  test('VideoObject complet et URLs absolues', async ({ page }) => {
    await page.goto(ITEM)
    const video = (await jsonLd(page)).find((data) => data['@type'] === 'VideoObject')
    expect(video).toBeTruthy()
    expect(video?.name).toBe('Vitres arrière teintées sur une Porsche Macan noire')
    expect(String(video?.description).length).toBeGreaterThan(0)
    expect(video?.duration).toBe('PT29S')
    expect(video?.uploadDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(video?.contentUrl).toBe(
      'https://0o2mn0e2eovq20dz.public.blob.vercel-storage.com/realisations/film-teinte-vitres-arriere.mp4',
    )
    const thumbnail = String(video?.thumbnailUrl)
    expect(thumbnail).toMatch(/^https?:\/\//)
    const response = await page.request.get(thumbnail.replace(/^https?:\/\/[^/]+/, ''))
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('image/')
  })

  test('la vidéo ne se charge pas avant le clic', async ({ page }) => {
    const mediaRequests: string[] = []
    page.on('request', (request) => {
      if (request.url().endsWith('.mp4')) mediaRequests.push(request.url())
    })
    await page.goto(ITEM)
    const video = page.locator('video')
    await video.scrollIntoViewIfNeeded()
    await page.waitForLoadState('load')
    await page.waitForTimeout(1000)
    await expect(video).toHaveAttribute('preload', 'none')
    await expect(video).toHaveAttribute('controls', '')
    await expect(video).toHaveAttribute('playsinline', '')
    expect(await video.evaluate((el: HTMLVideoElement) => el.autoplay)).toBe(false)
    expect(await video.evaluate((el: HTMLVideoElement) => el.muted)).toBe(true)
    expect(await video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true)
    expect(mediaRequests).toEqual([])
  })

  test('curseur avant/après fonctionnel', async ({ page }) => {
    await page.goto(ITEM)
    const slider = page.getByRole('slider', { name: 'Comparer avant et après la pose' })
    await slider.scrollIntoViewIfNeeded()
    await expect(slider).toHaveAttribute('aria-valuetext', 'Avant / Après, 50 %')
    await slider.focus()
    await page.keyboard.press('ArrowRight')
    await expect(slider).toHaveValue('51')
    await expect(slider).toHaveAttribute('aria-valuetext', 'Avant / Après, 51 %')
  })

  test('une seule réalisation : pas de section « autres réalisations »', async ({ page }) => {
    await page.goto(ITEM)
    await expect(page.locator('section[aria-labelledby="realisations-titre"]')).toHaveCount(0)
  })
})

test.describe('Page de service : lien vers la réalisation', () => {
  test('/vitres-teintees-auto renvoie vers la réalisation', async ({ page }) => {
    await page.goto('/vitres-teintees-auto')
    const slider = page.getByRole('slider', { name: 'Comparer avant et après la pose' })
    const section = page.locator('section', { has: slider })
    await expect(section.getByRole('link', { name: 'Voir la réalisation' })).toHaveAttribute(
      'href',
      ITEM,
    )
  })
})

test('slug inconnu : vraie 404', async ({ page }) => {
  const response = await page.goto('/realisations/inconnue')
  expect(response?.status()).toBe(404)
})

test('/nos-realisations : redirection 301 vers /realisations', async ({ request }) => {
  const response = await request.get('/nos-realisations', { maxRedirects: 0 })
  expect(response.status()).toBe(301)
  expect(new URL(response.headers()['location'] ?? '', 'http://localhost').pathname).toBe(LIST)
})
