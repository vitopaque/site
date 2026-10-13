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
| Tokens et règles de design | `DESIGN.md` (v2.0) |
| **Maquette de référence** de l'interface (à adapter aux tokens v2.0 : couleurs, Montserrat, rayons) | `code.html`, `screen.png` |
| Logos | `logo.png`, `logo_clair.png`, `favicon/` |

Ne charger que la section utile d'un document. Les documents prévalent sur toute supposition ; ce fichier prévaut sur les documents en cas de contradiction apparente, à signaler à Hery.

## 3. Stack validée (verrouillée)

- **Application :** Next.js (App Router) avec **Payload installé dans la même application**. Une seule base de code, sans monorepo.
- **Base de données :** Supabase (Postgres) via `@payloadcms/db-postgres`, par le **pooler en mode transaction (port 6543)**, sans prepared statements (à valider avec l'adaptateur). Deux projets : production et préproduction.
- **Hébergement :** Vercel, **formule Pro** (usage commercial), fonctions en région européenne. Projet sur le compte Vercel du client.
- **Médias :** Vercel Blob via l'adaptateur Payload officiel, **envoi direct navigateur → stockage** (limite de 4,5 Mo par requête de fonction Vercel ; disque non durable).
- **Rendu :** pages prérendues en ISR ; un hook Payload `afterChange` appelle `revalidatePath` / `revalidateTag`. Pas d'export statique.
- **Devis :** collection Payload privée + webhook **n8n** (email, CRM éventuel). Anti-spam sans service tiers.
- **Avis Google :** API Places, côté serveur, mise en cache. Pas de widget tiers.
- **Mesure :** Vercel Analytics, Search Console, **GA4 chargé uniquement après consentement** (bandeau RGPD).
- **Styles :** Tailwind, tokens issus de `DESIGN.md`. **Police :** Montserrat auto-hébergée (`next/font/local`).
- **Outillage :** pnpm, TypeScript strict, ESLint, Prettier, Node LTS verrouillée (`.nvmrc`, `engines`). Tests Playwright limités aux parcours critiques (devis, redirections 301, balises SEO). Migrations Payload versionnées, jamais de synchronisation automatique du schéma en production.
- **Git :** dépôt privé GitHub **au nom du client**, Hery collaborateur. Branche `main` protégée, branches `feat/*`, commits conventionnels. Préproduction = URL `*.vercel.app` en `noindex`.
- Versions des dépendances : vérifiées et figées à la création du projet, jamais « de mémoire ».

## 4. Règles métier impératives

### Routes
- Hubs : `/batiment`, `/voiture`, `/bateau` (les deux premières gardent leurs URLs actuelles).
- 7 pages de service : `/film-solaire-batiment`, `/film-securite-anti-effraction`, `/film-pdlc-cristaux-liquides`, `/vitrophanie-signaletique`, `/vitres-teintees-auto`, `/vitres-teintees-bateau`, `/covering-et-flocage`.
- Fixes : `/realisations(/[slug])`, `/conseils-expertises(/[slug])`, `/a-propos`, `/contact-devis` (URL à confirmer), pages légales. Les routes fixes l'emportent sur `/[slug]` ; ces noms sont réservés. Slug inconnu = vraie 404.
- La liste des 7 silos reste à valider par l'étude de mots-clés : ne pas en ajouter ni en retirer sans validation.

### SEO
- Un seul H1 par page, géré par le gabarit. Titre et méta-description **uniques** par page. Canonique absolue partout.
- **Montpellier** : une mention naturelle dans l'introduction, un H2 si pertinent et la méta-description de chaque page de service. **Jamais** « Montpellier 34 » ni « 34740 » ; jamais la ville dans les H1, titres de page, textes alternatifs ou noms de fichiers. Pas de pages « service + ville ».
- Une requête principale par URL. Chaque article renvoie à sa page de service.
- Texte alternatif obligatoire, descriptif et sobre. Noms de fichiers sobres.
- Données structurées : `LocalBusiness`, `Service`, `FAQPage`, `Article`, `BreadcrumbList`. `sitemap.xml` et `robots.txt` générés ; une seule version du domaine ; HTTPS ; pas de slash final.
- Redirections 301 versionnées dans `next.config.ts` d'après le plan du CDC §7.4. Blog repris de zéro : les 11 anciens articles et la FAQ ne sont que redirigés.
- Coordonnées et horaires : **source unique** (global Payload), pour supprimer les horaires contradictoires de l'ancien site.

### Accueil et maquette
- **Pas de vidéo d'en-tête** (décision figée : complexité injustifiée). L'en-tête reprend le simulateur interactif PDLC de la maquette.
- La maquette de référence est `code.html` + `screen.png`. Elle fixe la structure et les composants ; son habillage (couleurs, police Plus Jakarta Sans, rayons) est remplacé par la charte `DESIGN.md` v2.0. Toute divergence de structure par rapport à la maquette est soumise à Hery.

### Rôles et contenu
- **Administrateur** : Hery, accès complet. **Éditeur** (client) : **articles uniquement**, avec leurs images. Pages de service, études de cas, coordonnées, devis, schéma et réglages SEO réservés à l'administrateur. Le client reçoit les devis par notification, sans accès à l'admin.
- Publication planifiée : hors périmètre de la première version.

### Design
- Tokens de `DESIGN.md` uniquement : Noir Carbone `#16181C`, Gris Anthracite `#2B2E34`, Blanc `#FFFFFF`, Argent `#C9CDD2`, Cuivre `#C27A4E`, Bleu électrique `#1E7FD9`, Gris signature `#8A8D93`. Aucune couleur ni valeur de design en dur.
- Dégradé cuivre → bleu réservé aux appels à l'action principaux et aux visuels PDLC.
- **Contraste :** sur Gris Anthracite, le texte courant reste blanc ou argent ; cuivre et bleu servent aux éléments graphiques, boutons et grands textes. Le bleu est réservé aux grands textes et éléments graphiques sur Noir Carbone. Niveau AA des WCAG.
- Rayons 2 à 4 px, filets 1 px, effet verre, animations sobres de 200 à 400 ms. Logo : jamais déformé, jamais d'ombre ni d'effet 3D, version couleur uniquement sur fond sombre.
- Ton éditorial : confiant, épuré, rassurant ; du technique au bénéfice client.

### Performance et conformité
- Core Web Vitals au vert (mobile et desktop). Composants serveur par défaut ; JavaScript client limité au simulateur PDLC d'en-tête, au curseur avant/après, au carrousel, au formulaire et au menu mobile. Le texte de l'accroche ou une image légère sert de LCP.
- RGPD : consentement avant tout traceur GA4, consentement enregistré avec chaque demande de devis, polices auto-hébergées.

### Principes de code (SOLID, DRY, feature-first)
- **Architecture feature-first** : `src/app` ne contient que le routage (pages minces qui appellent les features) ; chaque fonctionnalité vit dans `src/features/<feature>/` (collection, hooks, accès, validateurs, requêtes, composants, SEO, types) ; le transverse vit dans `src/shared/`. `payload.config.ts` assemble les features.
- **Règle de dépendance** : `app` → `features` → `shared`. Une feature n'expose que son `index.ts` ; aucune autre feature n'importe ses fichiers internes ; `shared` n'importe aucune feature. Appliquée par ESLint (`no-restricted-imports` + `eslint-plugin-boundaries`), exécuté par `pnpm lint` en local et en CI (validé par Hery).
- **SOLID**, en TypeScript fonctionnel : responsabilité unique (hooks, validateurs, requêtes, composants séparés), ouvert/fermé (fabriques de champs et de configuration), dépendances inversées (n8n, Places, GA4 derrière des interfaces propres à leur feature, donc testables).
- **DRY** : un seul gabarit pour les 7 pages de service, un seul builder SEO, un seul champ SEO Payload, tokens uniques. On factorise dès la deuxième duplication réelle, pas par anticipation ni pour une ressemblance fortuite.
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

Étude de mots-clés (liste des silos) · URL de la page contact · URL de l'espace blog (`/conseils-expertises` proposée) · liste des communes d'intervention · codes couleur à confirmer sur le logo vectoriel (SVG) · lecture des 11 anciens articles pour valider les redirections · points de départ manquants (devis, appels, itinéraires) · valeurs cibles des indicateurs · report des tokens v2.0 dans `code.html`.
