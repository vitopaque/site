---
name: Films de Prestige
version: 2.0
source: Cahier des charges VIT'OPAQUE v1.0 (12 octobre 2026), section 4 + nouveau logo
colors:
  # --- Rôles Material (remappés sur la palette VIT'OPAQUE) ---
  # Les valeurs marquées "dérivé" ne figurent pas dans le CDC : elles sont calculées
  # à partir des couleurs de marque pour compléter l'échelle des surfaces.
  surface: '#16181C'
  surface-dim: '#16181C'
  surface-bright: '#34373D'            # dérivé
  surface-container-lowest: '#101215'  # dérivé
  surface-container-low: '#1D2025'     # dérivé
  surface-container: '#23262B'         # dérivé
  surface-container-high: '#2B2E34'
  surface-container-highest: '#34373D' # dérivé
  on-surface: '#FFFFFF'
  on-surface-variant: '#C9CDD2'
  inverse-surface: '#E8EAED'           # dérivé
  inverse-on-surface: '#16181C'
  outline: '#8A8D93'
  outline-variant: '#3A3E45'           # dérivé (filet discret)
  surface-tint: '#C27A4E'
  primary: '#C27A4E'
  on-primary: '#16181C'
  primary-container: '#8F5532'         # dérivé
  on-primary-container: '#FFFFFF'
  inverse-primary: '#8F5532'           # dérivé
  secondary: '#1E7FD9'
  on-secondary: '#FFFFFF'
  secondary-container: '#163F66'       # dérivé
  on-secondary-container: '#C9CDD2'
  tertiary: '#C9CDD2'
  on-tertiary: '#16181C'
  tertiary-container: '#2B2E34'
  on-tertiary-container: '#C9CDD2'
  error: '#FFB4AB'                     # hors charte, conservé
  on-error: '#690005'
  error-container: '#93000A'
  on-error-container: '#FFDAD6'
  primary-fixed: '#F0D3BF'             # dérivé
  primary-fixed-dim: '#C27A4E'
  on-primary-fixed: '#2E1608'          # dérivé
  on-primary-fixed-variant: '#7A4A2B'  # dérivé
  secondary-fixed: '#D3E6FA'           # dérivé
  secondary-fixed-dim: '#7DB5EC'       # dérivé
  on-secondary-fixed: '#06213D'        # dérivé
  on-secondary-fixed-variant: '#12497E' # dérivé
  tertiary-fixed: '#E4E6E9'            # dérivé
  tertiary-fixed-dim: '#C9CDD2'
  on-tertiary-fixed: '#16181C'
  on-tertiary-fixed-variant: '#2B2E34'
  background: '#16181C'
  on-background: '#FFFFFF'
  surface-variant: '#2B2E34'
  # --- Tokens de marque (source : CDC §4.3, relevés sur le logo) ---
  noir-carbone: '#16181C'
  gris-anthracite: '#2B2E34'
  blanc-pur: '#FFFFFF'
  argent: '#C9CDD2'
  cuivre: '#C27A4E'
  bleu-electrique: '#1E7FD9'
  gris-signature: '#8A8D93'
  # --- Effets ---
  glass-panel: rgba(43, 46, 52, 0.65)
  glass-border: rgba(201, 205, 210, 0.14)
  glow-bleu: rgba(30, 127, 217, 0.40)
  gradient-signature: 'linear-gradient(135deg, #C27A4E 0%, #1E7FD9 100%)'
typography:
  display-hero:
    fontFamily: Montserrat
    fontSize: 56px
    fontWeight: '300'
    lineHeight: 64px
    letterSpacing: -0.01em
  display-hero-mobile:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '300'
    lineHeight: 44px
    letterSpacing: -0.005em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '300'
    lineHeight: 48px
    letterSpacing: -0.005em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '300'
    lineHeight: 36px
    letterSpacing: 0em
  headline-md:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '300'
    lineHeight: 36px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  title-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 29px
    letterSpacing: 0em
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-sm:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.25em
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.10em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.25rem
  lg: 0.25rem
  xl: 0.25rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  gutter-tablet: 1.25rem
  margin-tablet: 2rem
  margin-wide: 5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
  space-3xl-mobile: 4rem
  space-3xl-tablet: 5rem
---

## Marque et style

