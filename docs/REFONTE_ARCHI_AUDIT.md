# Audit global du projet Next.js / React

## 1) État actuel (diagnostic rapide)

### Points positifs

- Le projet est déjà structuré avec `app/`, `components/`, `lib/`, `content/`.
- Les routes Next.js sont propres et restent majoritairement dans `src/app`.
- Les contenus projet sont déjà externalisés en JSON (`src/content/projects/*.json`).
- La base TypeScript est stricte (`strict: true`).

### Problèmes identifiés (priorisés)

#### P1 — Mélange logique + UI sur la feature contact

- `ContactForm.tsx` contenait simultanément:
    - le rendu UI,
    - la logique d’état formulaire,
    - la logique de soumission API.
- Impact : maintenance plus coûteuse, tests plus difficiles, forte responsabilité du composant.

#### P1 — Appel API non centralisé côté client

- Le `fetch('/api/contact')` était directement dans le composant.
- Impact : duplication potentielle, difficulté à réutiliser ou mocker la couche data.

#### P2 — Données de contact répétées dans le JSX

- Les liens/actions de contact étaient codés en dur dans `ContactAside.tsx`.
- Impact : bruit visuel, risque d’incohérence si modification future (email/tél/réseaux).

#### P2 — Types partagés non centralisés pour le contact

- Le type payload était défini côté validation serveur uniquement.
- Impact : risque de dérive front/back si la structure évolue.

#### P3 — Quelques utilitaires locaux répétés

- Plusieurs composants redéfinissent `cn(...)` localement.
- Impact : faible, mais à homogénéiser dans une phase ultérieure pour lisibilité.

---

## 2) Refactorisation appliquée (itération progressive)

### Étape A — Séparation logique/UI sur le formulaire contact

- Création d’un hook `useContactForm` pour porter:
    - l’état du formulaire,
    - le statut de soumission,
    - la logique `onSubmit`.
- `ContactForm.tsx` devient majoritairement présentation + bindings.

**Justification courte :** composant plus lisible, logique métier testable et réutilisable.

### Étape B — Extraction de l’accès API dans un service

- Création de `src/services/contact.ts` avec `submitContact(payload)`.
- Le hook appelle désormais ce service, pas `fetch` directement.

**Justification courte :** couche data centralisée, meilleure maintenabilité.

### Étape C — Centralisation des données statiques de contact

- Création de `src/content/contact.ts` (liste des actions de contact).
- `ContactAside.tsx` mappe cette source unique.

**Justification courte :** suppression de répétitions et mise à jour future simplifiée.

### Étape D — Cohérence TypeScript front/back

- Création de `src/types/contact.ts`.
- Réutilisation du type `ContactPayload` dans la validation serveur.

**Justification courte :** contrat partagé explicite, réduction des risques de divergence.

---

## 3) Nouvelle organisation cible (professionnelle)

Organisation recommandée et déjà amorcée :

- `src/app/` → routes et fichiers Next.js uniquement
- `src/components/` → composants UI/presentation
- `src/hooks/` → logique React réutilisable (ex: formulaires, filtres)
- `src/services/` → appels API et accès data externes
- `src/lib/` → utilitaires transverses
- `src/content/` → contenus éditoriaux / statiques
- `src/types/` → types partagés inter-couches

---

## 4) Zones prioritaires suivantes (sans refacto brutale)

1. **Header / navigation**
    - Vérifier l’équilibre entre logique d’animation/scroll et rendu.
    - Éventuellement extraire davantage vers hooks dédiés si besoin.

2. **Pages de projet (`projects/[slug]`)**
    - Factoriser la construction SEO/JSON-LD dans un module dédié (ex: `services/seo-project.ts`) si le volume continue d’augmenter.

3. **Utilitaires `cn`**
    - Standardiser un helper commun (`lib/cn.ts`) pour réduire les micro-duplications.

4. **Tests ciblés**
    - Ajouter des tests unitaires sur `useContactForm` et `services/contact`.

---

## 5) Ce que tu dois vérifier après refactor

- Le formulaire de contact envoie toujours correctement.
- Les messages d’erreur/succès sont inchangés côté UX.
- Les liens dans l’aside contact sont identiques.
- Les routes existantes (`/contact`, `/projects`, `/skills`) restent intactes.
- Le lint et les tests existants passent.

---

## 6) Résultat attendu de cette itération

- Séparation nette UI / logique sur la partie contact.
- Données statiques consolidées.
- Contrat TypeScript partagé.
- Aucune modification du design ni du comportement visible.
