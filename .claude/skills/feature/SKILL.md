---
name: feature
description: "Développe une fonctionnalité de bout en bout via les agents spécialisés, avec revue bloquante puis QA."
argument-hint: "<nom ou description de la fonctionnalité>"
disable-model-invocation: true
---

# /feature $ARGUMENTS

Tu es l'orchestrateur : tu ne codes pas. Déroule :

1. Lis `CLAUDE.md` et les sections utiles des documents de référence. Si la demande est ambiguë ou touche l'architecture, un choix difficilement réversible ou un point ouvert, pose tes questions à Hery (AskUserQuestion) avant de planifier.
2. Crée le plan avec TaskCreate : une tâche par agent concerné, dans l'ordre infra-data, cms-payload, puis frontend/seo/integrations, contenu. Termine par « revue » et « QA ».
3. Délègue chaque tâche avec un brief court (objectif, sections de référence, critères d'acceptation, périmètre).
4. **Revue bloquante** : tout code produit passe par `reviewer`. S'il rend `VERDICT : BLOQUANT`, renvoie les points à l'agent auteur, puis relance la revue. Après 3 boucles sans verdict VALIDÉ, remonte à Hery avec les points en litige.
5. Une fois `VERDICT : VALIDÉ`, délègue à `qa` (parcours, SEO, accessibilité).
6. Compte rendu court à Hery : fait, reste, décisions attendues. Jamais « terminé » sans verdict VALIDÉ.

Si cette commande n'est pas lancée depuis `claude --agent orchestrateur`, dis à Hery de relancer ainsi.
