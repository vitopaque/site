---
name: payload-modele
description: "Modèle de contenu Payload de vitopaque.com : collections, globals, brouillons, champs imposant les règles du CDC (H1, alt, SEO), un dossier par feature. À utiliser pour créer ou modifier une collection ou un global."
---

# Modèle Payload

Source : `architecture-technique.md`, section « Modèle de contenu Payload ». Organisation : feature-first (skill `principes-code`).

- Chaque collection ou global vit dans **sa feature** (`src/features/<feature>/collection.ts`) ; `payload.config.ts` les assemble. Les champs communs (SEO, H1) sont des fabriques dans `shared`, jamais recopiés.
- Collections : Pages de service, Pages hub, Études de cas, Articles, Pages simples, Auteurs, Partenaires, Types de film, Médias, Demandes de devis, Utilisateurs. Globals : Accueil, À propos, Coordonnées et horaires, Navigation, Réglages SEO.
- `versions.drafts` sur : Pages de service, Pages hub, Études de cas, Articles, Pages simples.
- Champs qui imposent les règles : un seul champ H1, méta-description unique, **texte alternatif obligatoire** sur Médias, page de service liée **obligatoire** sur Articles.
- Validation (un seul validateur partagé) : refuser « Montpellier 34 » et « 34740 » dans titres, H1, alt et noms de fichiers.
- Slugs réservés interdits dans Pages de service : realisations, conseils-expertises, a-propos, contact-devis.
- Coordonnées et horaires : source unique (footer, contact, `LocalBusiness`).
- Demandes de devis : accès privé, consentement RGPD stocké.
- Vérifier la documentation Payload avant toute API incertaine.
