# ✨ Portfolio – Développeuse Front-End React

Portfolio professionnel développé avec Next.js (App Router) et TypeScript, présentant mes projets, études de cas et mon approche produit.

Ce projet met l’accent sur :

- 🧠 Architecture propre
- ⚡ Performance
- 🔒 Typage strict
- 🎨 Expérience utilisateur soignée
- 🧩 Code maintenable et scalable

---

## 🚀 Stack Technique

- Next.js 16+ (App Router)
- React
- TypeScript (strict mode)
- Tailwind CSS
- Node.js
- Resend (API d’envoi d’emails)
- Contenu structuré via fichiers JSON typés

---

## 🎯 Objectifs du Projet

- Construire un portfolio professionnel prêt pour entretien
- Présenter des études de cas complètes et structurées
- Appliquer une architecture propre (séparation UI / data / logique)
- Implémenter une API sécurisée
- Optimiser SEO et performance

---

## 📁 Architecture du Projet

```code
src/
 ├── app/
 │    ├── api/contact/        → Route handler sécurisé (email + validation)
 │    ├── (admin)/            → Espace admin protégé
 │    ├── projets/[slug]/     → Pages dynamiques projets
 │    └── layout.tsx
 │
 ├── lib/
 │    ├── projects.ts         → Parsing typé et sécurisé des JSON
 │    └── ...
 │
 ├── content/
 │    └── projects/           → Données des études de cas (JSON)
 │
 └── components/              → UI modulaire et réutilisable
```

---

## 🛡 API Contact

Route : `POST /api/contact`

Fonctionnalités implémentées :

- Validation stricte des données
- Honeypot anti-spam
- Rate limiting
- Envoi sécurisé via Resend
- Gestion propre des erreurs
- Aucun `any` (TypeScript strict)

---

## ⚙️ Installation

```bash
git clone https://github.com/stephanievanoverberghe/stephanie-vanoverberghe-portfolio
cd ton-repo
npm install
```

---

## 🔐 Variables d’environnement

Créer un fichier `.env.local` :

```code
RESEND_API_KEY=your_api_key
CONTACT_TO=your@email.com
CONTACT_FROM=portfolio@yourdomain.com
```

---

## ▶️ Lancer le projet

```bash
npm run dev
```

Accès :
http://localhost:3000

---

## 🧪 Qualité & Bonnes Pratiques

- TypeScript strict
- Zéro utilisation de `any`
- Parsing sécurisé des données JSON
- Séparation des responsabilités
- Composants modulaires
- Code prêt production

---

## 📈 Améliorations Futures

- Tests unitaires (Vitest)
- Dockerisation
- CI/CD (GitHub Actions)
- Optimisation Lighthouse avancée
- Validation runtime plus stricte des données

---

## 👩‍💻 À propos

Développeuse front-end spécialisée en React, avec une approche structurée orientée produit.

Je m’intéresse particulièrement à :

- L’architecture propre
- La performance web
- L’expérience utilisateur
- La maintenabilité du code
- Les projets SaaS structurés comme en entreprise

---

## 📬 Contact

Via le formulaire du site ou directement par email.
