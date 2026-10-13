---
name: vercel-blob-upload
description: "Médias de vitopaque.com : Vercel Blob via l'adaptateur Payload, envoi direct navigateur vers stockage (limite 4,5 Mo des fonctions Vercel), un store par environnement. À utiliser pour les uploads."
---

# Vercel Blob

- Adaptateur officiel Payload pour Vercel Blob ; un store par environnement ; `BLOB_READ_WRITE_TOKEN` en variable d'environnement.
- Envoi **direct du navigateur** vers le stockage : une requête de fonction Vercel est limitée à 4,5 Mo et le disque n'est pas durable.
- À tester en phase 0 : envoi d'un fichier de plus de 4,5 Mo depuis l'admin.
- Texte alternatif obligatoire sur chaque média ; noms de fichiers sobres.
- Vérifier la documentation Payload et Vercel pour la configuration exacte.
