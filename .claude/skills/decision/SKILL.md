---
name: decision
description: "Soumet une décision à Hery avec options et recommandation, puis l'enregistre dans docs/decisions/."
argument-hint: "<sujet de la décision>"
disable-model-invocation: true
---

# /decision $ARGUMENTS

1. Lis `CLAUDE.md` : la décision est-elle déjà tranchée ? Si oui, cite-la et arrête-toi ; si elle la contredit, c'est un écart à soumettre à Hery.
2. Formule le problème en deux phrases, 2 à 4 options avec avantages, coûts, réversibilité, et **ta recommandation**.
3. Pose la question à Hery avec AskUserQuestion. Attends la réponse.
4. Après validation, délègue à `contenu` l'écriture de `docs/decisions/AAAA-MM-JJ-<slug>.md` : contexte, options, décision, conséquences. Si elle modifie un document de référence ou `CLAUDE.md`, propose la modification à Hery avant de l'appliquer.
