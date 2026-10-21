---
name: Films de Prestige
version: 3.0
source: Maquette d'accueil `maquette-v3.html` (copie lisible de `Vitopaque.html`), validée par Hery
colors:
  # --- Fonds, texte, filets (thème clair) ---
  background: '#F2F2F3'
  surface: '#E9E9EA'
  foreground: '#1D1F20'
  divider: 'foreground à 16 %'
  # --- Accent (bleu acier) : uniquement les teintes utilisées par la maquette ---
  accent: '#5980A6'
  accent-100: '#EEF6FF'
  accent-200: '#D6EBFF'
  accent-300: '#B5D9FD'
  accent-700: '#416180'
  accent-900: '#1D2D3D'
  accent-2: '#728FAB'   # réservé, non utilisé dans la maquette d'accueil
  # --- Neutre ---
  neutral-700: '#5D5D60'
  # --- Dérivés sur fond sombre (accent-900) ---
  divider-inverse: 'background à 18 %'
  outline-inverse: 'background à 40 %'
  hover-inverse: 'background à 10 %'
  # --- Repère d'angle ---
  corner: 'foreground à 55 %'
  # --- Sélection de texte ---
  selection: 'accent à 30 %'
  # --- Quadrillage du hero et du manifeste ---
  grid-line: 'background à 7 %'
typography:
  heading-family: Barlow Condensed
  heading-weight: 600
  body-family: Barlow
  body-weight: 400
  display-hero:
    fontSize: clamp(64px, 10.5vw, 168px)
    lineHeight: 0.86
    letterSpacing: -0.02em
  display-statement:
    fontSize: clamp(40px, 6.4vw, 104px)
    lineHeight: 0.98
    letterSpacing: -0.015em
  headline-xl:
    fontSize: clamp(48px, 7vw, 112px)
    lineHeight: 0.88
    letterSpacing: -0.015em
  headline-lg:
    fontSize: clamp(44px, 6vw, 88px)
    lineHeight: 0.9
    letterSpacing: -0.015em
  numeral:
    fontSize: 64px
    lineHeight: 0.8
  headline-md:
    fontSize: 40px
    lineHeight: 0.95
    letterSpacing: -0.015em
  headline-sm:
    fontSize: 24px
    lineHeight: 1.2
    letterSpacing: -0.015em
  title-md:
    fontSize: 20px
    lineHeight: 1.2
  body-lg:
    fontSize: 18px
    lineHeight: 1.55
  body-md:
    fontSize: 15px
    lineHeight: 1.55
  body-sm:
    fontSize: 13px
    lineHeight: 1.55
  label-caps:
    fontSize: 13px
    letterSpacing: 0.32em
  label-sm:
    fontSize: 12px
    letterSpacing: 0.24em
  label-nav:
    fontSize: 14px
    letterSpacing: 0.04em
  label-btn:
    fontSize: 14px
    fontWeight: 600
  label-btn-lg:
    fontSize: 16px
    fontWeight: 600
rounded:
  none: 0
  full: 9999px   # pastilles et lentille uniquement
spacing:
  margin: clamp(20px, 5vw, 72px)
  section: clamp(64px, 9vw, 128px)
  statement: clamp(90px, 14vw, 200px)   # respiration du manifeste
  container-page: 1440px
  breakpoint-desktop: 1200px
  grid-columns: 12
  card-min: 280px
  card-min-narrow: 230px
  card-gap: 28px
  card-min-height: 260px
  focus-ring-width: 2px
  focus-ring-offset: 2px
  corner-size: 11px
  corner-offset: -6px
animations:
  hover: 300ms
  lens: 400ms
  meter: 500ms
  film: 900ms
  reveal: 1000ms
  reveal-filter: 1100ms
  flash: 1200ms
  word: 250ms
  sweep: 8s
  sweep-cta: 10.4s
  reveal-blur: 14px
  reveal-shift: 28px
  reveal-range: 'entry 0 % à entry 40 %'
  ease-reveal: cubic-bezier(0.2, 0.7, 0.2, 1)
  ease-flash: cubic-bezier(0.3, 0.6, 0.2, 1)
glass:
  veil-blur: 26px
  veil-saturate: 0.6
  veil-tint: 'accent-900 à 86 %'
