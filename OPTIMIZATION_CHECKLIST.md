# Checklist d’optimisation — Portfolio Next.js

> Objectif: améliorer ton portfolio **sans sur-ingénierie** (JSON local, pas d’admin, pas de DB externe).

## 1) Priorité haute (à faire en premier)

- [x] **Refactor `api/contact` en 3 fichiers**: `validation.ts`, `rate-limit.ts`, `mail.ts` dans `src/lib/contact/`.

- [x] **Uniformiser les statuts HTTP** dans `/api/contact`: `400` (payload invalide), `429` (rate limit), `500` (erreur interne).
- [x] **Ajouter logs serveurs minimaux** sur l’API contact (erreur mail, rate-limit hit).
- [x] **Mettre à jour `README.md`** avec:
    - [x] scripts (`dev`, `lint`, `build`)
    - [x] variables d’environnement (`RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`)
    - [x] procédure d’ajout d’un projet JSON.
- [x] **Créer une CI GitHub Actions minimale**: `npm ci` + `npm run lint` + `npm run build`.

## 2) Priorité moyenne (stabilité et qualité)

- [x] **Ajouter tests unitaires (Vitest)** pour `src/lib/projects.ts`:
    - [x] parsing JSON valide
    - [x] fallback de slug
    - [x] tri par année.
- [x] **Ajouter tests d’intégration API contact**:
    - [x] payload invalide -> `400`
    - [x] honeypot rempli -> `200`
    - [x] dépassement rate limit -> `429`.
- [x] **Nettoyer les commentaires incohérents** (ex: commentaires de path obsolètes).
- [x] **Créer une convention simple de naming** (composants, utilitaires, fichiers de contenu).

## 3) Priorité optimisation UX / perf

- [x] **Réduire le JS client global**:
    - [x] garder `Header` interactif mais isoler les parties purement statiques côté server component quand possible
    - [x] alléger/conditionner `RouteTransition` si nécessaire.
- [ ] **Optimiser les images projets**:
    - [ ] convertir/valider en WebP/AVIF quand pertinent
    - [ ] vérifier poids de chaque image hero
    - [ ] conserver `next/image` + tailles adaptées.
- [ ] **Audit Lighthouse rapide** (mobile + desktop) et noter:
    - [ ] LCP desktop : 0.6s mobile : 2.5s
    - [ ] CLS desktop : 0 mobile : 0
    - [ ] recommandations top 3.

## 4) Anti-spam progressif (uniquement si besoin réel)

- [ ] Garder honeypot actuel.
- [ ] Ajouter contrôle `Origin`/`Referer` sur l’API contact.
- [ ] Ajouter délai minimum avant soumission.
- [ ] **Si spam réel**: intégrer Cloudflare Turnstile.
- [ ] **Si trafic/abus augmente**: externaliser rate-limit (Upstash/Vercel KV).

## 5) Routine de maintenance (mensuelle)

- [ ] Mettre à jour dépendances mineures.
- [ ] Lancer `npm run lint` et `npm run build`.
- [ ] Vérifier liens externes des projets.
- [ ] Vérifier formulaire de contact en prod.
- [ ] Supprimer assets non utilisés.

---

## Définition de “done” (pratique)

Tu peux considérer l’optimisation réussie quand:

- [ ] CI verte sur chaque push
- [ ] API contact testée (unit/integration)
- [ ] README exploitable par quelqu’un d’autre
- [ ] pas de régression Lighthouse majeure
- [ ] maintenance mensuelle tenable en moins de 30 min.
