---
name: conventions-repo
description: "Conventions d'outillage du dépôt vitopaque.com : pnpm, TypeScript strict, Node LTS, secrets, migrations, commits. Skill commun aux agents de code ; la structure des dossiers est dans principes-code."
---

# Conventions d'outillage

- **Une seule application** Next.js (App Router) + Payload, sans monorepo. pnpm, TypeScript strict (pas de `any` implicite), ESLint, Prettier, Node LTS verrouillée (`.nvmrc`, `engines`).
- Structure des dossiers et règle de dépendance : skill `principes-code` (feature-first).
- Aucune couleur, taille ou valeur de design en dur : tokens uniquement. Aucun secret dans le dépôt ; variables documentées dans `.env.example`.
- Composants serveur par défaut ; `'use client'` seulement pour : simulateur PDLC, curseur avant/après, carrousel, formulaire, menu mobile.
- Migrations Payload versionnées ; jamais de synchronisation automatique du schéma en production.
- Versions des dépendances : vérifiées dans la documentation officielle et figées à la création, jamais de mémoire.
- Commits conventionnels, branches `feat/*`, `main` protégée. Ne commite que si Hery le demande.