hero:
  min-height: max(680px, min(100svh, 940px))
  logo-max: 440px
  lens-size: clamp(144px, 30vw, 260px)
  lens-default-x: 72%
  lens-default-y: 46%
  lens-default-y-small: 70%   # sous 640 px
  lens-hole: 62%
manifesto:
  word-gap: 0.24em
  word-blur: 16px
  word-dim: 0.75
  word-span: 0.75
  word-lead: 0.25
---

## Marque et style

Ce référentiel est tiré de la maquette d'accueil `maquette-v3.html` (copie lisible de `Vitopaque.html`), qui devient la référence de design principale. Il remplace la version 2.0 (palette Noir Carbone, Cuivre, Bleu électrique, Montserrat), conservée dans l'historique git. `code.html` et `screen.png` sont historiques.

**Positionnement** : VIT'OPAQUE, films de prestige pour vitrage. L'expertise du vitrage au service de l'architecture, de l'automobile et du nautisme.

### Personnalité
- **Confiant** : titres en capitales condensées, très grands, serrés.
- **Épuré** : fonds clairs, filets de 1 px, aucun ornement décoratif superflu.
- **Technique** : repères d'angle « blueprint », grille de 12 colonnes, numérotation (01, 02…), vocabulaire d'atelier.

### Cibles
- **Bâtiment et Pro (B2B)** : architectes, chefs d'entreprise, gestionnaires de bureaux et de commerces, propriétaires de villas.
- **Auto et Bateau (B2C premium)** : propriétaires de véhicules haut de gamme, plaisanciers, passionnés d'automobile.

Les trois univers (Bâtiment, Voiture, Bateau) partagent le même système visuel.

## Logo

Le logo actuel reste, **sans déformation** : monogramme « V » (facettes argent, cuivre, bleu), logotype « VIT'OPAQUE », signature « FILMS DE PRESTIGE ». Fichiers : `logo.png`, `logo_clair.png`, et le monogramme détouré `src/shared/assets/brand/monogramme-v.webp` (dérivé du PNG de la maquette). Aucun fichier vectoriel de production pour l'instant (point ouvert).

### Fonds autorisés (d'après la maquette)
- **Version couleur** : uniquement sur `accent-900` (en-tête, pied de page, hero sombre, sections sombres) ou sur une photographie assombrie par un voile `accent-900`. La maquette ne la place jamais sur un fond clair.
- **Fonds clairs** (`background`, `surface`) : version couleur interdite. Utiliser une version monochrome `foreground`, à produire depuis le vectoriel.
- Monogramme seul : favicon, réseaux sociaux.

### Composition en en-tête et en pied de page
Monogramme (hauteur 40 px) suivi du mot « VIT'OPAQUE » composé en `wordmark` (Barlow Condensed 400, 20 px, interlettrage 0,24 em), en `background` sur `accent-900`. Le pied de page ajoute la signature en `label-caps` `accent-300`.

### Règles d'usage
- **Zone de protection** : au moins la hauteur du monogramme sur 4 côtés dans le pied de page, 12 px minimum ailleurs.
- **Tailles minimales** : monogramme 16 px (favicon) ; 36 px de haut dans l'interface.
- **Interdits** : déformer le logo, modifier les couleurs des facettes, ajouter une ombre, un halo ou un effet 3D (la maquette applique une ombre portée au grand logo de son hero : **non reprise**, car contraire à cette règle), placer la version couleur sur un fond clair ou chargé.

> **À confirmer** : les codes couleur du logo seront confirmés sur le vectoriel définitif (SVG).

## Couleurs

Thème clair. Le sombre est un fond de section (`accent-900`) et non un thème global.

### Fonds, texte et filets
| Token | Code | Rôle |
|---|---|---|
| `background` | `#F2F2F3` | Fond principal de la page ; texte clair sur fond sombre |
| `surface` | `#E9E9EA` | Sections alternées, champs, cartes pleines |
| `foreground` | `#1D1F20` | Texte principal et titres sur fond clair |
| `neutral-700` | `#5D5D60` | Texte secondaire sur fond clair (remplace toute opacité réduite) |
| `divider` | `foreground` à 16 % | Filets 1 px sur fond clair (décoratif) |

