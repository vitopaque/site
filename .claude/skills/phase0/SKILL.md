---
name: phase0
description: "Déroule la phase 0 (socle technique) pas à pas, avec la validation de Hery à chaque étape."
argument-hint: "[étape à reprendre]"
disable-model-invocation: true
---

# /phase0 — socle technique

Lis `CLAUDE.md` et `architecture-technique.md` (section Phase 0). Étapes, dans cet ordre ; **après chacune, présente le résultat à Hery et attends sa validation** (AskUserQuestion) avant la suivante. Si `$ARGUMENTS` est renseigné, reprends à cette étape.

1. Prérequis côté client : dépôt GitHub privé (Hery collaborateur), Vercel Pro (région UE), 2 projets Supabase (prod, préprod). Vérifie ce qui existe, liste ce qui manque, ne crée rien au nom du client sans son accord.
2. Squelette : app Next.js unique avec Payload, pnpm, TypeScript strict, arborescence feature-first de `principes-code`, lint de la règle de dépendance (outil à valider avec Hery), migrations Payload versionnées. Délégué à `infra-data` puis `cms-payload`.
3. Test du pooler Supabase (port 6543, sans prepared statements) : lecture, écriture, migration. Délégué à `infra-data`.
4. Test d'upload Blob direct navigateur > 4,5 Mo. Délégué à `infra-data`.
5. Compte admin et rôle Éditeur (articles uniquement). Délégué à `cms-payload`.
6. Tokens DESIGN.md v3.0 dans Tailwind, Barlow et Barlow Condensed auto-hébergées, gabarit de base. Délégué à `frontend`.
7. Revue bloquante (`reviewer`) puis `qa` sur l'ensemble, préprod `*.vercel.app` en noindex.

Pour déléguer, fonctionne comme l'orchestrateur (brief court, critères vérifiables). Aucun commit, push ni déploiement sans demande explicite de Hery. Si cette commande est lancée hors de `claude --agent orchestrateur`, dis à Hery de relancer ainsi.
