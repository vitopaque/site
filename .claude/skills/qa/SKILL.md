---
name: qa
description: "Lance les contrôles qualité (parcours Playwright critiques, SEO, accessibilité, performance) sur une cible."
argument-hint: "[page, parcours ou feature]"
disable-model-invocation: true
context: fork
agent: qa
---

Cible : $ARGUMENTS (si vide, les parcours critiques : devis, redirections 301, balises SEO).

Exécute les contrôles de tes skills, rapporte pour chaque point OK ou KO avec la preuve (commande, sortie, `fichier:ligne`). Corrige uniquement les tests et leur configuration ; signale tout défaut de code applicatif sans le corriger.
