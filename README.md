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

## 📁 Architecture du Projet (résumé)

```txt
src/
 ├── app/
 │    ├── api/contact/        # Route handler contact
 │    ├── projects/           # Pages projets
 │    └── ...
 │
 ├── lib/
 │   ├── contact/            # validation, rate-limit, mail
 │   └── projects.ts         # Parsing typé des projets JSON
 ├── content/projects/       # Données des projets
 └── components/             # Composants UI
```

---

## ⚙️ Installation

```bash
git clone https://github.com/stephanievanoverberghe/stephanie-vanoverberghe-portfolio
cd stephanie-vanoverberghe-portfolio
npm install
```

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
- Statuts HTTP uniformes :
    - `400` : payload invalide
    - `429` : rate limit dépassé
    - `500` : erreur interne (configuration/mail)

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
