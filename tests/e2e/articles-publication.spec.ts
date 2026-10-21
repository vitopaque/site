import { expect, test } from '@playwright/test'
import type { PayloadRequest } from 'payload'

import { requiredOnPublish } from '../../src/shared/payload/required-on-publish'
import { uniqueAmongDocs } from '../../src/shared/payload/unique-field'
import { safeHref } from '../../src/features/articles/lexical/converters'
import { validateContent } from '../../src/features/articles/validators'

test.describe('obligatoire à la publication', () => {
  test('refuse l’absence seulement quand le statut est publié', () => {
    expect(requiredOnPublish({ _status: 'published' }, false, 'm')).toBe('m')
    expect(requiredOnPublish({ _status: 'published' }, true, 'm')).toBe(true)
    expect(requiredOnPublish({ _status: 'draft' }, false, 'm')).toBe(true)
    expect(requiredOnPublish(undefined, false, 'm')).toBe(true)
  })
})

const doc = (...texts: string[]) => ({
  root: {
    type: 'root',
    children: texts.map((t) => ({
      type: 'paragraph',
      children: t ? [{ type: 'text', text: t }] : [],
    })),
  },
})

test.describe('corps de l’article', () => {
  const validate = (value: unknown, status: string) =>
    validateContent(
      value as never,
      {
        data: { _status: status },
        editor: { validate: () => true },
        req: { t: (k: string) => k },
      } as never,
    )

  test('un corps vide est refusé à la publication, accepté en brouillon', async () => {
    expect(await validate(doc(''), 'published')).toContain('obligatoire')
    expect(await validate(doc('', ' '), 'published')).toContain('obligatoire')
    expect(await validate(doc(''), 'draft')).toBe(true)
  })

  test('un corps avec du texte est accepté', async () => {
    expect(await validate(doc('Bonjour'), 'published')).toBe(true)
  })
})

test.describe('unicité SEO', () => {
  const reqWith = (counts: { draft: number; live: number }) => {
    const calls: Record<string, unknown>[] = []
    const req = {
      payload: {
        find: async (args: Record<string, unknown>) => {
          calls.push(args)
          return { docs: new Array(args.draft ? counts.draft : counts.live).fill({}) }
        },
      },
    } as unknown as PayloadRequest
    return { req, calls }
  }
  const rule = uniqueAmongDocs('articles', 'seo.title', 'doublon')

  test('un doublon, brouillon ou publié, est refusé', async () => {
    expect(await rule('Titre', { req: reqWith({ draft: 1, live: 0 }).req })).toBe('doublon')
    expect(await rule('Titre', { req: reqWith({ draft: 0, live: 1 }).req })).toBe('doublon')
  })

  test('une valeur libre est acceptée, le document lui-même est exclu', async () => {
    const { req, calls } = reqWith({ draft: 0, live: 0 })
    expect(await rule('Titre', { id: 7, req })).toBe(true)
    expect(JSON.stringify(calls[0]?.where)).toContain('"not_equals":7')
    expect(JSON.stringify(calls[0]?.where)).toContain('"seo.title"')
  })

  test('une valeur vide n’interroge pas la base', async () => {
    const { req, calls } = reqWith({ draft: 1, live: 1 })
    expect(await rule('', { req })).toBe(true)
    expect(calls).toHaveLength(0)
  })
})

test.describe('liens du texte riche', () => {
  for (const ok of [
    'https://exemple.fr/a',
    'http://exemple.fr',
    'mailto:a@b.fr',
    'tel:+33400000000',
    '/batiment',
    '#section',
    'page/suite',
  ]) {
    test(`accepte ${ok}`, () => expect(safeHref(ok)).toBe(ok))
  }
  for (const bad of [
    'javascript:alert(1)',
    ' JaVaScRiPt:alert(1)',
    'java\nscript:alert(1)',
    'data:text/html,x',
    'vbscript:x',
    '//evil.example',
    '',
    null,
  ]) {
    test(`refuse ${JSON.stringify(bad)}`, () => expect(safeHref(bad)).toBeNull())
  }
})
