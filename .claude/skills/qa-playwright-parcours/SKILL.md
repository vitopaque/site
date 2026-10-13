---
name: qa-playwright-parcours
description: "Tests Playwright de vitopaque.com limités aux parcours critiques : devis, redirections 301, balises SEO. À utiliser pour écrire ou lancer les tests."
---

# Playwright

- Périmètre **limité** : (1) parcours devis complet, consentement inclus, (2) chaque redirection 301 du plan (code et cible), (3) balises SEO : un H1, titre et méta uniques, canonique, JSON-LD présent.
- Tests dans `tests/`, contre la préproduction `*.vercel.app` ou un serveur local ; ne jamais cibler la production sans demande de Hery.
- Pas de test de pixels ni de couverture exhaustive.
- Signaler les échecs à l'orchestrateur avec la preuve (sortie, capture) ; ne pas corriger le code applicatif.
