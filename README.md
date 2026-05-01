# Portfolio - Stephanie Vanoverberghe

Portfolio frontend professionnel construit avec Next.js App Router, React et TypeScript strict.  
Le projet met en avant des études de cas, une approche UI/UX orientée produit, et une base technique pensée pour rester lisible, cohérente et maintenable.

## Stack

- Next.js 16
- React 19
- TypeScript strict
- Tailwind CSS v4
- Vitest
- Resend
- Vercel

## Objectif du repo

Ce repo n'est pas une simple vitrine statique. Il sert aussi de base professionnelle propre pour :

- présenter des projets de manière crédible
- centraliser le contenu éditorial et les études de cas
- maintenir une UI cohérente avec une logique de design system simple
- garder une séparation claire entre contenu, interface, logique et services

## Architecture

```txt
src/
├── app/                # App Router: pages, layouts, metadata, API routes
├── components/
│   ├── layout/         # Header, footer, shell, transitions de layout
│   └── ui/             # Primitives UI réutilisables
├── content/            # Contenu éditorial et fiches projets JSON/TS
├── features/           # Composants métier regroupés par domaine
│   ├── contact/
│   ├── home/
│   ├── projects/
│   └── skills/
├── hooks/              # Logique React réutilisable
├── lib/                # Helpers purs, parsing, logique d'affichage
├── services/           # Accès I/O et appels externes
├── styles/             # Tokens, base, layout, components, utilities
└── types/              # Contrats TypeScript partagés
```

## Conventions

- Composants React : `PascalCase.tsx`
- Hooks : `useXxx.ts`
- Utilitaires et fichiers de support : `kebab-case.ts`
- Contenu projet : `src/content/projects/<slug>.json`
- Styles globaux partagés : `src/styles/*.css`

Principes suivis dans le repo :

- `components/ui` ne connaît pas le métier
- `features/*` compose les sections et la logique de page
- `content/*` reste la source de vérité éditoriale
- `lib/*` contient les fonctions pures et le parsing
- `services/*` gère les échanges externes

## Design system

Le projet repose sur un design system léger :

- primitives UI dans `src/components/ui`
- tokens et styles partagés dans `src/styles`
- usage limité des styles inline, réservés aux cas dynamiques justifiés

Le styleguide interne est disponible sur `/styleguide`.

En production, cette route est désactivée par défaut. Pour l'activer :

```env
STYLEGUIDE_ENABLED=true
```

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run test:run
npm run build
npm run check:all
```

## Installation

```bash
git clone https://github.com/stephanievanoverberghe/stephanie-vanoverberghe-portfolio
cd stephanie-vanoverberghe-portfolio
npm install
```

Lancer le projet en local :

```bash
npm run dev
```

## Variables d'environnement

Créer un fichier `.env.local` :

```env
RESEND_API_KEY=your_api_key
CONTACT_TO=your@email.com
CONTACT_FROM=portfolio@yourdomain.com
STYLEGUIDE_ENABLED=false
```

Variables utiles :

- `RESEND_API_KEY` : clé API Resend
- `CONTACT_TO` : adresse qui reçoit les messages du formulaire
- `CONTACT_FROM` : adresse expéditrice validée côté Resend
- `STYLEGUIDE_ENABLED` : active la route `/styleguide` si `true`

## Contact API

Route : `POST /api/contact`

Comportements principaux :

- validation stricte du payload
- honeypot anti-spam
- délai minimum avant soumission
- vérification origin/referer
- rate limit en mémoire
- envoi mail via Resend
- mode dégradé si la configuration email est absente

Statuts principaux :

- `200` : message accepté
- `400` : payload invalide ou requête bloquée
- `429` : rate limit dépassé
- `500` : erreur côté envoi email

## Ajouter un projet

1. Créer un fichier `src/content/projects/<slug>.json`
2. Respecter la structure des autres fiches projet
3. Ajouter les assets dans `public/images/projects/<slug>/` si nécessaire
4. Vérifier localement :

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
```

Les projets sont ensuite chargés, parsés et ordonnés automatiquement.  
L'ordre visible dans le portfolio peut être piloté avec le champ `order` dans chaque JSON.

## Tests et qualité

La base qualité actuelle couvre notamment :

- parsing et chargement des projets
- logique de contact
- route API contact
- hook de formulaire

Le projet vise une qualité simple et fiable :

- TypeScript strict
- séparation claire des responsabilités
- contenu centralisé
- tests ciblés plutôt que sur-ingénierie
- CI avec lint, typecheck, tests et build

## Déploiement

Le projet est pensé pour Vercel, mais reste exécutable localement sans dépendre d'une architecture complexe.

Build de production :

```bash
npm run build
```
