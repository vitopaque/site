---
name: places-cache
description: "Avis Google sur vitopaque.com : API Places côté serveur, cache, sélection pour le carrousel, lien vers la fiche. À utiliser pour le carrousel d'avis."
---

# Avis Google

- Récupération **côté serveur**, mise en cache (revalidation), aucun widget tiers.
- L'API Places ne renvoie qu'un petit nombre d'avis : le carrousel en affiche une sélection, avec lien vers la fiche Google.
- Clé et identifiant de lieu en variables d'environnement (`GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`) ; la clé est créée sur un compte Google du client avec facturation activée.
- Dégradation propre si l'API échoue : garder le dernier cache valide.
- Vérifier les conditions d'affichage et d'attribution dans la documentation Google avant de concevoir l'affichage.
