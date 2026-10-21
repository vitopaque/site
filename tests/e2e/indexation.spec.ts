import { expect, test } from '@playwright/test'
import { isIndexable } from '../../src/shared/seo/indexing'

const OFFICIAL = 'https://www.vitopaque.com'

test.describe('isIndexable', () => {
  test('production Vercel sur le domaine officiel : indexable', () => {
    expect(isIndexable({ VERCEL_ENV: 'production', SITE_URL: OFFICIAL })).toBe(true)
  })

  for (const siteUrl of [
    'https://site-eight-delta-87.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'pas-une-url',
    '',
    undefined,
  ]) {
    test(`production Vercel avec SITE_URL=${siteUrl ?? 'absente'} : non indexable`, () => {
      expect(isIndexable({ VERCEL_ENV: 'production', SITE_URL: siteUrl })).toBe(false)
    })
  }

  for (const vercelEnv of ['preview', 'development', undefined]) {
    test(`VERCEL_ENV=${vercelEnv ?? 'absent'} sur le domaine officiel : non indexable`, () => {
      expect(isIndexable({ VERCEL_ENV: vercelEnv, SITE_URL: OFFICIAL })).toBe(false)
    })
  }
})
