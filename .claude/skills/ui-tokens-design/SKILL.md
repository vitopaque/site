---
name: ui-tokens-design
description: "Design system de vitopaque.com : tokens de DESIGN.md v3.0, Tailwind, règles de contraste, fidélité à la maquette maquette-v3.html. À utiliser pour tout style ou composant visuel."
---

# Design et maquette

Sources : `DESIGN.md` (v3.0), `maquette-v3.html` (maquette de référence, structure et habillage). `code.html` et `screen.png` sont historiques.

- La maquette fixe la **structure, les composants et l'habillage** (thème clair bleu acier, Barlow / Barlow Condensed, rayon 0, repères d'angle « blueprint »). Toute divergence de structure → orchestrateur.
- Tokens uniquement (`src/shared/styles/tokens.css`) : `background`, `surface`, `foreground`, `accent` et ses teintes, `neutral-700`, dérivés sur fond sombre. Aucune couleur ni valeur de design en dur ailleurs.
- Pas de dégradé cuivre → bleu (abandonné en v3.0). Pas d'ombre portée, pas de rayon (sauf pastille et lentille).
- Contraste AA : voir le tableau de `DESIGN.md`. Aucun texte de moins de 24 px en opacité réduite ou en `color-mix`.
- Verre (`glass-veil`), filets 1 px, animations sobres, `prefers-reduced-motion` respecté. Logo jamais déformé, sans ombre ni 3D, version couleur sur fond sombre uniquement.
- Pas de vidéo d'en-tête : le hero reprend la lentille de verre dépoli de la maquette.
- Lire `DESIGN.md` par section selon le besoin.
