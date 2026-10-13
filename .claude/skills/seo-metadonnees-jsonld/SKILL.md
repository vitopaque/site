---
name: seo-metadonnees-jsonld
description: "SEO technique de vitopaque.com : generateMetadata, canoniques, JSON-LD (LocalBusiness, Service, FAQPage, Article, BreadcrumbList), sitemap.ts, robots.ts. À utiliser pour balises et données structurées."
---

# Métadonnées et données structurées

Source : `architecture-technique.md`, section « SEO technique ».

- `generateMetadata` lit les champs SEO du document ; modèle de titre global ; canonique absolue.
- JSON-LD : `LocalBusiness` (global Coordonnées et horaires), `Service` (pages de service), `FAQPage` (questions fréquentes), `Article` (blog), `BreadcrumbList` (toutes les pages).
- `app/sitemap.ts` : uniquement les documents **publiés** ; `app/robots.ts` le déclare. Soumission Search Console au lancement.
- Préproduction `*.vercel.app` : `noindex` à vérifier.
- Respecter `regles-seo-locales`. Valider le JSON-LD avec un outil officiel avant de conclure.
