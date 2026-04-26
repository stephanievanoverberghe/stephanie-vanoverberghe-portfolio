# Plan d’action refactorisation (progressif, sans casser l’existant)

## Phase 1 — Déjà fait

- [x] Isoler la logique de formulaire contact dans `hooks/useContactForm.ts`.
- [x] Centraliser l’appel API contact dans `services/contact.ts`.
- [x] Centraliser les données de contact répétées dans `content/contact.ts`.
- [x] Créer des types partagés de contact dans `types/contact.ts`.

## Phase 2 — À faire ensuite (priorité haute)

- [ ] Ajouter tests unitaires `useContactForm` (états: idle/loading/success/error).
- [ ] Ajouter test unitaire `submitContact` (cas `ok`, `res.ok=false`, exception réseau).
- [ ] Vérifier couverture de non-régression sur route `/api/contact`.

## Phase 3 — Qualité architecture (priorité moyenne)

- [ ] Standardiser le helper `cn` dans `lib/cn.ts` et supprimer duplications locales.
- [ ] Revoir les composants les plus longs (>150 lignes) pour extractions légères et ciblées.
- [ ] Vérifier qu’aucun composant UI ne fait d’accès data direct (API/fetch).

## Phase 4 — Professionnalisation documentaire

- [ ] Ajouter un `README` section “Architecture” avec conventions par dossier.
- [ ] Documenter la règle: “UI dans `components`, logique dans `hooks/services`”.
- [ ] Documenter les contrats types partagés (`types/`).

## Critères de validation finaux

- [ ] Aucune route Next.js cassée.
- [ ] Même rendu visuel.
- [ ] Même textes visibles.
- [ ] Lint + tests OK.
- [ ] Aucune dépendance supplémentaire non nécessaire.
