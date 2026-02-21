# Revue d’architecture — Portfolio (JSON local)

## Verdict global

**🟢 Junior solide**

Ton projet est bien structuré pour **un portfolio vitrine avec peu de projets (6 max)**, sans back-office admin ni base de données externe.
Le principal sujet n’est pas la scalabilité SaaS, mais la **robustesse**, la **maintenabilité**, et la **simplicité propre**.

---

## 1) Analyse globale

### Ce qui est bien

- Structure claire: `app/` pour les routes, `components/` par domaine, `lib/` pour l’accès données.
- Contenu projet en JSON local (`src/content/projects/*.json`) : très adapté à ton besoin.
- TypeScript en mode strict.
- Bonne utilisation App Router + metadata SEO.

### Ce qui est à améliorer

- `README.md` est encore template Next.js et ne décrit pas ton vrai projet (env vars, workflow de contenu JSON, déploiement).
- La route `api/contact` concentre trop de responsabilités (validation, anti-abus, envoi mail).
- Quelques composants globaux en client (`Header`, `RouteTransition`) ajoutent du JS qui n’est pas indispensable partout.

---

## 2) Architecture (adaptée à TON contexte)

Tu n’as pas besoin d’une clean architecture complète type SaaS. Ce serait overkill.

### Recommandation pragmatique

Garder une architecture légère:

```
src/
  app/
    api/contact/route.ts
    ...pages
  components/
    ...ui + sections
  content/projects/
    *.json
  lib/
    projects.ts
    contact/
      validation.ts
      rate-limit.ts
      mail.ts
```

Objectif: **sortir la logique de `route.ts`** dans `lib/contact/*` sans complexifier inutilement.

---

## 3) Sécurité

### IMPORTANT — Rate limit en mémoire

Pour ton trafic portfolio, c’est acceptable au départ. Sur Vercel, ce n’est pas strictement fiable entre instances, mais ce n’est pas forcément bloquant à ton échelle.

**Action conseillée maintenant :** garder le système actuel + ajouter logs.
**Action plus tard si abuse :** Upstash/Vercel KV.

### IMPORTANT — Validation input

Tu valides déjà côté serveur (bien). Tu peux encore fiabiliser avec un schéma unique (ex: Zod) partagé client/serveur pour éviter les divergences.

### IMPORTANT — Protection anti-spam

Tu as déjà un honeypot (bien).
Ajoute si besoin:

- check `Origin`/`Referer`
- délai minimum avant envoi
- captcha Cloudflare Turnstile si spam réel

---

## 4) Performance

### IMPORTANT — Composants client globaux

- `Header` et `RouteTransition` sont en client global.
- Pour un site petit, c’est OK, mais tu peux réduire le JS en isolant seulement la partie interactive.

### OPTIMISATION — Images

Tu utilises `next/image`, bon point.
Vérifie juste que toutes les images projet ont dimensions/poids raisonnables pour ne pas dégrader LCP.

### OPTIMISATION — Data fetching

Lecture de JSON local via `fs` est parfaite pour ton cas.
Pas besoin de DB.

---

## 5) Qualité de code

### Ce qui est bon

- Typage global sérieux.
- Découpage composants propre.

### IMPORTANT — Erreurs API

Le `catch` final renvoie `400` même pour des erreurs internes.
Mieux:

- `400` pour payload invalide
- `429` pour rate limit
- `500` pour erreur interne

### OPTIMISATION

- Nettoyer les commentaires incohérents/legacy.
- Mettre en place une petite convention de naming documentée dans README.

---

## 6) Tests (minimalistes et efficaces)

Tu n’as pas besoin d’une grosse infra de test, mais il te faut un filet de sécurité.

Priorité:

1. **Unit tests** sur `lib/projects.ts` (parsing JSON, tri par année, fallback slug).
2. **Integration tests** pour `POST /api/contact` (payload invalide, honeypot, succès).
3. **1 e2e smoke test** Playwright (home -> projects -> project detail -> contact submit mock).

Stack recommandée:

- Vitest (unit/integration)
- Playwright (e2e minimal)

---

## 7) Docker & CI/CD

### Constat

- Pas de Dockerfile et ce n’est pas un problème si tu déploies uniquement sur Vercel.

### IMPORTANT

Ajoute une CI GitHub Actions simple:

- `npm ci`
- `npm run lint`
- `npm run build`

C’est largement suffisant pour ton niveau de projet.

---

## 8) Plan d’action concret

### CRITIQUE

- Aucun point bloquant critique détecté pour un portfolio 6 projets.

### IMPORTANT

1. Extraire la logique de `api/contact/route.ts` vers `lib/contact/*`.
2. Corriger la stratégie d’erreur HTTP (`400/429/500` bien séparés).
3. Mettre une CI minimale lint+build.
4. Ajouter tests essentiels (`projects.ts` + API contact).

### OPTIMISATION

1. Réduire le JS client global (header/transitions).
2. Mettre à jour README avec runbook réel.
3. Ajouter validation partagée (Zod) si tu veux solidifier encore.

---

## Conclusion lead-dev (direct)

Ton architecture est **bonne pour ton vrai besoin** (portfolio sans admin, sans DB externe).
Le problème n’est pas la scalabilité enterprise; le problème, c’est d’éviter que le projet se fragilise dans 6 mois.
Fais simple, mais propre: **route contact mieux découpée + CI + tests ciblés + README à jour**.
