# Architecture technique – vitopaque.com (proposition validée)

Octobre 13, 2026 · Hery Rakotomanana Andrianjohany

*Version Markdown de la référence. Le schéma d'architecture du document d'origine (Next.js, Payload, Postgres, n8n) n'est pas repris ici.*

## Vue d'ensemble

Proposition d'architecture pour la refonte de vitopaque.com, alignée sur le cahier des charges v1.1 et sur `DESIGN.md` v2.0. Elle est soumise à validation avant tout développement.

Le client publie dans l'admin Payload ; un hook invalide les pages concernées, que les visiteurs reçoivent depuis le cache. Les demandes de devis passent par l'API, sont enregistrées dans Postgres et déclenchent un webhook n8n.

## Décisions structurantes

Le site est une application Next.js avec Payload installé dans le même projet : le client publie seul depuis une interface d'administration, et chaque publication met à jour le site sans reconstruction complète. Tu maintiens l'ensemble, d'où le choix d'une seule base de code.

| Sujet | Choix | Alternative écartée | Raison |
| --- | --- | --- | --- |
| Framework | Next.js, App Router | Astro | Publication sans build complet grâce à l'ISR ; stack que tu maîtrises |
| CMS | Payload, installé dans l'application | Sanity, Keystatic | Données chez toi ; interface d'admin, authentification, médias, brouillons et versions intégrés ; pas de compte GitHub pour le client ; licence MIT |
| Hébergement | Vercel, fonctions réglées sur une région européenne | Docker sur un serveur | Choix validé ; mise en ligne simple, aperçus par branche, ISR pris en charge par la plateforme |
| Base de données | Supabase (Postgres), via `@payloadcms/db-postgres`, par le pooler en mode transaction | Vercel Postgres, MongoDB | Stack déjà utilisée ; à tester avec l'adaptateur Payload |
| Stockage des médias | Stockage objet, envoi direct depuis le navigateur | Disque du serveur | Sur Vercel, une requête de fonction est limitée à 4,5 Mo et le disque n'est pas durable ; Vercel Blob retenu |
| Demandes de devis | Collection Payload, avec notification par webhook n8n | Table Supabase séparée | Le client voit les demandes dans la même interface ; n8n envoie l'email ou alimente le CRM |
| Styles | Tailwind, tokens issus de `DESIGN.md` v2.0 | — | Même socle que la maquette |
| Polices | Montserrat, auto-hébergée (`next/font/local`) | Google Fonts | Exigence RGPD et performance du CDC |
| Langue | Français uniquement | Multilingue | Aucune exigence d'internationalisation dans le CDC |

## Routes du site

Les URLs reprennent celles du CDC v1.1 (§6.1 et §7.2). Les pages de service partagent un seul gabarit alimenté par des modules de contenu en code (TypeScript + MDX), contrôlés au build, ce qui garantit une structure identique et des balises uniques sur chaque page.

| Route | Page | Contenu géré dans | Rendu |
| --- | --- | --- | --- |
| `/` | Accueil | Contenu en code (accueil) | Statique |
| `/batiment` | Hub Bâtiment & Pro | Contenu en code (hubs) | Statique |
| `/voiture` | Hub Voiture | Contenu en code (hubs) | Statique |
| `/bateau` | Hub Bateau | Contenu en code (hubs) | Statique |
| `/film-solaire-batiment` | Page de service | Contenu en code (services) | Statique |
| `/film-securite-anti-effraction` | Page de service | Contenu en code (services) | Statique |
| `/film-pdlc-cristaux-liquides` | Page de service | Contenu en code (services) | Statique |
| `/vitrophanie-signaletique` | Page de service | Contenu en code (services) | Statique |
| `/vitres-teintees-auto` | Page de service | Contenu en code (services) | Statique |
| `/vitres-teintees-bateau` | Page de service | Contenu en code (services) | Statique |
| `/covering-et-flocage` | Page de service | Contenu en code (services) | Statique |
| `/realisations` | Galerie filtrable par univers et type de film | Contenu en code (réalisations) | Statique |
| `/realisations/[slug]` | Étude de cas (Problème, Solution, Résultat) | Contenu en code (réalisations) | Statique |
| `/conseils-expertises` | Index du blog | Collection Articles | ISR |
| `/conseils-expertises/[slug]` | Article | Collection Articles | ISR |
| `/a-propos` | Savoir-faire, garanties, partenaires | Contenu en code (à propos, partenaires) | Statique |
| `/contact-devis` | Formulaire de devis segmenté, coordonnées, plan d'accès | Configuration du site (code) | Statique, formulaire côté client |
| `/mentions-legales`, `/politique-de-confidentialite` | Pages légales | Contenu en code (pages légales) | Statique |
| `/sitemap.xml`, `/robots.txt` | Générés à partir des collections | — | Généré |
| `/admin`, `/api/*` | Interface Payload, API, webhooks | — | Serveur |