Ce référentiel applique la section 4 du cahier des charges de la refonte de vitopaque.com. Il s'impose à toutes les interfaces et à tous les supports du projet. Il remplace la version précédente (« Luminescent Precision », palette cyan), qui ne correspond plus au logo validé.

**Positionnement** : VIT'OPAQUE, films de prestige. L'expertise du vitrage au service de l'architecture et de l'automobile d'exception.

### Personnalité
- **Confiant** : l'expertise s'affirme sans se justifier.
- **Épuré** : lignes géométriques nettes, peu d'ornements, phrases courtes.
- **Orfèvre** : le soin du détail de la pose se lit dans celui de l'interface.

### Cibles
- **Bâtiment et Pro (B2B)** : architectes, chefs d'entreprise, gestionnaires de bureaux et de commerces, propriétaires de villas.
- **Auto et Bateau (B2C premium)** : propriétaires de véhicules haut de gamme, plaisanciers, passionnés d'automobile.

Les deux univers partagent la même exigence de prestige et le même système visuel.

## Logo

### Concept
Le monogramme « V » est un symbole iconique, composé de lignes géométriques ultra-nettes. Ses branches s'entrecroisent et se superposent en transparence, comme un film posé sur un vitrage : passage de l'ombre à la lumière, superposition technique. Il porte trois facettes : **blanc/argent**, **cuivre** et **bleu électrique**.

Le logotype « VIT'OPAQUE » est en capitales, dans une linéale géométrique fine. La signature « FILMS DE PRESTIGE » est en capitales très espacées, en gris signature.

### Déclinaisons

| Déclinaison | Usages |
|---|---|
| Logo complet couleur (symbole + logotype + signature), sur Noir Carbone | En-tête du site, page d'accueil, devis, présentations commerciales |
| Monogramme « V » seul | Favicon, icône des réseaux sociaux, broderie, objets publicitaires |
| Monochrome blanc | Vinyle sur véhicules et vitrines, incrustation sur photos sombres |
| Monochrome noir | Fonds clairs, impressions économiques, tampons |

Fichiers sources dans le dossier du projet : `logo.png` (rendu métallique sur fond sombre, visuel de marque) et `logo_clair.png` (rendu sur fond clair). Ce sont des visuels de présentation, pas des fichiers de production.

### Règles d'usage
- **Zone de protection** : espace libre autour du logo au moins égal à la hauteur de la lettre « O » du logotype.
- **Tailles minimales** : 16 px pour le monogramme (favicon), 120 px de large pour le logo complet.
- **Rendu à plat** : le rendu métallique et lumineux est réservé aux visuels de marque. Le site utilise une version vectorielle à plat (SVG).
- **Interdits** : déformer le logo, modifier les couleurs des facettes, ajouter des ombres ou des effets 3D, placer la version couleur sur un fond clair ou chargé.

> **À confirmer** : les codes couleur ont été relevés sur le visuel du logo. Ils devront être confirmés sur le fichier vectoriel définitif (SVG), et ce document mis à jour si besoin.

## Couleurs

La palette est issue du logo : teintes sombres et élégantes, rehaussées d'accents qui soulignent l'innovation technologique.

| Couleur | Code | Rôle |
|---|---|---|
| Noir Carbone | `#16181C` | Fond principal, en-tête et pied de page |
| Gris Anthracite | `#2B2E34` | Surfaces secondaires, cartes, alternance des sections |
| Blanc pur | `#FFFFFF` | Titres et textes principaux sur fond sombre |
| Argent | `#C9CDD2` | Filets, icônes, textes secondaires (facette argent du V) |
| Cuivre | `#C27A4E` | Accent premium : boutons principaux, survols, chiffres clés |
| Bleu électrique | `#1E7FD9` | Accent technologique : univers PDLC, liens, états actifs |
| Gris signature | `#8A8D93` | Signature « Films de prestige », légendes, mentions |

### Correspondance avec les rôles
- `primary` = Cuivre. `secondary` = Bleu électrique. `tertiary` = Argent.
- `surface` / `background` = Noir Carbone. `surface-container-high` = Gris Anthracite.
- `on-surface` = Blanc pur. `on-surface-variant` = Argent. `outline` = Gris signature.

### Équilibre
Environ 70 % de tons sombres, 20 % de blanc et d'argent, 10 % d'accents cuivre et bleu.