### Accent (bleu acier)
| Token | Code | Rôle |
|---|---|---|
| `accent` | `#5980A6` | Grands chiffres (24 px et plus), cellules de jauge, poignée, focus sur fond clair |
| `accent-100` | `#EEF6FF` | Texte d'accroche sur fond sombre ; fond de survol des vignettes |
| `accent-200` | `#D6EBFF` | Texte secondaire et liens sur fond sombre ; fond de la vignette sélectionnée |
| `accent-300` | `#B5D9FD` | Sur-titres, chiffres et survols sur fond sombre ; repères d'angle sur fond sombre |
| `accent-700` | `#416180` | Texte d'accent sur fond clair (sur-titres, liens) ; fond du bouton principal sur fond clair |
| `accent-900` | `#1D2D3D` | Fond sombre : en-tête, pied de page, hero, manifeste, contact |
| `accent-2` | `#728FAB` | Réservé. Non utilisé par la maquette d'accueil ; à retirer s'il reste sans emploi |

Les rampes 400, 500, 600 et 800, ainsi que les neutres autres que 700, sont dans la maquette mais inutilisés : volontairement non repris.

### Dérivés sur fond sombre
`divider-inverse` (`background` à 18 %, séparateurs), `outline-inverse` (`background` à 40 %, contour des boutons et champs), `hover-inverse` (`background` à 10 %, survol). La maquette emploie des valeurs de 14 à 40 % : normalisées en trois niveaux ; `outline-inverse` est porté à 40 % pour atteindre 3:1 sur `accent-900`.

### Équilibre
Environ 80 % de fonds clairs, 15 % de sections `accent-900`, 5 % d'accent.

### Contrastes (WCAG AA)

Combinaisons autorisées pour le texte courant (4,5:1 minimum) :

| Texte | Fond | Ratio |
|---|---|---|
| `foreground` | `background` / `surface` | 14,8 / 13,6:1 |
| `neutral-700` | `background` / `surface` | 5,9 / 5,4:1 |
| `accent-700` | `background` / `surface` | 5,8 / 5,3:1 |
| `accent-700` | `accent-100` / `accent-200` | 5,9 / 5,3:1 |
| `accent-900` | `background` / `surface` | 12,6 / 11,6:1 |
| `background` | `accent-900` | 12,6:1 |
| `accent-100` | `accent-900` | 12,9:1 |
| `accent-200` | `accent-900` | 11,5:1 |
| `accent-300` | `accent-900` | 9,6:1 |
| `background` | `accent-700` (libellé du bouton principal) | 5,8:1 |
| `accent-900` | `background` / `accent-200` (bouton principal sur fond sombre) | 12,6 / 11,5:1 |
| `foreground` | `accent-100` / `accent-200` | 15,2 / 13,5:1 |

Combinaisons réservées aux grands textes (24 px et plus, ou 18,66 px gras) et aux éléments graphiques (3:1) :

| Combinaison | Ratio | Usage |
|---|---|---|
| `accent` sur `background` | 3,7:1 | Grands chiffres, graphiques |
| `accent` sur `surface` | 3,4:1 | Grands chiffres, graphiques |
| `accent` sur `accent-900` | 3,4:1 | Éléments graphiques uniquement (cellules de jauge, filets) |
| `accent-700` sur `accent-300` | 4,4:1 | Grands textes uniquement |

Combinaisons **interdites** :
- `background` sur `accent` (3,7:1) pour un libellé de bouton ou un texte inférieur à 24 px : le `.btn-primary` de la maquette est remplacé par `accent-700` + `background`.
- `accent-300`, `accent-200`, `accent-100` sur fond clair ; `foreground`, `neutral-700` et `accent-700` sur `accent-900`.
- **Petits libellés en opacité réduite** : la maquette atténue légèrement certains textes (`text-muted` et légendes à 55 %, métadonnées à 50 %, étiquettes de champ à 70 %, `opacity` 0,8 des corps de carte). Ces valeurs donnent 3,6:1 et 3,2:1, sous le seuil AA. **Interdit** : tout texte de moins de 24 px dont la couleur est obtenue par opacité ou par `color-mix`. On utilise `neutral-700` sur fond clair, `accent-200` ou `accent-300` sur fond sombre.

Contours porteurs d'information (champs, boutons secondaires) : 3:1 minimum, donc `accent-700` sur fond clair et `outline-inverse` sur `accent-900`. `divider` et `divider-inverse` (1,4:1 et 1,7:1) sont décoratifs : jamais seuls pour délimiter un champ ou un contrôle.

## Typographie

Deux familles, auto-hébergées (`next/font/local`, sous-ensemble latin, aucun appel à Google Fonts) :

