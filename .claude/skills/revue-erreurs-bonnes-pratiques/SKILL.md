---
name: revue-erreurs-bonnes-pratiques
description: "Revue qualité, erreurs et bonnes pratiques de vitopaque.com : gestion d'erreurs, sécurité, accès Payload, performance, ISR, TypeScript, RGPD, accessibilité de base, et format du rapport bloquant. À utiliser par l'agent reviewer."
---

# Revue : erreurs et bonnes pratiques

Tu **constates**, tu ne corriges pas. Lis d'abord le périmètre (feature, chemin ou diff).

## Contrôles
- **Erreurs** : erreurs avalées ou `catch` vide, promesses non attendues, valeurs nulles non gérées, cas limites (liste vide, slug inconnu → 404, API tierce en échec avec repli). → *bloquant* si cela peut casser une page ou perdre une donnée.
- **Frontières** : entrées externes (formulaire, webhook, paramètres) validées par un schéma ; types stricts, pas de `any`.
- **Sécurité** : aucun secret dans le code ; signature du webhook n8n ; limitation de débit et champ piège sur le devis ; contrôle d'accès Payload testé (l'Éditeur ne touche que les articles) ; pas de données personnelles dans les logs. → *bloquant*.
- **Next.js / Payload** : frontière serveur/client respectée (`'use client'` minimal) ; revalidation correcte et ciblée ; pas de requêtes en cascade ni de N+1 ; mode brouillon protégé par secret.
- **Performance** : images `next/image`, pas de JavaScript client inutile, composants lourds chargés à l'affichage de leur zone.
- **RGPD** : aucun traceur avant consentement ; consentement stocké avec le devis.
- **Accessibilité de base** : alt, libellés de formulaire, focus visible, contrastes selon `DESIGN.md`.
- **Règles du projet** : `CLAUDE.md` §4 (SEO local, tokens, rôles, routes). Toute violation → *bloquant*.
- **Outils** : exécuter lint, typage et tests existants si configurés (`pnpm lint`, `pnpm typecheck`, `pnpm test`) ; un échec est *bloquant*.

## Format du rapport (obligatoire)
Première ligne : `VERDICT : VALIDÉ` ou `VERDICT : BLOQUANT`.
Puis des listes **Bloquant**, **Important**, **Suggestion** ; chaque point : `fichier:ligne` · règle enfreinte · correction attendue en une phrase. Aucun point bloquant = VALIDÉ. Pas de compliments ni de résumé du code.