### Dégradé signature
`linear-gradient(135deg, #C27A4E, #1E7FD9)` : cuivre vers bleu électrique. Réservé aux appels à l'action principaux (« Demander un devis » en tête de page et en fin de page) et aux visuels PDLC. Partout ailleurs, le cuivre et le bleu s'utilisent en aplat.

### Contrastes (WCAG AA)

| Combinaison | Ratio | Usage autorisé |
|---|---|---|
| Blanc sur Noir Carbone | 17,8:1 | Tout texte |
| Argent sur Noir Carbone | 11,1:1 | Tout texte |
| Gris signature sur Noir Carbone | 5,3:1 | Tout texte |
| Cuivre sur Noir Carbone | 5,2:1 | Tout texte |
| Noir Carbone sur Cuivre | 5,2:1 | Libellé des boutons principaux |
| Bleu électrique sur Noir Carbone | 4,3:1 | Grands textes et éléments graphiques uniquement |
| Blanc sur Anthracite | 13,6:1 | Tout texte |
| Argent sur Anthracite | 8,5:1 | Tout texte |
| Gris signature sur Anthracite | 4,1:1 | Grands textes uniquement |
| Cuivre sur Anthracite | 4,0:1 | Grands textes, boutons et éléments graphiques uniquement |
| Bleu électrique sur Anthracite | 3,3:1 | Éléments graphiques uniquement (filets, icônes, focus) |

**Règle** : sur Gris Anthracite, le texte courant reste en blanc ou en argent. Cuivre et bleu y servent aux éléments graphiques, aux boutons et aux grands textes. Le bleu électrique en texte (liens) se place sur Noir Carbone, en grande taille ou souligné.

## Typographie

Famille unique : **Montserrat**, auto-hébergée sur le serveur du site (performance et conformité RGPD). Aucun appel à Google Fonts en production.

| Usage | Style | Paramètres |
|---|---|---|
| Titres (H1, H2) | Montserrat Light | Capitales ou casse mixte, graisse 300 à 400, en écho au logotype |
| Sur-titres et signatures | Montserrat Regular | Capitales, interlettrage +20 à 30 % (`label-caps`, 0,25 em), en écho à « FILMS DE PRESTIGE » |
| Corps de texte | Montserrat Regular | 16 à 18 px, interlignage 1,6, blanc ou argent sur fond sombre |
| Boutons | Montserrat Medium | Capitales, interlettrage +10 % (`label-md`) |

Les sur-titres de catégorie (`BÂTIMENT`, `AUTO & BATEAU`, `FILMS DE PRESTIGE`) utilisent `label-caps` en argent ou en gris signature.

## Mise en page et espacement

Grille de 12 colonnes, rythme sur base de 8 px.

- **Bureau (≥ 1200 px)** : 12 colonnes, gouttières de 24 px, marges extérieures de 48 px à partir de 1200 px et de 80 px à partir de 1440 px, largeur maximale 1440 px. Rythme vertical généreux entre sections (`space-3xl`).
- **Tablette (768 à 1199 px)** : 8 colonnes, gouttières de 20 px, marges de 32 px.
- **Mobile (320 à 767 px)** : 4 colonnes, gouttières de 16 px, marges de 20 px. Conception mobile d'abord. Les cartes passent en piles linéaires, avec carrousels tactiles pour les réalisations.
- **Rythme des sections** : alternance Noir Carbone / Gris Anthracite. Espacement vertical entre sections `space-3xl` : 64 px (mobile), 80 px (tablette), 96 px (bureau).
- **Appel à l'action permanent** : « Demander un devis » dans l'en-tête fixe, et bouton flottant sur mobile.

## Élévation et profondeur

Pas d'ombres portées classiques. La profondeur vient de la transparence, des superpositions et des filets, en métaphore des films superposés du monogramme.