| Famille | Graisses chargées | Usage |
|---|---|---|
| **Barlow Condensed** | 600 (titres, boutons), 400 (sur-titres, numéros, logotype) | Tout ce qui est titre, sur-titre, numéro, bouton |
| **Barlow** | 400 | Corps de texte, navigation, formulaires |

Aucune autre graisse n'est chargée : interdit d'utiliser 500 ou 700 (elles seraient synthétisées).

### Échelle
Les titres sont en **capitales**, graisse 600, interlettrage -0,015 à -0,02 em.

| Token | Taille | Interlignage | Usage |
|---|---|---|---|
| `display-hero` | clamp(64 px, 10,5 vw, 168 px) | 0,86 | Titre du hero d'accueil |
| `display-statement` | clamp(40 px, 6,4 vw, 104 px) | 0,98 | Manifeste |
| `headline-xl` | clamp(48 px, 7 vw, 112 px) | 0,88 | H1 des pages intérieures, titre de la section contact |
| `headline-lg` | clamp(44 px, 6 vw, 88 px) | 0,9 | H2 de section |
| `headline-md` | 40 px | 0,95 | H3, fiche film |
| `headline-sm` | 24 px | 1,2 | Titre de carte |
| `title-md` | 20 px | 1,2 | Logotype, vignette, menu mobile |
| `body-lg` | 18 px | 1,55 | Chapô |
| `body-md` | 15 px | 1,55 | Corps de texte |
| `body-sm` | 13 px | 1,55 | Légendes, pied de page |

### Utilitaires de libellé
| Utilitaire | Paramètres |
|---|---|
| `label-caps` | Barlow Condensed 400, 13 px, capitales, interlettrage 0,32 em : sur-titres |
| `label-sm` | Barlow Condensed 400, 12 px, capitales, 0,24 em : étiquettes, numéros |
| `label-nav` | Barlow 400, 14 px, 0,04 em : navigation |
| `label-btn` / `label-btn-lg` | Barlow Condensed 600, 14 px / 16 px : boutons |
| `wordmark` | Barlow Condensed 400, 20 px, 0,24 em : logotype |

Un H1 et un seul par page, géré par le gabarit. Les mots longs se coupent (`wrap-break-word`, `hyphens-auto`) sur mobile.

## Mise en page et espacement

Grille de **12 colonnes**, rythme sur multiples de 4 px (échelle Tailwind).

- **Espacement du manifeste** : `statement` = clamp(90 px, 14 vw, 200 px).
- **Marges latérales** : `margin` = clamp(20 px, 5 vw, 72 px). **Respiration verticale entre sections** : `section` = clamp(64 px, 9 vw, 128 px).
- **Largeur** : fonds de section en pleine largeur ; contenu plafonné à 1440 px (`max-w-page`, token `container-page`).
- **Colonnes** : la maquette compose ses blocs en grilles `auto-fit` (colonne minimale 160 à 420 px) avec des gouttières de 24 à 56 px. La grille de 12 colonnes est matérialisée par un quadrillage de filets verticaux (`grid-lines`, `background` à 7 %) sur le hero et le manifeste.
- **Rythme des sections** : alternance fond clair, `surface`, `accent-900`. Hero, manifeste, contact et pied de page en `accent-900`.
- **Cartes** : grilles `auto-fit` partagées `card-grid` (colonne minimale `card-min` 280 px) et `card-grid-narrow` (`card-min-narrow` 230 px), gouttière `card-gap` 28 px. Carte `blueprint-card` : hauteur minimale `card-min-height` 260 px, rembourrage 28 px, colonne avec espacement de 14 px.
- **Breakpoint** : `desktop` (`breakpoint-desktop`) = 1200 px. En dessous, la navigation passe dans le menu mobile.
- **Appel à l'action permanent** : « Devis gratuit » dans l'en-tête (menu mobile en dessous de 1200 px).

## Élévation et profondeur

Pas d'ombres portées (`--shadow-*` vidé). La profondeur vient des filets, des repères d'angle et du verre.

