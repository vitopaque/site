import { expect, test } from '@playwright/test'
import { noCityInTitle, noCityNumber } from '../../src/shared/content/city-rules.mjs'
import { lexicalTexts } from '../../src/shared/payload/lexical-text'
import { createBuildFallback } from '../../src/features/articles/build-fallback'
import { articleSlugRule, slugify } from '../../src/features/articles/slug'
import {
  ARTICLES_TAG,
  articleTag,
  serviceTag,
  tagsFor,
  universTag,
} from '../../src/features/articles/tags'

const text = (value: string) => ({ type: 'text', text: value })
const paragraph = (...children: object[]) => ({ type: 'paragraph', children })

const root = (...children: object[]) => ({ type: 'root', children })

const violation = (tree: ReturnType<typeof root>) =>
  lexicalTexts(tree)
    .map(noCityNumber)
    .find((result) => result !== true)

test.describe('texte Lexical et règle ville', () => {
  test('un corps sans ville accolée à un numéro est accepté', () => {
    const tree = root(paragraph(text('Un film solaire près de Montpellier, à Vendargues.')), {
      type: 'heading',
      tag: 'h2',
      children: [text('Pourquoi poser un film ?')],
    })
    expect(violation(tree)).toBeUndefined()
  })

  for (const forbidden of ['Montpellier 34', 'Montpellier 34000', 'secteur 34740']) {
    test(`« ${forbidden} » est refusé dans un paragraphe`, () => {
      expect(violation(root(paragraph(text(`Intervention ${forbidden} rapide.`))))).toBeDefined()
    })
  }

  test('le texte d’un lien et les segments mis en forme sont assemblés', () => {
    const tree = root(paragraph(text('Montpellier '), { type: 'link', children: [text('34')] }))
    expect(violation(tree)).toBeDefined()
  })

  test('les éléments de liste imbriqués et les citations sont parcourus', () => {
    const tree = root(
      {
        type: 'list',
        children: [
          { type: 'listitem', children: [text('Premier point')] },
          {
            type: 'listitem',
            children: [
              { type: 'list', children: [{ type: 'listitem', children: [text('34740')] }] },
            ],
          },
        ],
      },
      { type: 'quote', children: [text('Citation')] },
    )
    expect(lexicalTexts(tree)).toEqual(['Premier point', '34740', 'Citation'])
    expect(violation(tree)).toBeDefined()
  })

  test('la ville en fin d’un bloc et un nombre en début du suivant ne sont pas associés', () => {
    const tree = root(
      paragraph(text('Nous intervenons à Montpellier')),
      paragraph(text('34 films posés')),
    )
    expect(violation(tree)).toBeUndefined()
  })

  test('un arbre vide ou absent ne produit aucun texte', () => {
    expect(lexicalTexts(undefined)).toEqual([])
    expect(lexicalTexts(root(paragraph()))).toEqual([])
  })
})

test.describe('règle ville sur les champs de l’article', () => {
  test('le titre refuse la ville seule', () => {
    expect(noCityInTitle('Film solaire à Montpellier')).not.toBe(true)
    expect(noCityInTitle('Film solaire : bien choisir')).toBe(true)
  })

  test('l’extrait et la méta-description acceptent la ville seule mais pas avec « 34 »', () => {
    expect(noCityNumber('Pose de films près de Montpellier')).toBe(true)
    expect(noCityNumber('Pose de films Montpellier 34')).not.toBe(true)
  })
})

test.describe('slug des articles', () => {
  test('dérive un slug sobre depuis un titre accentué', () => {
    expect(slugify('Quel film pour une véranda exposée plein sud ?')).toBe(
      'quel-film-pour-une-veranda-exposee-plein-sud',
    )
    expect(slugify('Cœur d’été : l’essentiel')).toBe('coeur-d-ete-l-essentiel')
  })

  test('refuse un format invalide et le slug réservé « page »', () => {
    expect(articleSlugRule('film-solaire')).toBe(true)
    expect(articleSlugRule('page')).not.toBe(true)
    expect(articleSlugRule('Film Solaire')).not.toBe(true)
    expect(articleSlugRule('a/b')).not.toBe(true)
  })
})

test.describe('tags de revalidation', () => {
  test('un article publié invalide liste, article, service et univers', () => {
    expect(tagsFor({ slug: 'a', service: 'vitres-teintees-auto' })).toEqual([
      ARTICLES_TAG,
      articleTag('a'),
      serviceTag('vitres-teintees-auto'),
      universTag('voiture'),
    ])
  })

  test('un changement de slug et de service invalide l’ancien et le nouveau', () => {
    const tags = tagsFor(
      { slug: 'nouveau', service: 'film-pdlc-cristaux-liquides' },
      { slug: 'ancien', service: 'vitres-teintees-bateau' },
    )
    expect(tags).toEqual(
      expect.arrayContaining([
        articleTag('nouveau'),
        articleTag('ancien'),
        serviceTag('film-pdlc-cristaux-liquides'),
        serviceTag('vitres-teintees-bateau'),
        universTag('batiment'),
        universTag('bateau'),
      ]),
    )
    expect(new Set(tags).size).toBe(tags.length)
  })
})

test.describe('repli de lecture au build', () => {
  const logger = () => {
    const calls = { warn: 0, error: 0 }
    return { calls, logger: { warn: () => calls.warn++, error: () => calls.error++ } }
  }
  const failing = () => Promise.reject(new Error('base injoignable'))

  test('au build : repli, avertissement, puis plus aucune tentative', async () => {
    const { calls, logger: log } = logger()
    const withFallback = createBuildFallback(() => true, log)
    expect(await withFallback('a', failing, [])).toEqual([])
    let attempts = 0
    expect(await withFallback('b', () => (attempts++, Promise.resolve(['lu'])), [])).toEqual([])
    expect(attempts).toBe(0)
    expect(calls).toEqual({ warn: 1, error: 0 })
  })

  test('à l’exécution : l’erreur est journalisée puis relancée', async () => {
    const { calls, logger: log } = logger()
    const withFallback = createBuildFallback(() => false, log)
    await expect(withFallback('a', failing, [])).rejects.toThrow('base injoignable')
    expect(calls).toEqual({ warn: 0, error: 1 })
  })

  test('une lecture réussie est renvoyée telle quelle', async () => {
    const withFallback = createBuildFallback(() => true, logger().logger)
    expect(await withFallback('a', () => Promise.resolve(['lu']), [])).toEqual(['lu'])
  })
})
