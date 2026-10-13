---
name: statut
description: "Fait le point : avancement par phase, tâches en cours, points ouverts et décisions en attente."
disable-model-invocation: true
---

# /statut

Lecture seule. Lis `CLAUDE.md` (§6 points ouverts), la liste de tâches (TaskList si disponible) et, si présents, `docs/decisions/`.

Rends un point court : phase en cours et avancement, ce qui est terminé avec verdict VALIDÉ, ce qui est en cours, ce qui est bloqué, décisions attendues de Hery, points ouverts du CDC. Ne modifie rien.
