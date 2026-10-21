---
name: next-app-router
description: "Gabarits Next.js App Router de vitopaque.com : routes minces, route dynamique des pages de service, ISR, 404, composants serveur. À utiliser pour créer pages et layouts."
---

# Next.js App Router

Source : `architecture-technique.md`, section « Routes du site ». Organisation : feature-first (skill `principes-code`).

- `src/app` ne fait que le **routage** : chaque `page.tsx` est mince et appelle les composants et requêtes de la feature concernée via son `index.ts`.
- Routes : `/`, `/batiment`, `/voiture`, `/bateau`, pages de service (contenu en code, gabarit unique), `/realisations(/[slug])`, `/conseils-expertises(/[slug])`, `/a-propos`, `/contact-devis`, pages légales.
- Les routes fixes l'emportent sur `/[slug]`. Slug inconnu → vraie 404 avec liens vers les univers et le contact.
- Pages du site : statiques (contenu en code, `generateStaticParams`, `dynamicParams = false` sur `/[slug]`). ISR seulement pour le blog. `/contact-devis` statique avec formulaire client.
- Composants serveur par défaut ; client seulement pour lentille d'en-tête, laboratoire de films (curseur avant/après), manifeste, carrousel, formulaire, menu mobile (chargés à l'affichage de leur zone).
- Images : `next/image`, AVIF/WebP, tailles déclarées, chargement différé sauf l'image principale.
- Police : `next/font/local` (Barlow et Barlow Condensed). Pas de slash final ; une seule version du domaine.
- Vérifier les APIs de la version installée dans la documentation Next.js.
