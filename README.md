# ✨ Portfolio – Développeuse Front-End React

Portfolio professionnel développé avec Next.js (App Router) et TypeScript, présentant mes projets, études de cas et mon approche produit.

---

## 🚀 Stack Technique

- Next.js 16+ (App Router)
- React
- TypeScript (strict mode)
- Tailwind CSS
- Resend (API d’envoi d’emails)
- Contenu structuré via fichiers JSON typés

---

## 📁 Architecture

### Arborescence et conventions par dossier

```txt
src/
 ├── app/                    # Routes App Router (pages/layout/loading/error + route handlers API)
 ├── components/             # UI pure (présentation, composition visuelle, accessibilité)
 ├── hooks/                  # Logique React réutilisable (state, transitions, orchestration UI)
 ├── services/               # Accès I/O (ex: appels HTTP) sans rendu
 ├── lib/                    # Utilitaires métier/techniques et fonctions pures
 │   └── contact/            # Validation, rate-limit, envoi mail pour l'API contact
 ├── content/                # Données éditoriales locales (TS/JSON)
 └── types/                  # Contrats TypeScript partagés entre couches
```

---

## ⚙️ Installation

```bash
git clone https://github.com/stephanievanoverberghe/stephanie-vanoverberghe-portfolio
cd stephanie-vanoverberghe-portfolio
npm install
```

### Règle d’architecture UI / logique

- **UI dans `components/`** : un composant ne doit pas embarquer l’accès réseau ou des effets métier complexes.
- **Logique dans `hooks/` et `services/`** :
    - `hooks/` gère l’état et les interactions (ex: formulaire, loading, erreurs, succès),
    - `services/` centralise les appels API.
- **`lib/` reste framework-agnostic** autant que possible (fonctions pures, validation, helpers).

Exemple déjà appliqué : le formulaire de contact délègue l’envoi à `services/contact.ts` et la gestion d’état au hook `hooks/useContactForm.ts`.

### Contrats types partagés (`types/`)

- Les types transverses vivent dans `src/types/` pour éviter les duplications.
- Les contrats utilisés à la fois par l’UI et les services (ex: payload/réponse du contact) doivent être déclarés ici.
- Tout ajout de champ côté payload API doit être répercuté dans ces types pour garantir la cohérence compile-time.

Fichiers de référence :

- `src/types/contact.ts` : contrat de soumission contact et statut de réponse.
- `src/types/vitest.d.ts` : support de types pour l’environnement de test.

---

## 📜 Scripts npm

- `npm run dev` : démarre le serveur de développement (http://localhost:3000)
- `npm run lint` : lance ESLint
- `npm run build` : build de production Next.js

---

## 🔐 Variables d’environnement

Créer un fichier `.env.local` :

```env
RESEND_API_KEY=your_api_key
CONTACT_TO=your@email.com
CONTACT_FROM=portfolio@yourdomain.com
```

- `RESEND_API_KEY` : clé API Resend.
- `CONTACT_TO` : adresse qui reçoit les messages du formulaire.
- `CONTACT_FROM` : expéditeur utilisé par Resend (doit être validé côté domaine Resend).

---

## 🛡 API Contact

Route : `POST /api/contact`

Comportements principaux :

- Validation stricte du payload
- Honeypot anti-spam
- Rate limit en mémoire
- Envoi d’email via Resend
- Dégradation contrôlée si la config mail est absente (retour `200` sans envoi réel)
- Statuts HTTP :
    - `200` : message accepté (envoyé, ou accepté sans envoi email si variables manquantes)
    - `400` : payload invalide (ou origine/référent non autorisé, délai anti-bot trop court)
    - `429` : rate limit dépassé
    - `500` : erreur interne lors de l’envoi mail

Variables attendues pour l’envoi réel :

- `RESEND_API_KEY`
- `CONTACT_TO`
- `CONTACT_FROM`

> Sans ces variables, l’UI de contact reste fluide mais aucun email n’est envoyé.

---

## 🔒 Route `/styleguide`

La route de QA visuelle `/styleguide` est :

- non indexée (`noindex`),
- **désactivée en production** par défaut (retourne 404),
- activable explicitement avec :

```env
STYLEGUIDE_ENABLED=true
```

---

## ➕ Ajouter un nouveau projet JSON

1. Créer un fichier dans `src/content/projects/` (ex: `mon-projet.json`).
2. Respecter la structure des autres fichiers JSON existants (slug, metadata, sections, images, etc.).
3. Ajouter les assets image dans `public/images/projects/<slug>/`.
4. Vérifier localement :

```bash
npm run lint
npm run build
```

5. Ouvrir `/projects` puis `/projects/<slug>` en local pour valider le rendu.

```bash
npm run lint
npm run build
```

---

## 🧪 Tests

Des tests ont été ajoutés pour la logique projets (`src/lib/projects.test.ts`) et l’API contact (`src/app/api/contact/route.test.ts`).

> ⚠️ Si `vitest` n’est pas encore installé dans ton environnement, installe-le avec `npm i -D vitest` avant exécution.

Commande recommandée :

```bash
npx vitest run
```

---

## 🏷 Convention de naming (simple)

- **Composants React** : `PascalCase.tsx` (ex: `ProjectCard.tsx`).
- **Utilitaires / librairies** : `kebab-case.ts` ou `<feature>.utils.ts` (ex: `projects.utils.ts`, `rate-limit.ts`).
- **Données de contenu** : `kebab-case.json` et slug cohérent (ex: `ancre-toi.json`).
- **Routes App Router** : dossiers en `kebab-case`, fichiers Next.js standards (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`).
- **Constantes locales** : `UPPER_SNAKE_CASE` pour les constantes globales, `camelCase` sinon.

---

## ✅ Qualité

- TypeScript strict
- Parsing JSON robuste
- Composants modulaires
- CI GitHub Actions (lint + build)
