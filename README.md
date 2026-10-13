# vitopaque.com

Refonte et rebranding de vitopaque.com (VIT'OPAQUE, films adhésifs pour vitrages, Vendargues). Langue du site : français uniquement.

## Stack

- Next.js 16.4.0 (App Router) avec Payload 3.90.2 dans la même application, sans monorepo
- Supabase (Postgres) via `@payloadcms/db-postgres`, par le pooler en mode transaction (port 6543)
- Vercel (formule Pro, fonctions en région européenne)
- Vercel Blob via `@payloadcms/storage-vercel-blob`, envoi direct navigateur vers stockage
- Tailwind 4.3.3, tokens issus de `DESIGN.md`
- Montserrat auto-hébergée (`next/font/local`)
- React 19.3.0, TypeScript 6.0.3 strict, ESLint 9, Prettier 3

## Prérequis

- Node 24.21.0 (voir `.nvmrc`), par exemple avec [fnm](https://github.com/Schniz/fnm) : `fnm use`
- pnpm 10.22.0 (champ `packageManager`), par exemple via Corepack : `corepack enable`

## Installation

```bash
pnpm install
cp .env.example .env.local
```

Renseigner `.env.local` (jamais versionné) :

| Variable                | Rôle                                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| `PAYLOAD_SECRET`        | Secret de Payload.                                                                                          |
| `DATABASE_URI`          | Connexion Postgres Supabase, pooler en mode transaction (port 6543).                                        |
| `BLOB_READ_WRITE_TOKEN` | Jeton du store Vercel Blob. Obligatoire sur Vercel ; en local, vide = disque local.                         |
| `SITE_URL`              | URL canonique sans slash final (`metadataBase`, `serverURL`, CSRF Payload). En local : `http://localhost:3000`. |

En local, la base utilisée est celle de préproduction. Le schéma n'est jamais synchronisé automatiquement (`push: false`).

## Scripts

| Commande                         | Usage                                                              |
| -------------------------------- | ------------------------------------------------------------------ |
| `pnpm dev`                       | Serveur de développement.                                          |
| `pnpm build`                     | Build de production.                                               |
| `pnpm payload <commande>`        | CLI Payload.                                                       |
| `pnpm db:migrate`                | Applique les migrations en attente (charge `.env.local`).          |
| `pnpm db:status`                 | Affiche l'état des migrations (charge `.env.local`).               |
| `pnpm db:migrate:create <nom>`   | Crée une migration versionnée (charge `.env.local`).               |
| `pnpm generate:types`            | Régénère `src/shared/payload-types.ts`.                            |
| `pnpm generate:importmap`        | Régénère l'import map de l'admin Payload.                          |
| `pnpm lint`                      | ESLint, dont la règle de dépendance entre couches.                 |
| `pnpm typecheck`                 | Vérification TypeScript (`tsc --noEmit`).                          |
| `pnpm format`                    | Formate le dépôt avec Prettier.                                    |
| `pnpm format:check`              | Vérifie le formatage sans modifier les fichiers.                   |

## Architecture

- `src/app` : routage seul, pages minces qui appellent les features.
- `src/features/<feature>/` : une fonctionnalité (collection, hooks, accès, requêtes, composants, SEO, types). Elle n'est exposée que par son `index.ts`.
- `src/shared/` : transverse (variables d'environnement, SEO, styles, polices, types générés). Le code chargé hors Next (configs Payload et Next) et les polices s'importent par sous-chemin (`@/shared/env`, `@/shared/fonts/...`) ; le reste passe par `@/shared`.
- `payload.config.ts` assemble les features.

Règle de dépendance : `app` → `features` → `shared`. `shared` n'importe aucune feature ni `app` ; une feature n'importe pas `app` ni les fichiers internes d'une autre feature. Appliquée par `pnpm lint` (`no-restricted-imports` et `eslint-plugin-boundaries`).

Références : `CLAUDE.md` (cadre du projet, immuable), `architecture-technique.md` (stack, routes, modèle, hébergement), `DESIGN.md` (tokens et règles de design).

## Base de données

Les migrations sont versionnées dans `migrations/`. Pour toute évolution du schéma :

```bash
pnpm db:migrate:create <nom>
pnpm db:migrate
```

Aucune synchronisation automatique du schéma, ni en local ni en production.

## Environnements et déploiement

- Seul `VERCEL_ENV=production` est indexable. Tout le reste (préproduction, previews, local) est en `noindex`.
- Variables requises au build Vercel : `PAYLOAD_SECRET`, `DATABASE_URI`, `BLOB_READ_WRITE_TOKEN`, `SITE_URL`.
- En préproduction, `SITE_URL` est l'URL `*.vercel.app` du déploiement (CSRF Payload), jamais le domaine de production.
- Un store Vercel Blob (public) par environnement ; deux projets Supabase (production, préproduction).

## Contribution

- Branches `feat/*`, commits conventionnels, branche `main` protégée, revue avant fusion.
- Aucun secret dans le dépôt : seul `.env.example` (sans valeur) est versionné.
