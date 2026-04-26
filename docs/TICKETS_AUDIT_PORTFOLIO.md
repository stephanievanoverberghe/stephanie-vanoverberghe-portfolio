# Tickets d'amélioration — Portfolio Next.js

Ce document regroupe tous les tickets issus de l'audit (SEO, UX/UI, contenu, accessibilité, conversion recrutement).

## Sprint 0 — Correctifs critiques

### TKT-001 — Corriger le CTA mobile ambigu

- **Priorité** : Urgent
- **Zone** : Header mobile
- **Problème** : le libellé laisse penser que le bouton mène aussi au CV.
- **Action** : garder un libellé aligné sur la destination réelle, ou séparer en deux CTA distincts.
- **Impact attendu** : cohérence UX, confiance utilisateur.

### TKT-002 — Corriger la valeur CSS invalide dans `ProjectCard`

- **Priorité** : Urgent
- **Zone** : Grille projets
- **Problème** : style inline `color-mix(...)` mal formé.
- **Action** : corriger la syntaxe CSS.
- **Impact attendu** : rendu visuel stable cross-browser.

### TKT-003 — Ajouter un contact direct recruteur (email + téléphone)

- **Priorité** : Urgent
- **Zone** : Page contact
- **Problème** : manque d'accès immédiat à un contact direct.
- **Action** : afficher `mailto:` + `tel:` de façon visible.
- **Impact attendu** : hausse du taux de prise de contact.

---

## Sprint 1 — SEO technique

### TKT-004 — Fiabiliser `lastModified` dans le sitemap

- **Priorité** : Important
- **Zone** : `sitemap.ts`
- **Problème** : toutes les URLs semblent modifiées à chaque build.
- **Action** : utiliser une vraie date de mise à jour (contenu / git / champ dédié).
- **Impact attendu** : signal SEO plus propre pour le crawl.

### TKT-005 — Forcer la canonicalisation d'hôte (www → apex)

- **Priorité** : Important
- **Zone** : Infra / config déploiement
- **Problème** : absence de stratégie explicite de redirection de domaine.
- **Action** : configurer redirection stricte vers `https://stephanie-vanoverberghe.dev`.
- **Impact attendu** : éviter contenu dupliqué.

### TKT-006 — Renforcer les Open Graph/Twitter cards par page

- **Priorité** : Important
- **Zone** : Metadata pages
- **Problème** : stratégie OG correcte mais encore peu différenciée.
- **Action** : personnaliser visuels/textes OG des pages clés.
- **Impact attendu** : meilleure présentation sur réseaux et messageries.

---

## Sprint 2 — Positionnement recrutement

### TKT-007 — Exploiter les champs riches des projets dans l'UI

- **Priorité** : Important
- **Zone** : Pages détail projet
- **Problème** : certains champs JSON riches ne sont pas affichés.
- **Action** : étendre parser + composants pour afficher vision, architecture, testing, décisions, etc.
- **Impact attendu** : case studies plus crédibles et différenciantes.

### TKT-008 — Ajouter une section “Résultats mesurables”

- **Priorité** : Important
- **Zone** : Pages détail projet
- **Problème** : promesses qualité/perf peu quantifiées.
- **Action** : ajouter KPI/preuves (Lighthouse, accessibilité, conversion, impact DX).
- **Impact attendu** : preuve concrète du niveau.

### TKT-009 — Uniformiser le ton éditorial FR professionnel

- **Priorité** : Important
- **Zone** : Home, projets, compétences, contact
- **Problème** : mélange FR/EN et registre parfois variable.
- **Action** : harmoniser style et vocabulaire.
- **Impact attendu** : image plus senior/professionnelle.

---

## Sprint 3 — Accessibilité & qualité UI

### TKT-010 — Implémenter focus trap + restore focus dans le menu mobile

- **Priorité** : Important
- **Zone** : Navigation mobile
- **Problème** : gestion clavier incomplète sur menu ouvert.
- **Action** : piéger le focus dans le drawer et restaurer le focus au bouton d'ouverture.
- **Impact attendu** : meilleure accessibilité clavier.

### TKT-011 — Ajouter des annonces live SR sur le formulaire de contact

- **Priorité** : Important
- **Zone** : Formulaire contact
- **Problème** : succès/erreur pas explicitement annoncés aux lecteurs d'écran.
- **Action** : `role="status"` / `aria-live` / `role="alert"` selon état.
- **Impact attendu** : meilleur feedback assistif.

### TKT-012 — Vérifier contrastes et focus states (WCAG AA)

- **Priorité** : Amélioration bonus
- **Zone** : Design system / UI globale
- **Problème** : besoin d'une validation systématique contraste/focus.
- **Action** : audit tokens + composants interactifs + ajustements ciblés.
- **Impact attendu** : conformité et lisibilité renforcées.

---

## Ordre recommandé

1. **Urgent** : TKT-001, TKT-002, TKT-003
2. **Important** : TKT-004, TKT-005, TKT-006, TKT-007, TKT-008, TKT-009, TKT-010, TKT-011
3. **Bonus** : TKT-012

## Découpage rapide (estimation)

- **XS** : 15–30 min
- **S** : 45 min–2 h
- **M** : 2–6 h

Répartition proposée :

- **Lot A** (½ journée) : TKT-001 + TKT-002 + TKT-003
- **Lot B** (½ journée) : TKT-004 + TKT-005
- **Lot C** (1 journée) : TKT-007 + TKT-008
- **Lot D** (½ journée) : TKT-009 + TKT-011
- **Lot E** (½ journée) : TKT-010 + TKT-012 + QA finale
