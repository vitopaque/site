---
name: payload-modele
description: "Modèle de contenu de vitopaque.com : Payload limité au blog, contenu du site en code (TypeScript + MDX), règles du CDC contrôlées au build. À utiliser pour créer ou modifier une collection Payload ou une page de contenu."
---

# Modèle de contenu

Source : `architecture-technique.md`, section « Modèle de contenu ». Organisation : feature-first (skill `principes-code`).

## Payload (blog et données seulement)
- Collections : Articles, Auteurs, Médias, Demandes de devis, Utilisateurs. Aucun global.
- Chaque collection vit dans **sa feature** (`src/features/<feature>/collection.ts`) ; `payload.config.ts` les assemble.
- `versions.drafts` sur Articles. Page de service liée **obligatoire** sur Articles. Texte alternatif obligatoire sur Médias.
- Demandes de devis : accès privé, consentement RGPD stocké.
- Vérifier la documentation Payload avant toute API incertaine.

## Contenu du site (en code)
- Pages de service et hubs : `src/features/services/content/` (types, un module TypeScript par page + corps MDX), registre dans `content/index.ts`.
- Coordonnées, horaires, réseaux, navigation du pied de page, modèle de titre : `src/features/site-settings/config.ts` (source unique).
- Contrôle au build (`assertValidContent`) : H1, titre et méta-description non vides, uniques et dans les longueurs ; règle ville ; slugs réservés ; un hub par univers utilisé ; liens internes du pied de page existants.
- Règle ville (`src/shared/content/city-rules.ts`, une seule définition) : refuser « Montpellier 34 » et « 34740 » partout ; la ville seule est interdite dans H1, titres, alt et noms de fichiers.
- Slugs réservés : realisations, conseils-expertises, a-propos, contact-devis, mentions-legales, politique-de-confidentialite, admin, api.
- Ne pas ajouter ni retirer de page de service sans validation de la liste des silos par Hery.
