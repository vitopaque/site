---
name: supabase-pooler
description: "Connexion Supabase de vitopaque.com : pooler en mode transaction (port 6543), sans prepared statements, adaptateur Payload, deux projets. À utiliser pour la base de données."
---

# Supabase

- Deux projets (production, préproduction) sur le compte du client, région européenne.
- `@payloadcms/db-postgres` par le **pooler en mode transaction (port 6543)**, sans prepared statements : **à valider avec l'adaptateur** par un test réel, pas par supposition.
- `DATABASE_URI` en variable d'environnement par environnement.
- Migrations Payload versionnées ; jamais de synchronisation automatique du schéma en production. Sauvegardes côté Supabase.
- Fonctions Vercel en région européenne (par défaut une seule région, `iad1`, à changer).
