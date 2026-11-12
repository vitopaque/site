# Purge des demandes de devis après 36 mois

Date : 2026-11-12 · Décideur : Hery · Source : réponse du client, question 9 (et 11).

## Contexte

- Le client conserve les demandes de devis 36 mois au maximum, durée qui sera indiquée dans la politique de confidentialité.
- Il n'y a aucune prospection commerciale : les données servent uniquement à répondre à la demande.
- Les devis sont stockés dans une collection Payload privée, réservée à l'administrateur. La purge doit donc être réellement appliquée.

## Options

1. Script pnpm manuel, lancé périodiquement par Hery.
2. Tâche planifiée n8n : dépend d'un service tiers et d'un accès en écriture à la base.
3. Cron Vercel : couplé à l'hébergement Hobby, dont les limites sont à vérifier.

## Décision

Option 1 : script pnpm manuel, idempotent, lancé périodiquement par Hery.

## Conséquences

- Le script supprime les devis dont la date de création dépasse 36 mois ; un deuxième lancement ne trouve rien à supprimer.
- Aucun nouveau service ni coût récurrent, mais la conformité dépend d'une exécution régulière de Hery (rappel périodique à prévoir).
- Le script affiche le nombre de lignes supprimées, jamais de donnée personnelle, et s'exécute avec les accès déjà configurés, sans nouveau secret dans le dépôt.
- Si le volume ou l'oubli devient un risque, passer à une tâche planifiée : décision à reprendre.
