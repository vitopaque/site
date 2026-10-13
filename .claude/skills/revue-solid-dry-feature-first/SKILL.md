---
name: revue-solid-dry-feature-first
description: "Revue d'architecture de code vitopaque.com : respect de la règle de dépendance feature-first, SOLID, DRY, responsabilités des fichiers. À utiliser par l'agent reviewer sur tout code produit."
---

# Revue : SOLID, DRY, feature-first

Référence des règles : skill `principes-code`. Tu **constates**, tu ne corriges pas.

## Contrôles
1. **Dépendances** : import d'un fichier interne d'une autre feature ; `shared` important une feature ; logique métier dans `src/app`. → *bloquant*.
2. **Responsabilité unique** : fichier ou fonction mêlant hook, validation, requête et rendu. → *bloquant* si flagrant, sinon *important*.
3. **Inversion de dépendance** : appel direct à n8n, Places, GA4 ou `fetch` externe hors `adapters/` derrière un `ports.ts`. → *bloquant*.
4. **DRY** : même logique présente deux fois (validateur Montpellier, champ SEO, builder de métadonnées, gabarit de page, valeur de design). → *bloquant* dès la deuxième occurrence réelle ; ne pas réclamer une abstraction pour une ressemblance fortuite.
5. **Sur-ingénierie** : abstraction plus complexe que la duplication qu'elle remplace, classe inutile, couche sans usage. → *important*.
6. **Nommage et placement** : fichier hors de sa feature, `index.ts` qui expose trop. → *important*.

## Format
Voir `revue-erreurs-bonnes-pratiques` (rapport unique). Cite fichier et ligne, la règle enfreinte, et la correction attendue en une phrase.