1. **Fond** : Noir Carbone en aplat.
2. **Effet verre** (cartes, modales, bandeau cookies) : fond `glass-panel` (Gris Anthracite à 65 % d'opacité) avec `backdrop-filter: blur(16px) saturate(140%)`. Bordure `glass-border` : Argent à 14 % d'opacité, 1 px.
3. **Filets** : traits de 1 px, argent à faible opacité (`glass-border`) ou cuivre. Au survol ou au focus, le filet passe en cuivre plein ou en bleu électrique.
4. **Halo** : réservé aux survols et aux visuels PDLC : `box-shadow: 0 0 24px -4px rgba(30, 127, 217, 0.40)`.

## Formes

Angles nets ou arrondis minimes, en écho aux arêtes du monogramme.

- **Composants courants** (boutons, champs, badges, cartes, panneaux, cadres de visuels) : 2 à 4 px. Valeur par défaut : 4 px (`rounded`).
- Les rayons `md`, `lg` et `xl` sont plafonnés à 4 px pour rester compatibles avec la configuration Tailwind existante.
- `rounded-full` : réservé aux interrupteurs et aux pastilles de statut.

## Composants

### Boutons
- **Principal** : fond Cuivre `#C27A4E`, texte Noir Carbone, Montserrat Medium en capitales. Au survol, halo bleu électrique (`glow-bleu`).
- **Principal, variante dégradé** : fond `gradient-signature`, libellé Noir Carbone, Montserrat Bold (700) en capitales, taille d'au moins 18,66 px. Il s'agit d'un « grand texte » au sens des WCAG (seuil de 3:1) : le pire contraste est de 4,3:1, sur la zone bleue. Réservé aux appels à l'action principaux. Les autres boutons restent en Medium (`label-md`).
- **Secondaire** : fond transparent, contour argent de 1 px, texte blanc. Au survol, halo bleu électrique.
- **Lien texte** : argent, avec un soulignement cuivre qui s'étend de 0 à 100 % de la largeur au survol.

### Cartes
- Effet verre (`glass-panel`), filet de 1 px (`glass-border`), rayon 4 px.
- Cartes d'études de cas : structure en trois temps (Problème, Solution, Résultat). Chiffres clés en cuivre.
- Visuels : photographies sombres à lumière rasante. Pas de visuels génériques.

### Champs de formulaire
- Fond `surface-container-low`, bordure de 1 px `outline-variant`, hauteur 48 px, marge intérieure de 16 px, rayon 4 px.
- Focus : anneau de 2 px en bleu électrique (3:1 minimum conservé). Pas de décalage de contour.
- Placeholder : gris signature.
- Formulaire de devis segmenté : choix de l'univers (bâtiment ou véhicule), type de besoin, surface ou modèle de véhicule, ajout de photos.

### Cases à cocher et interrupteurs
- Case : 18 × 18 px, rayon 2 px. Inactive : bordure `outline`. Active : fond cuivre, coche Noir Carbone.
- Interrupteur : piste représentant l'état du verre (désactivé : dépoli, activé : transparent), transition de 300 ms.

### Bandeau cookies et modales
- Bandeau ancré en bas, effet verre, filet supérieur en dégradé cuivre vers bleu.
- Modale centrée, fond `rgba(10, 12, 15, 0.8)` avec flou d'arrière-plan.

### Réassurance
- Garanties affichées en évidence, logos partenaires en monochrome argent, carrousel d'avis Google sur la page d'accueil.

## Iconographie et photographie

- **Icônes** : linéaires, trait fin, monochromes argent. Aucun pictogramme illustratif lourd (dessins de voitures ou de fenêtres).
- **Photographie** : villas modernes, bureaux d'architectes, commerces haut de gamme, véhicules et bateaux d'exception. Lumière rasante, reflets sur le verre, jeux d'ombre et de lumière, en écho aux facettes du logo. Reportages sur chantiers réels de VIT'OPAQUE. Aucune image de banque d'images.

## Animations

Sobres : fondus et révélations progressives de 200 à 400 ms. La transition **opaque → transparent** est le motif animé signature de la marque (révélation d'un visuel, changement d'état d'un interrupteur, curseur avant / après).

## Accessibilité et performance
- Contrastes conformes au niveau AA des WCAG, avec une vigilance particulière sur fond sombre (voir le tableau des contrastes).
- Respect de `prefers-reduced-motion` : fondus uniquement, sans révélations animées.
- Images en WebP/AVIF avec chargement différé. Pas de vidéo d'en-tête : l'en-tête de l'accueil utilise le simulateur interactif PDLC de la maquette de référence.
- Polices auto-hébergées.

## Historique

- 2026-10-13 : précisions validées : libellé du CTA dégradé, espacements tablette et grand écran, `space-3xl` par palier.
