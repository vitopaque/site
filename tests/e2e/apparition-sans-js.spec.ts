import { expect, test } from '@playwright/test'

test.use({ javaScriptEnabled: false })

for (const path of ['/', '/voiture']) {
  test(`${path} : blocs à apparition visibles sans JavaScript`, async ({ page }) => {
    await page.goto(path)
    const opacities = await page
      .locator('.reveal')
      .evaluateAll((blocs) => blocs.map((bloc) => getComputedStyle(bloc).opacity))
    expect(opacities.length).toBeGreaterThan(0)
    expect(opacities.every((opacity) => opacity === '1')).toBe(true)
  })
}
