---
name: seo-audit
description: "Audit SEO d'une page ou du site (balises, JSON-LD, maillage, redirections) contre les règles de CLAUDE.md. Lecture seule."
argument-hint: "[page ou URL]"
disable-model-invocation: true
context: fork
agent: qa
---

Audit SEO de : $ARGUMENTS (si vide, les gabarits principaux).

Vérifie par rapport à `CLAUDE.md` et à `regles-seo-locales` : title et meta description, un seul H1, hiérarchie des titres, JSON-LD, canonical, noindex en préprod, sitemap et robots, redirections 301 des anciennes URL, maillage local. **Audit uniquement : ne modifie aucun fichier.** Rapport : constats classés par gravité avec preuve, puis actions recommandées.
