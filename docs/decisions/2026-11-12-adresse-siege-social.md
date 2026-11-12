# Adresse du siège social et adresse de l'atelier

Date : 2026-11-12 · Décideur : Hery · Source : réponse du client, question 5.

## Contexte

- Le siège social est au 3 rue de l'Industrie, 34880 Lavérune.
- L'atelier, où se fait l'accueil des clients, est au 202 route de Sommières, Vendargues.
- Le client juge inutile de préciser le siège ; or les mentions légales doivent indiquer le siège de la société.
- Le site doit garder une source unique pour les coordonnées (`site-settings`).

## Options

1. Afficher les deux adresses partout.
2. Afficher uniquement l'atelier, siège compris dans les mentions légales : pas d'adresse concurrente dans le pied de page ni dans les données structurées.
3. Ne mentionner que l'atelier, y compris dans les mentions légales (non conforme).

## Décision

Option 2. Le siège n'apparaît que dans les mentions légales. L'atelier reste l'adresse unique partout ailleurs : `site-settings`, pied de page, `LocalBusiness`.

## Conséquences

- Le siège est une donnée propre aux mentions légales, hors des adresses exposées par `site-settings` pour le site et le SEO.
- Pas de seconde adresse dans les données structurées : le référencement local reste centré sur l'atelier.
- Le code postal du siège reste dans une adresse postale, donc autorisé par les règles SEO.
- Si le client change de siège ou d'atelier, une seule source est à modifier pour chacun.
