---
name: revue
description: "Revue de code bloquante (SOLID, DRY, feature-first, erreurs, bonnes pratiques) par l'agent reviewer."
argument-hint: "[feature ou chemin]"
disable-model-invocation: true
context: fork
agent: reviewer
---

Revue de : $ARGUMENTS (si vide, les changements en cours : `git status` et `git diff`).

Applique tes skills de revue et rends le rapport au format imposé, première ligne `VERDICT : VALIDÉ` ou `VERDICT : BLOQUANT`, puis Bloquant / Important / Suggestion avec `fichier:ligne`. Ne modifie aucun fichier.