1. **Filets** : 1 px, `divider` sur fond clair, `divider-inverse` ou `outline-inverse` sur fond sombre.
2. **Repères d'angle « blueprint »** (`blueprint`) : cadre de 1 px avec une croix de `corner-size` (11 px) sur chacun des 4 angles, décalée de `corner-offset` (6 px) vers l'extérieur ; croix en `corner` (`foreground` à 55 %, 3,6:1) sur fond clair, `accent-300` sur fond sombre (`blueprint-inverse`). Utilisés pour les cartes, cadres de visuels, boutons à mise en avant, formulaire de contact.
3. **Verre** : voile du hero (`glass-veil`) : `accent-900` à 86 % avec `backdrop-filter: blur(26px) saturate(0.6)`, percé par la lentille. Le laboratoire de films emploie le même principe (flou 2 à 18 px, saturation 0,4 à 0,8) pour chaque film (dépoli, solaire, miroir, occultant, décoratif).
4. **Voiles des films** (`film-veil-solaire`, `film-veil-securite`, `film-veil-pdlc`, `film-veil-vitrophanie`) : solaire = `accent-900` à 42 % avec luminosité 0,62 et saturation 0,8 ; sécurité = `accent-900` à 10 % avec luminosité 0,94 et saturation 0,9 ; PDLC = `background` à 30 % avec flou 18 px, saturation 0,4 et luminosité 1,15 ; vitrophanie = bandes verticales `background` (62 % puis 8 %, pas de 22 px) avec flou 5 px et saturation 0,5.
5. **Lentille et hero** : hauteur minimale `hero.min-height`, diamètre de la lentille `lens-size`, position par défaut 72 % / 46 % (70 % en vertical sous 640 px), ouverture `lens-hole` (62 %), logo plafonné à `logo-max` (440 px).
6. **Poignée du comparateur** : halo `accent-200` de 18 px, seule lueur autorisée.

## Formes

- **Rayon 0 partout** : boutons, champs, cartes, étiquettes, panneaux, cadres de visuels, modales. Le programme est carré, filaire.
- `rounded-full` : **pastilles de statut et lentille circulaire du hero uniquement**.
- Aucun rayon ne doit exister dans `tokens.css` en dehors de ce cas.

## Composants

### Boutons
- **Principal sur fond clair** : fond `accent-700`, libellé `background`, `label-btn-lg`. Survol et actif : `accent-900`. (Écart avec la maquette, voir Contrastes.)
- **Principal sur fond sombre** : fond `background`, libellé `accent-900`, repères d'angle `accent-300` ; survol `accent-200`.
- **Secondaire sur fond clair** : transparent, contour 1 px `accent-700`, libellé `foreground`, survol `surface`.
- **Secondaire sur fond sombre** : transparent, contour `outline-inverse`, libellé `background`, survol `hover-inverse`.
- **Bouton d'en-tête** : « Devis gratuit », `blueprint blueprint-inverse`, `label-btn`, survol `hover-inverse`.
- Zone tactile d'au moins 44 px (icônes et menu mobile), 24 px minimum ailleurs.

### Cartes et figures
- Cartes : cadre `blueprint` (gabarit `blueprint-card`), fond transparent, 1 px, rayon 0. Chiffres en `accent` (`text-numeral`, 64 px), titre en `headline-sm`.
- Figures de réalisations : cadre `blueprint`, légende `body-sm`, catégorie en `accent-700`.
- Visuels : photographies traitées en **bichromie `accent`** (mélange en mode `color`), cadrage 4:5 ou 16:10.

### Champs de formulaire
- Sur fond clair : fond `surface`, bordure 1 px `accent-700`, hauteur 44 px, rayon 0, `body-md`.
- Sur fond sombre (contact) : fond transparent, bordure `outline-inverse`, texte `background`, étiquette `accent-200`.
- Focus : anneau 2 px `accent` (fond clair) ou `accent-300` (fond sombre), décalage 2 px. Placeholder en `neutral-700` (fond clair) ou `accent-200` (fond sombre).
- Choix segmenté du projet : contour 1 px, option active en inversion de couleur.

### Étiquettes
`label-sm`, rayon 0. Fond `accent-100`, texte `accent-700` (5,9:1), ou contour 1 px `accent-700`.

### Jauges et vignettes du laboratoire
Cellules de 22 × 8 px, contour 1 px `accent`, remplies en `accent` ; vignette sélectionnée en fond `accent-200`.

