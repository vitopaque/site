---
name: principes-code
description: "Principes de code de vitopaque.com : architecture feature-first, règle de dépendance, SOLID fonctionnel, DRY, où placer chaque fichier. Skill commun à tous les agents qui écrivent ou revoient du code."
---

# Principes de code

## Structure feature-first
```
src/
  app/            routage seul : pages minces qui appellent les features
  features/
    services/       pages de service + hubs
    case-studies/   réalisations
    articles/       Conseils & Expertises
    quote/          devis (collection, formulaire, route serveur, client n8n)
    reviews/        avis Google (API Places + cache)
    consent/        bandeau RGPD, GA4
    site-settings/  globals : accueil, à propos, coordonnées, navigation, réglages SEO
    media/          médias et upload
    access/         rôles Administrateur / Éditeur
    home/           simulateur PDLC et sections d'accueil
  shared/         kit UI, tokens, builders SEO, champs Payload communs, utilitaires
payload.config.ts   assemble les features
```
Dans une feature : `collection.ts` (ou `global.ts`), `hooks.ts`, `access.ts`, `validators.ts`, `queries.ts`, `components/`, `seo.ts`, `types.ts`, `index.ts`. Un service externe : `ports.ts` (interface) + `adapters/`.

## Règle de dépendance
- Sens unique : `app` → `features` → `shared`.
- Une feature n'expose que son `index.ts`. Aucun import des fichiers internes d'une autre feature. `shared` n'importe aucune feature.
- Une feature qui en a besoin d'une autre passe par son `index.ts` ; si le besoin est large, c'est un signe qu'il faut remonter du code dans `shared` ou fusionner.
- Application par ESLint (`no-restricted-imports` + `eslint-plugin-boundaries`), via `pnpm lint` en local et en CI (validé par Hery).

## SOLID (TypeScript fonctionnel, pas de hiérarchies de classes)
- **S** : un fichier, une responsabilité (hook, validateur, requête, composant séparés).
- **O** : on étend par fabriques et configuration (ex. `seoFields()`, `makeServicePage()`), pas en modifiant du code existant.
- **L** : les implémentations d'une interface sont interchangeables sans surprise (ex. adaptateur n8n réel / factice).
- **I** : interfaces petites et ciblées, par besoin du consommateur.
- **D** : le métier dépend d'interfaces (`ports.ts`), jamais d'un SDK ou d'un `fetch` direct ; les adaptateurs sont injectés.

## DRY
- Factoriser dès la **deuxième** duplication réelle ; pas par anticipation, pas pour une ressemblance fortuite.
- Candidats connus : gabarit des pages de service, builder `generateMetadata`, builder JSON-LD, champ SEO Payload, champ H1, tokens, composants UI.
- Une règle métier (ex. validation « Montpellier 34 ») existe en un seul endroit.
- Toute abstraction doit rester plus simple que la duplication qu'elle remplace.
