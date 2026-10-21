import { expect, test } from '@playwright/test'
import type { Access, AccessArgs, PayloadRequest } from 'payload'

import { Users } from '../../src/features/access/collection'
import { articleAccess } from '../../src/features/articles/access'
import { Authors } from '../../src/features/authors/collection'

type User = { id: number; role: 'admin' | 'editor' } | null

const admin: User = { id: 1, role: 'admin' }
const editor: User = { id: 2, role: 'editor' }

const run = (access: Access | undefined, user: User) =>
  access?.({ req: { user } as unknown as PayloadRequest } as AccessArgs)

const actions = ['read', 'readVersions', 'create', 'update', 'delete'] as const

test.describe('accès aux articles', () => {
  test('anonyme : lecture limitée aux articles publiés, aucune écriture', async () => {
    expect(await run(articleAccess.read, null)).toEqual({ _status: { equals: 'published' } })
    expect(await run(articleAccess.readVersions, null)).toBe(false)
    for (const action of ['create', 'update', 'delete'] as const) {
      expect(await run(articleAccess[action], null)).toBe(false)
    }
  })

  test('éditeur : crée, modifie, lit tout ; ne supprime pas', async () => {
    for (const action of ['read', 'readVersions', 'create', 'update'] as const) {
      expect(await run(articleAccess[action], editor)).toBe(true)
    }
    expect(await run(articleAccess.delete, editor)).toBe(false)
  })

  test('administrateur : accès complet', async () => {
    for (const action of actions) expect(await run(articleAccess[action], admin)).toBe(true)
  })
})

test.describe('accès aux auteurs', () => {
  test('lecture publique, écriture réservée à l’administrateur', async () => {
    expect(await run(Authors.access?.read, null)).toBe(true)
    for (const action of ['create', 'update', 'delete'] as const) {
      expect(await run(Authors.access?.[action], null)).toBe(false)
      expect(await run(Authors.access?.[action], editor)).toBe(false)
      expect(await run(Authors.access?.[action], admin)).toBe(true)
    }
  })
})

test.describe('accès aux utilisateurs', () => {
  test('anonyme : rien', async () => {
    for (const action of ['read', 'create', 'update', 'delete'] as const) {
      expect(await run(Users.access?.[action], null)).toBe(false)
    }
  })

  test('éditeur : limité à soi, ni création ni suppression', async () => {
    const self = { id: { equals: 2 } }
    expect(await run(Users.access?.read, editor)).toEqual(self)
    expect(await run(Users.access?.update, editor)).toEqual(self)
    expect(await run(Users.access?.create, editor)).toBe(false)
    expect(await run(Users.access?.delete, editor)).toBe(false)
  })

  test('administrateur : tout, sauf se supprimer soi-même', async () => {
    expect(await run(Users.access?.read, admin)).toBe(true)
    expect(await run(Users.access?.create, admin)).toBe(true)
    expect(await run(Users.access?.update, admin)).toBe(true)
    expect(await run(Users.access?.delete, admin)).toEqual({ id: { not_equals: 1 } })
  })
})
