---
name: qa-controles-seo-a11y
description: "Contrôles qualité de vitopaque.com : Core Web Vitals, accessibilité WCAG AA, conformité aux règles de CLAUDE.md (SEO local, tokens, rôles). À utiliser avant de valider un travail."
---

# Contrôles

- **Core Web Vitals** : vert sur mobile et desktop, mesurés avant (ancien site) et après.
- **Accessibilité AA** : contrastes (voir règles sur Anthracite et bleu), navigation clavier, alt présents.
- **Règles SEO** : grep des interdits (« Montpellier 34 », « 34740 », ville dans H1/titres/alt/noms de fichiers) ; un seul H1 ; sitemap limité aux pages publiées ; `noindex` en préproduction.
- **Design** : aucune couleur en dur hors tokens ; pas de vidéo d'en-tête.
- **Rôles** : un Éditeur ne peut agir que sur les articles.
- **RGPD** : aucun traceur GA4 avant consentement.
- Rapport court : conforme / non conforme, avec fichier et ligne.
