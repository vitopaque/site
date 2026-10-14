---
name: payload-roles
description: "Rôles et accès Payload de vitopaque.com : Administrateur et Éditeur limité aux articles. À utiliser pour les règles d'accès et les permissions."
---

# Rôles

- **Administrateur** (Hery) : accès complet.
- **Éditeur** (client) : **articles uniquement**, avec leurs images (Médias). Tout le reste lui est fermé (devis, utilisateurs). Pages de service, hubs, réalisations, coordonnées, navigation et réglages SEO ne sont pas dans l'admin : ils sont en code (voir `payload-modele`).
- Le client reçoit les devis par notification n8n, sans accès à la collection Demandes de devis.
- Contrôle d'accès au niveau des collections et des champs ; tester qu'un Éditeur ne peut ni lire ni écrire hors articles.
- Toute extension des droits de l'Éditeur est une décision pour Hery.
