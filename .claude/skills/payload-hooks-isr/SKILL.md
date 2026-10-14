---
name: payload-hooks-isr
description: "Hooks Payload et revalidation ISR Next.js pour vitopaque.com : afterChange, revalidatePath, revalidateTag, mode brouillon, tag global. À utiliser pour la publication et l'invalidation du cache."
---

# Hooks et ISR

Source : `architecture-technique.md`, section « Rendu et publication ». **Périmètre : le blog seulement** (articles). Les pages du site sont du contenu en code, statique, publié par déploiement : aucun hook pour elles.

- `afterChange` appelle `revalidatePath` / `revalidateTag` pour les pages touchées, puis un appel de réchauffage vers l'URL publiée.
- Invalidations : Article → sa page, l'index du blog, `/sitemap.xml`, la page de service liée.
- Aperçu : mode brouillon de Next.js avec secret ; paramètre `draft` de l'API Payload.
- Ne revalider qu'à la publication, pas à l'enregistrement d'un brouillon.
- Pas d'export statique. Publication planifiée : hors périmètre v1.
- Vérifier les APIs Next.js et Payload dans la documentation avant usage.
