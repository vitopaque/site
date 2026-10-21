# CLAUDE.md — Refonte de vitopaque.com

> Contexte général du projet. **Immuable** : aucune ligne de ce fichier n'est modifiée sans validation explicite de Hery. En cas de conflit entre une demande et ce fichier, on s'arrête et on soumet la déviation à Hery avant de l'appliquer. Jamais de déviation silencieuse.

## 1. Projet

- **Client :** VIT'OPAQUE — « Films de prestige », Vendargues (34), aux portes de Montpellier. Pose de films adhésifs pour vitrages : bâtiment (solaires, sécurité anti-effraction, PDLC), automobile et bateau (vitres teintées), vitrophanie, signalétique, covering.
- **Objectif :** refonte et rebranding de vitopaque.com. Enjeu SEO fort, positionnement premium (architecture d'intérieur, automobile de luxe), plus de demandes de devis qualifiées.
- **Responsable technique :** Hery (lead dev), qui maintient le site. Langue de travail et du site : **français uniquement**.
- **Situation de départ :** 177 visites Google en 16 mois, position moyenne 41,6, 8 pages sur environ 21 indexées. Détail dans le cahier des charges.

## 2. Documents de référence (à lire à la demande, pas systématiquement)

| Besoin | Fichier |
| --- | --- |
| Objectifs, cibles, SEO, redirections, indicateurs | `cahier-des-charges-v1.1.md` |
| Stack, routes, modèle Payload, rendu, hébergement | `architecture-technique.md` |
| Tokens et règles de design | `DESIGN.md` (v3.0) |
| **Maquette de référence** de l'interface (structure et habillage) | `maquette-v3.html` (copie lisible de `Vitopaque.html`), avec `DESIGN.md` v3.0. `code.html` et `screen.png` sont historiques |
| Mots-clés, règles d'écriture, décisions SEO validées par le client | `Stratégie de référencement Google du nouveau site VIT'OPAQUE.pdf` |
| Logos | `logo.png`, `logo_clair.png`, `favicon/` |

Ne charger que la section utile d'un document. Les documents prévalent sur toute supposition ; ce fichier prévaut sur les documents en cas de contradiction apparente, à signaler à Hery.

## 3. Stack validée (verrouillée)

- **Application :** Next.js (App Router) avec **Payload installé dans la même application**. Une seule base de code, sans monorepo. Payload ne sert que le **blog** (articles, médias, utilisateurs) et la réception des devis ; le reste du contenu du site (pages de service, hubs, réalisations, coordonnées, navigation, réglages SEO) est **en code** : modules TypeScript typés et corps MDX (`@next/mdx`), publiés par déploiement.
- **Base de données :** Supabase (Postgres) via `@payloadcms/db-postgres`, par le **pooler en mode transaction (port 6543)**, sans prepared statements (à valider avec l'adaptateur). Deux projets : production et préproduction.
- **Hébergement :** Vercel, **formule Pro** (usage commercial), fonctions en région européenne. Projet sur le compte Vercel du client.
- **Médias :** images de l'admin (articles) sur Vercel Blob via l'adaptateur Payload officiel, **envoi direct navigateur → stockage** (limite de 4,5 Mo par requête de fonction Vercel ; disque non durable). Les images fixes du site sont dans le dépôt (WebP, `next/image`). Les vidéos du site (réalisations) sont hébergées sur Vercel Blob (store européen relié au projet), sans lecteur tiers et sans lecture automatique.
- **Rendu :** pages du site statiques (contenu en code, publication par déploiement) ; articles prérendus en ISR, avec un hook Payload `afterChange` qui appelle `revalidatePath` / `revalidateTag`. Pas d'export statique. Un contrôle au build (`assertValidContent`) refuse le contenu qui enfreint les règles SEO (H1, unicité des titres et méta-descriptions, règle ville).
- **Devis :** collection Payload privée + webhook **n8n** (email, CRM éventuel). Anti-spam sans service tiers.
- **Avis Google :** API Places, côté serveur, mise en cache. Pas de widget tiers.
- **Mesure :** Vercel Analytics, Search Console, **GA4 chargé uniquement après consentement** (bandeau RGPD).
- **Styles :** Tailwind, tokens issus de `DESIGN.md`. **Polices :** Barlow et Barlow Condensed auto-hébergées (`next/font/local`).
- **Outillage :** pnpm, TypeScript strict, ESLint, Prettier, Node LTS verrouillée (`.nvmrc`, `engines`). Tests Playwright limités aux parcours critiques (devis, redirections 301, balises SEO). Migrations Payload versionnées, jamais de synchronisation automatique du schéma en production.
- **Git :** dépôt privé GitHub **au nom du client**, Hery collaborateur. Branche `main` protégée, branches `feat/*`, commits conventionnels. Préproduction = URL `*.vercel.app` en `noindex`.
- Versions des dépendances : vérifiées et figées à la création du projet, jamais « de mémoire ».

## 4. Règles métier impératives

### Routes
- Hubs : `/batiment`, `/voiture`, `/bateau` (les deux premières gardent leurs URLs actuelles).
- 7 pages de service : `/film-solaire-batiment`, `/film-securite-anti-effraction`, `/film-pdlc-cristaux-liquides`, `/vitrophanie-signaletique`, `/vitres-teintees-auto`, `/vitres-teintees-bateau`, `/covering-et-flocage`.
- Fixes : `/realisations(/[slug])`, `/conseils-expertises(/[slug])`, `/a-propos`, `/contact-devis`, pages légales. Les routes fixes l'emportent sur `/[slug]` ; ces noms sont réservés. Slug inconnu = vraie 404.
- La liste des 7 silos est validée par le client, avec la stratégie de référencement : ne pas en ajouter ni en retirer sans validation de Hery.

### SEO
- Un seul H1 par page, géré par le gabarit. Titre et méta-description **uniques** par page. Canonique absolue partout.
- **Montpellier** : une mention naturelle dans l'introduction, un H2 si pertinent et la méta-description de chaque page de service. **Jamais** « Montpellier 34 » ni « 34740 » dans les contenus (le code postal reste autorisé dans l'adresse postale : pied de page, données structurées `LocalBusiness`) ; jamais la ville dans les H1, titres de page, textes alternatifs ou noms de fichiers. Pas de pages « service + ville ».
- Une requête principale par URL. Chaque article renvoie à sa page de service.
- Texte alternatif obligatoire, descriptif et sobre. Noms de fichiers sobres.
- Données structurées : `LocalBusiness`, `Service`, `FAQPage`, `BlogPosting` (sous-type d'`Article`), `BreadcrumbList`. `sitemap.xml` et `robots.txt` générés ; une seule version du domaine ; HTTPS ; pas de slash final.
- Redirections 301 versionnées dans `next.config.ts` d'après le plan du CDC §7.4. Blog repris de zéro : les 11 anciens articles et la FAQ ne sont que redirigés.
- Coordonnées et horaires : **source unique** (module de configuration `site-settings`), pour supprimer les horaires contradictoires de l'ancien site.
- Zone d'intervention : également issue de `site-settings` (source unique). Automobile : dans les locaux de Vendargues. Bâtiment : Hérault, Gard et Aude, et Occitanie à partir de 30 m². Film à cristaux liquides : toute la France.

### Accueil et maquette
- **Pas de vidéo d'en-tête** (décision figée : complexité injustifiée). L'en-tête de l'accueil reprend la lentille de verre dépoli de la maquette, avec un repli tactile (pas de suivi du pointeur).
- La maquette de référence est `maquette-v3.html` (copie lisible de `Vitopaque.html`) ; `code.html` et `screen.png` sont historiques. Elle fixe la structure **et** l'habillage, consignés dans `DESIGN.md` v3.0. Sections ajoutées, validées par Hery : univers Bâtiment / Voiture / Bateau, avis Google, guides experts, études de cas chiffrées ; les films du laboratoire sont alignés sur les silos. Toute autre divergence par rapport à la maquette est soumise à Hery.

### Rôles et contenu
- L'admin Payload ne sert qu'au **blog**. **Administrateur** : Hery, accès complet. **Éditeur** (client) : **articles uniquement**, avec leurs images. Pages de service, hubs, réalisations, coordonnées, navigation et réglages SEO sont du contenu en code, modifié par Hery et publié par déploiement. Les devis sont stockés dans une collection privée réservée à l'administrateur ; le client les reçoit par notification, sans accès à l'admin.
- Publication planifiée : hors périmètre de la première version.

### Design
- Tokens de `DESIGN.md` v3.0 uniquement (définis dans `tokens.css`) : fond `#F2F2F3`, surface `#E9E9EA`, texte `#1D1F20`, neutre `#5D5D60`, accent bleu acier (`#5980A6`, `#EEF6FF`, `#D6EBFF`, `#B5D9FD`, `#416180`, `#1D2D3D`). Aucune couleur, police ni durée en dur.
- **Contraste :** niveau AA des WCAG, avec les combinaisons autorisées du tableau de `DESIGN.md` ; pas de petit texte en opacité réduite.
- Rayons à 0 (sauf pastilles), filets 1 px, repères d'angle, effet verre, animations de 250 ms à 1,2 s (reflet en boucle de 8 s), `prefers-reduced-motion` respecté. Logo : jamais déformé, jamais d'ombre ni d'effet 3D, version couleur uniquement sur fond sombre.
- Ton éditorial : confiant, épuré, rassurant ; du technique au bénéfice client.

### Performance et conformité
- Core Web Vitals au vert (mobile et desktop). Composants serveur par défaut ; JavaScript client limité à la lentille d'en-tête, au laboratoire de films, au manifeste, au curseur avant/après, au carrousel, au formulaire et au menu mobile. Le texte de l'accroche ou une image légère sert de LCP.
- RGPD : consentement avant tout traceur GA4, consentement enregistré avec chaque demande de devis, polices auto-hébergées.

### Principes de code (SOLID, DRY, feature-first)
- **Architecture feature-first** : `src/app` ne contient que le routage (pages minces qui appellent les features) ; chaque fonctionnalité vit dans `src/features/<feature>/` (collection, hooks, accès, validateurs, requêtes, composants, SEO, types) ; le transverse vit dans `src/shared/`. `payload.config.ts` assemble les features.
- **Règle de dépendance** : `app` → `features` → `shared`. Une feature n'expose que son `index.ts` ; aucune autre feature n'importe ses fichiers internes ; `shared` n'importe aucune feature. Appliquée par ESLint (`no-restricted-imports` + `eslint-plugin-boundaries`), exécuté par `pnpm lint` en local et en CI (validé par Hery).
- **SOLID**, en TypeScript fonctionnel : responsabilité unique (hooks, validateurs, requêtes, composants séparés), ouvert/fermé (fabriques de champs et de configuration), dépendances inversées (n8n, Places, GA4 derrière des interfaces propres à leur feature, donc testables).
- **DRY** : un seul gabarit pour les 7 pages de service, un seul builder SEO, un seul champ SEO Payload (articles), un seul contrôle de contenu, tokens uniques. On factorise dès la deuxième duplication réelle, pas par anticipation ni pour une ressemblance fortuite.
- Détail et exemples : skill `principes-code`.

## 5. Gouvernance du travail

1. **Architecture d'abord, puis fidélité.** L'architecture validée n'est pas remise en cause en silence. Raison sérieuse de s'en écarter : s'arrêter, la présenter à Hery, attendre sa validation.
2. **S'arrêter et demander** pour toute décision structurante : architecture, choix difficilement réversible, ambiguïté réelle, arbitrage entre options non équivalentes, coût récurrent, service tiers nouveau. **Avancer sans demander** sur les tâches simples et sans enjeu.
3. Raisonner de façon explicite et incrémentale ; comprendre le fond avant d'agir.
4. Ne jamais rien affirmer de mémoire sur une version, une limite ou un prix de service : vérifier dans la documentation officielle.
5. Aucun commit, push ni déploiement sans demande de Hery. Aucun secret dans le dépôt (`.env.example` documenté uniquement).
6. Les valeurs hors périmètre de ce fichier (cibles chiffrées, liste des communes, codes couleur définitifs) sont **ouvertes** : ne pas les inventer.
7. **Revue bloquante** : tout code produit par un agent passe par l'agent `reviewer` (qualité, erreurs, bonnes pratiques, SOLID, DRY, feature-first) puis par `qa`. Rien n'est présenté comme terminé sans verdict VALIDÉ du `reviewer`. Les tâches courantes se lancent par les commandes du dossier `.claude/skills/` (`/feature`, `/revue`, `/qa`, `/seo-audit`, `/decision`, `/statut`, `/phase0`).

## 6. Points ouverts (à ne pas trancher seul)

codes couleur à confirmer sur le logo vectoriel (SVG) · lecture des 11 anciens articles pour valider les redirections · points de départ manquants (devis, appels, itinéraires) · valeurs cibles des indicateurs.