Les routes fixes (`/realisations`, `/conseils-expertises`, `/a-propos`, `/contact-devis`) l'emportent sur la route dynamique `/[slug]` des pages de service. Un slug inconnu renvoie une vraie page 404, et ces noms réservés sont interdits comme slugs de pages de service (contrôle au build).

**Décision :** trois pages hub, `/batiment`, `/voiture` et `/bateau`. Les deux premières gardent leurs URLs actuelles, donc sans redirection ; `/bateau` est séparée de `/voiture` pour ne pas brouiller le référencement de chaque univers. L'URL retenue pour la page contact est `/contact-devis`.

## Modèle de contenu

> **Révision du 14/10/2026 (décision de Hery) :** l'admin Payload ne sert plus qu'au blog. Le contenu du site est en code : modules TypeScript typés (métadonnées, H1, accroche, introduction, FAQ, SEO) et corps en MDX, un dossier par page. Les règles du CDC sont appliquées par un contrôle au build (un seul H1, titre et méta-description uniques, règle ville, slugs réservés) qui fait échouer `next build`.

| Collection Payload | Champs clés | Brouillons |
| --- | --- | --- |
| Articles | Titre, slug, extrait, contenu, image, auteur, page de service liée (obligatoire, pour le maillage interne ; la catégorie en est déduite : univers du service), date de publication, SEO | Oui |
| Auteurs | Nom, photo, description | Non |
| Médias | Fichier, texte alternatif (obligatoire, sans la ville), légende | Non |
| Demandes de devis | Univers, type de besoin, surface ou modèle de véhicule, photos, coordonnées, consentement RGPD, date | Non, accès privé |
| Utilisateurs | Email, rôle | Non |

| Contenu en code | Emplacement |
| --- | --- |
| Pages de service et hubs | `src/features/services/content/` |
| Coordonnées, horaires, réseaux, navigation du pied de page, modèle de titre | `src/features/site-settings/config.ts` |
| Accueil, à propos, pages légales, réalisations | module de la feature correspondante |

**Rôles :** Administrateur (toi, accès complet) et Éditeur (client : articles uniquement, avec leurs images). Le client n'a accès à rien d'autre ; il reçoit les demandes de devis par notification (n8n), sans accès à l'admin.

## Rendu et publication

Les pages du site (accueil, hubs, pages de service, réalisations, légales) sont statiques : le contenu est en code et la publication se fait par déploiement. Seuls les articles du blog sont prérendus en ISR et publiés depuis l'admin.

1. Le client enregistre un brouillon ou publie un article dans `/admin`.
2. Un hook Payload (`afterChange`) appelle `revalidatePath` ou `revalidateTag` pour les pages touchées.
3. La page est régénérée à la requête suivante, puis remise en cache.
4. Un appel de réchauffage vers l'URL publiée évite que le premier visiteur subisse la régénération.

| Contenu publié | Pages invalidées |
| --- | --- |
| Article | Sa page, l'index du blog, `/sitemap.xml`, la page de service liée |
| Contenu en code | Aucune : le déploiement reconstruit les pages |

