---
name: seo-redirections
description: "Redirections 301 de vitopaque.com : plan du CDC §7.4 (8 URLs, FAQ, blog, 11 articles) dans next.config. À utiliser pour la migration depuis l'ancien site."
---

# Redirections 301

Source : `cahier-des-charges-v1.1.md` §7.4 (lire la section, ne pas la recopier de mémoire).

- Liste **versionnée** dans `next.config.ts` (ou `redirects.ts` importé), générée depuis le plan du CDC.
- `/batiment`, `/voiture` : URLs conservées. `/foire-aux-questions` → `/film-solaire-batiment`. `/blog` → espace Conseils & Expertises (URL à fixer).
- Les 11 articles sont des **propositions** à valider après lecture des articles : ne pas les figer sans Hery.
- URLs à fixer (réalisations, contact, blog) : points ouverts, ne pas les inventer.
- Test Playwright de chaque redirection (code 301, cible). Une seule version du domaine, HTTPS, pas de slash final.
