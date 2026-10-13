# .claude — équipe d'agents de la refonte vitopaque.com

Lancer l'orchestrateur comme agent principal (il doit pouvoir te poser des questions) :

    claude --agent orchestrateur

- `agents/` : un orchestrateur (ne code pas), 7 spécialistes et un `reviewer` (revue bloquante, lecture seule). Chacun préchargé uniquement avec ses skills et sans l'outil `Skill`, donc il ne voit pas les autres.
- `skills/` : 4 skills **communs** (`principes-code`, `conventions-repo`, `regles-seo-locales`, `garde-fous-gouvernance`), 2 skills de revue, 7 commandes et les skills de spécialité, courts. Le détail vit dans les documents de référence, lus par section.
- Source de vérité : `CLAUDE.md` (immuable) puis les documents de référence. Ces fichiers n'ajoutent aucune règle : ils les appliquent.

| Agent | Skills préchargés |
| --- | --- |
| orchestrateur | (aucun : il lit `CLAUDE.md`, délègue, contrôle) |
| cms-payload | garde-fous-gouvernance, principes-code, conventions-repo, regles-seo-locales, payload-modele, payload-hooks-isr, payload-roles |
| frontend | garde-fous-gouvernance, principes-code, conventions-repo, regles-seo-locales, next-app-router, ui-tokens-design |
| seo | garde-fous-gouvernance, principes-code, conventions-repo, regles-seo-locales, seo-metadonnees-jsonld, seo-redirections |
| integrations | garde-fous-gouvernance, principes-code, conventions-repo, devis-n8n, places-cache, rgpd-consentement-ga4 |
| infra-data | garde-fous-gouvernance, principes-code, conventions-repo, supabase-pooler, vercel-blob-upload |
| contenu | garde-fous-gouvernance, regles-seo-locales, redaction-ton-de-voix |
| qa | garde-fous-gouvernance, principes-code, conventions-repo, regles-seo-locales, qa-playwright-parcours, qa-controles-seo-a11y |
| reviewer | garde-fous-gouvernance, principes-code, conventions-repo, regles-seo-locales, revue-solid-dry-feature-first, revue-erreurs-bonnes-pratiques |

## Commandes

| Commande | Rôle | Exécution |
| --- | --- | --- |
| `/phase0` | Socle technique, validation à chaque étape | session orchestrateur |
| `/feature <nom>` | Fonctionnalité de bout en bout, revue bloquante puis QA | session orchestrateur |
| `/decision <sujet>` | Options, recommandation, décision enregistrée dans `docs/decisions/` | session orchestrateur |
| `/statut` | Avancement, points ouverts | session orchestrateur |
| `/revue [cible]` | Revue bloquante (VALIDÉ ou BLOQUANT) | sous-agent `reviewer` isolé |
| `/qa [cible]` | Parcours, SEO, accessibilité | sous-agent `qa` isolé |
| `/seo-audit [page]` | Audit SEO en lecture seule | sous-agent `qa` isolé |

Les commandes sont déclenchées uniquement par toi (`disable-model-invocation`).