- **Aperçu :** pour le contenu en code, les déploiements d'aperçu par branche de Vercel. Pour les articles, le mode brouillon de Next.js avec un secret (le paramètre `draft` de l'API Payload renvoie les brouillons), à évaluer ensuite.
- **Contrainte d'hébergement :** sur Vercel, la plateforme prend en charge l'ISR (la documentation Next.js indique un support propre à chaque plateforme) ; l'export statique est exclu.
- **Publication planifiée :** Payload la propose, mais elle exige un traitement de tâches en arrière-plan d'après sa documentation. Hors périmètre de la première version.

## SEO technique

Le gabarit applique les règles du CDC v1.1 (§7) pour que le client ne puisse pas les contourner en publiant.

| Sujet | Mise en œuvre |
| --- | --- |
| Titres et méta-descriptions | `generateMetadata` lit les champs SEO de chaque document ; modèle de titre global ; balise canonique absolue sur chaque page |
| Un H1 par page | Le gabarit gère le H1 à partir du champ « H1 » ; les titres du contenu éditable commencent à H2 |
| Ancrage local naturel | Une règle de validation refuse « Montpellier 34 » et « 34740 » dans les titres, les H1, les textes alternatifs et les noms de fichiers ; « Montpellier » reste autorisé dans l'introduction et la méta-description |
| Plan du site | `app/sitemap.ts` génère le `sitemap.xml` à partir des seuls documents publiés ; `app/robots.ts` le déclare ; envoi dans la Search Console au lancement |
| Données structurées | `LocalBusiness` (global Coordonnées), `Service` (pages de service), `FAQPage` (questions fréquentes), `BlogPosting` (blog), `BreadcrumbList` (toutes les pages) |
| Redirections 301 | Liste versionnée dans `next.config.ts`, générée à partir du plan du CDC §7.4 (8 URLs, FAQ, blog et 11 articles). Une gestion depuis l'admin est possible plus tard, mais exigerait de recharger la liste sans redéploiement |
| Images | `next/image` en AVIF et WebP, tailles déclarées, chargement différé sauf l'image principale de la page ; texte alternatif obligatoire et descriptif |
| Domaine | Une seule version (avec ou sans `www`), l'autre redirigée en 301 ; HTTPS partout ; pas de slash final |
| Pages 404 | Vraie page 404 avec liens vers les univers et le contact |

## Devis, avis Google, en-tête et performance

### Formulaire de devis segmenté

1. Le visiteur choisit l'univers (bâtiment, voiture ou bateau), puis le type de besoin ; les champs suivants (surface ou modèle de véhicule) s'adaptent.
2. Les photos partent directement du navigateur vers le stockage, par un lien signé, car une fonction Vercel n'accepte pas plus de 4,5 Mo par requête ; le formulaire n'envoie que leurs références, avec une limite de taille et de nombre.
3. Une route serveur valide les données et le consentement RGPD, puis écrit dans la collection Demandes de devis.
4. Un hook appelle un webhook n8n qui envoie l'email à l'entreprise et alimente le CRM si besoin.
5. Un anti-spam sans service tiers (champ piège et limitation de débit) évite les envois automatiques.

Les clics sur le téléphone et les soumissions sont suivis comme conversions.

### Avis Google

Les avis sont récupérés côté serveur et mis en cache, plutôt que par un widget tiers qui alourdit la page. L'API Places ne renvoie qu'un petit nombre d'avis : le carrousel de l'accueil en affichera donc une sélection. Choix validé : API Places mise en cache, avec lien vers la fiche Google.

### En-tête de l'accueil (sans vidéo)

- **Décision :** pas de vidéo d'en-tête, abandonnée pour sa complexité. L'en-tête reprend la maquette de référence (`code.html`, `screen.png`) : accroche, appel à l'action et simulateur interactif PDLC, adaptés à la charte v2.0.
- Le texte de l'accroche ou une image légère est l'élément LCP.
- Le simulateur est un composant client chargé à l'affichage de sa zone.

### Performance

