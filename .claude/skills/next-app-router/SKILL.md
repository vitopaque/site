---
name: next-app-router
description: "Gabarits Next.js App Router de vitopaque.com : routes minces, route dynamique des pages de service, ISR, 404, composants serveur. À utiliser pour créer pages et layouts."
---

# Next.js App Router

Source : `architecture-technique.md`, section « Routes du site ». Organisation : feature-first (skill `principes-code`).

- `src/app` ne fait que le **routage** : chaque `page.tsx` est mince et appelle les composants et requêtes de la feature concernée via son `index.ts`.
- Routes : `/`, `/batiment`, `/voiture`, `/bateau`, 7 pages de service (collection, gabarit unique), `/realisations(/[slug])`, `/conseils-expertises(/[slug])`, `/a-propos`, `/contact-devis`, pages légales.
- Les routes fixes l'emportent sur `/[slug]`. Slug inconnu → vraie 404 avec liens vers les univers et le contact.
- Rendu ISR sur les pages de contenu ; `/contact-devis` statique avec formulaire client.
- Composants serveur par défaut ; client seulement pour simulateur PDLC, curseur avant/après, carrousel, formulaire, menu mobile (chargés à l'affichage de leur zone).
- Images : `next/image`, AVIF/WebP, tailles déclarées, chargement différé sauf l'image principale.
- Police : `next/font/local` (Montserrat). Pas de slash final ; une seule version du domaine.
- Vérifier les APIs de la version installée dans la documentation Next.js.
