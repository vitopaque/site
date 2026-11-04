import { expect, test } from '@playwright/test'

const REDIRECTS: ReadonlyArray<readonly [string, string]> = [
  ['/index.php', '/'],
  ['/nos-realisations', '/realisations'],
  ['/contactez-nous', '/contact-devis'],
  ['/foire-aux-questions', '/film-solaire-batiment'],
  ['/blog', '/conseils-expertises'],
  ['/enseignes-vitrophanie-et-signaletique-vehicule', '/vitrophanie-signaletique'],
  ['/blog/vitrophanie-dentreprise', '/vitrophanie-signaletique'],
  ['/blog/protection-des-locaux', '/film-securite-anti-effraction'],
  ['/blog/proprete-et-securite-des-commerces', '/film-securite-anti-effraction'],
  ['/blog/automobile-securite', '/vitres-teintees-auto'],
  ['/blog/technologie-innovation', '/film-pdlc-cristaux-liquides'],
  ['/blog/batiment-bureaux', '/film-solaire-batiment'],
  ['/blog/questions-frequentes-installation-entretien', '/film-solaire-batiment'],
  ['/blog/diy-vs-pro', '/film-solaire-batiment'],
  ['/blog/3-quels-sont-les-differents-types-de-films-solaires', '/film-solaire-batiment'],
  ['/blog/le-film-solaire-ideal', '/film-solaire-batiment'],
  ['/blog/films-solaires-sur-vitrages', '/film-solaire-batiment'],
]

for (const [source, target] of REDIRECTS) {
  test(`${source} : 301 vers ${target}, cible en 200, sans chaîne`, async ({ request }) => {
    const response = await request.get(source, { maxRedirects: 0 })
    expect(response.status()).toBe(301)
    const location = new URL(response.headers()['location'] ?? '', 'http://localhost')
    expect(location.pathname).toBe(target)
    expect(location.pathname === '/' || !location.pathname.endsWith('/')).toBe(true)

    const final = await request.get(target, { maxRedirects: 0 })
    expect(final.status()).toBe(200)
  })
}

test('/blog/slug-inconnu : vraie 404', async ({ request }) => {
  const response = await request.get('/blog/slug-inconnu', { maxRedirects: 0 })
  expect(response.status()).toBe(404)
})

for (const type of ['rss', 'atom']) {
  test(`/blog?format=feed&type=${type} : pas de redirection, vraie 404`, async ({ request }) => {
    const response = await request.get(`/blog?format=feed&type=${type}`, { maxRedirects: 0 })
    expect(response.status()).toBe(404)
  })
}

test('/blog?start=10 : 301 vers /conseils-expertises', async ({ request }) => {
  const response = await request.get('/blog?start=10', { maxRedirects: 0 })
  expect(response.status()).toBe(301)
  expect(new URL(response.headers()['location'] ?? '', 'http://localhost').pathname).toBe(
    '/conseils-expertises',
  )
})