- Les pages sont des composants serveur : le JavaScript client se limite au curseur avant / après, au carrousel, au formulaire et au menu mobile.
- Le curseur avant / après et le carrousel se chargent à l'affichage de leur zone.
- Objectif du CDC : Core Web Vitals au vert sur mobile et desktop, mesurés avant et après la mise en ligne.
- Mesure d'audience : Vercel Analytics, Search Console et Google Analytics 4. GA4 n'est chargé qu'après consentement (bandeau RGPD, chargement conditionnel du script) ; les conversions (devis, clic téléphone) sont envoyées comme événements GA4.

## Hébergement, exploitation et plan par phases

### Hébergement

Choix validé : Vercel pour l'application, Supabase pour la base Postgres. Cinq réglages en découlent.

| Sujet | Réglage | Raison |
| --- | --- | --- |
| Région | Fonctions Vercel et projet Supabase tous deux en Europe | Données en Europe (RGPD) ; par défaut, les fonctions Vercel s'exécutent dans une seule région, `iad1`, à changer |
| Connexion à la base | Pooler Supabase en mode transaction (port 6543), sans prepared statements | Recommandé par Supabase pour le serverless ; à valider avec l'adaptateur Payload |
| Envoi de fichiers | Directement du navigateur vers le stockage objet | Limite de 4,5 Mo par requête de fonction Vercel, rappelée par la documentation Payload |
| Stockage des médias | Vercel Blob, via l'adaptateur officiel Payload (choix validé) | Le disque n'est pas durable en serverless |
| Formule Vercel | Pro obligatoire : la documentation Vercel réserve l'offre gratuite Hobby à un usage non commercial et classe comme commercial tout site qui promeut un service ou rémunère celui qui le crée ou l'héberge | Site d'une entreprise |

Exploitation : les déploiements d'aperçu de Vercel servent de préproduction (à vérifier qu'ils sont bien en `noindex`), sauvegardes de la base côté Supabase et des médias côté stockage, mises à jour planifiées de Next.js et de Payload, supervision de la disponibilité.

### Plan par phases

Les phases suivent celles du CDC v1.1 (§10.1).

1. **Cadrage :** validation de cette architecture et de la liste des silos (étude de mots-clés).
2. **Socle :** projet Next.js et Payload, base Supabase, tokens de `DESIGN.md` v2.0, collections et rôles.
3. **Gabarits :** accueil, hub, page de service, étude de cas, article, contact et devis.
4. **Contenus :** saisie des pages de service, études de cas et premiers articles.
5. **SEO et migration :** métadonnées, données structurées, sitemap, redirections 301 testées sur la préproduction.
6. **Recette et mise en ligne :** contrôle des Core Web Vitals, formation du client à l'administration, suivi des 404 et de l'indexation.

### Points à valider

- [x] Hébergement : Vercel, formule Pro (usage commercial).
- [x] Compte Vercel : celui du client, qui porte l'abonnement Pro ; tu y es invité comme membre (coût de ton siège à vérifier).
- [x] Pages hub : `/batiment`, `/voiture` et `/bateau`.
- [x] Base de données : Supabase, sur le compte du client.
- [x] Stockage des médias : Vercel Blob.
- [x] Rôle Éditeur du client : articles uniquement.
- [x] Demandes de devis stockées dans Payload, avec notification par n8n.
- [x] Avis Google : API Places mise en cache.
- [x] Mesure d'audience : Vercel Analytics, Search Console et GA4 (avec bandeau de consentement).
- [x] Dépôt Git : compte GitHub créé au nom du client, dépôt privé, toi invité comme collaborateur.
- [x] Supabase : deux projets (production et préproduction) sur le compte du client.
- [x] Préproduction : URL `*.vercel.app` en `noindex`, sans sous-domaine dédié.
- [x] Tests : Playwright limité aux parcours critiques (devis, redirections 301, balises SEO).
- [x] Structure : une seule application Next.js + Payload, sans monorepo ; pnpm, TypeScript strict, migrations Payload versionnées.