### Navigation
- **En-tête** : fond `accent-900`, lockup à gauche, liens `label-nav` en `background` (survol `accent-300`), bouton « Devis gratuit ». Liens validés : `/batiment`, `/voiture`, `/bateau`, `/realisations`, `/conseils-expertises`, CTA `/contact-devis`.
- **Menu mobile** (sous 1200 px) : bouton 44 px à contour `outline-inverse`, panneau `accent-900` pleine largeur, liens en `title-md`, bouton « Devis gratuit » en bas.
- **Pied de page** : fond `accent-900`, filet supérieur `divider-inverse`, textes `accent-200`, intitulés `accent-300`, coordonnées issues de `site-settings`.

### Bandeau cookies et modales
Bandeau ancré en bas : fond `accent-900`, filet supérieur `divider-inverse`, texte `background`. Modale : cadre `blueprint-inverse` sur voile `accent-900` à 50 %. Rayon 0.

### Réassurance
Avis Google (API Places), guides experts, études de cas chiffrées : mêmes cartes `blueprint`. Chiffres clés en `accent` à grande taille.

## Iconographie et photographie

- **Icônes** : linéaires, trait 1,5 px, `currentColor`. Aucun pictogramme illustratif lourd.
- **Photographie** : intérieurs, bureaux, commerces, véhicules et bateaux, vus à travers une vitre. Traitement bichromie `accent`. Reportages sur chantiers réels de VIT'OPAQUE. Aucune image de banque d'images. Textes alternatifs descriptifs et sobres, sans ville.

## Animations

Sobres et signifiantes : toute animation illustre le passage **opaque → transparent**, le verre qui se révèle.

| Animation | Durée | Courbe |
|---|---|---|
| Survol (fond, couleur) | 300 ms | par défaut |
| Lentille du hero (diamètre) | 400 ms | par défaut |
| Remplissage des jauges | 500 ms | par défaut |
| Changement de film (voile) | 900 ms | `ease` |
| Apparition des sections (opacité, translation de `reveal-shift` 28 px, flou de `reveal-blur` 14 px vers 0) | liée au défilement (`animation-timeline: view()`, plage `reveal-range` : `entry 0 %` à `entry 40 %`), sans durée | linéaire |
| Éclair au changement de film | 1200 ms | `ease-flash` |
| Mots du manifeste (flou, opacité) | 250 ms | linéaire, pilotée par le défilement |
| Reflet balayant (hero) | 8 s, boucle | `ease-in-out` |
| Reflet balayant (contact) | 10,4 s, boucle | `ease-in-out` |

Les durées vivent uniquement dans `tokens.css` (`--duration-*`). Les durées `reveal` (1000 ms) et `reveal-filter` (1100 ms) y subsistent mais ne sont plus utilisées, l'apparition étant pilotée par le défilement. Les mots du manifeste se règlent par `word-gap`, `word-blur`, `word-dim`, `word-span` et `word-lead`. Le reflet (`sweep-band`, `animate-sweep`) est un dégradé oblique `accent-300` et `background`.

**`prefers-reduced-motion: reduce` (obligatoire)** : toutes les animations sont coupées (`animation: none`) : plus de reflet, d'éclair ni d'apparition au défilement ; pas de défilement doux ; seules les transitions d'opacité, de couleur, de fond et de bordure subsistent. Règle globale en bas de `tokens.css`.

## Accessibilité et performance
- Contrastes conformes au niveau AA (voir le tableau). Focus visible partout (`focus-ring-width` 2 px, décalage `focus-ring-offset` 2 px). Sélection de texte en `selection` (`accent` à 30 %).
- Respect de `prefers-reduced-motion`. Lentille du hero : repli tactile (position fixe, pas de suivi du pointeur). Manifeste : sans JavaScript ou avec mouvement réduit, les mots restent nets et opaques ; l'effet n'existe que si le script l'active.
- Images en WebP/AVIF avec chargement différé. Pas de vidéo d'en-tête.
- Polices auto-hébergées, une seule requête par fichier, `font-display: swap`.
- JavaScript client limité : lentille d'en-tête, laboratoire de films, manifeste, curseur, carrousel, formulaire, menu mobile.

## Historique

- 2026-10-20 : version 3.0, tirée de la maquette d'accueil `maquette-v3.html` : thème clair bleu acier, Barlow / Barlow Condensed, rayon 0, repères d'angle, grille 12 colonnes, lentille de verre dépoli. Abandon du dégradé cuivre → bleu.
- 2026-10-13 : (v2.0) précisions validées : libellé du CTA dégradé, espacements tablette et grand écran, `space-3xl` par palier.
