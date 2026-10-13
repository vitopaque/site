---
name: devis-n8n
description: "Formulaire de devis segmenté de vitopaque.com : champs par univers, envoi direct des photos, route serveur, collection Payload, webhook n8n, anti-spam. À utiliser pour le parcours devis."
---

# Devis et n8n

Source : `architecture-technique.md`, section « Formulaire de devis segmenté ».

1. Univers (bâtiment, voiture, bateau) puis type de besoin ; champs adaptés (surface ou modèle de véhicule).
2. Photos : envoi direct navigateur → stockage par lien signé (4,5 Mo max par requête de fonction Vercel) ; le formulaire n'envoie que les références, avec limite de taille et de nombre.
3. Route serveur : validation + **consentement RGPD** → écriture dans la collection Demandes de devis (privée).
4. Hook → webhook n8n (email entreprise, CRM éventuel) ; secret de signature du webhook.
5. Anti-spam sans service tiers : champ piège + limitation de débit.
- Soumission et clic téléphone = événements de conversion GA4 (seulement après consentement).
