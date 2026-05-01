import { siteNarrative } from './site';

export const skillsPageContent = {
    metadata: {
        title: 'Compétences — Stéphanie Vanoverberghe',
        description: 'Compétences front-end React, Next.js, TypeScript, Tailwind, UI/UX, accessibilité, performance et qualité du code.',
    },

    hero: {
        kicker: 'Compétences',
        title: {
            first: 'Penser',
            second: "l'interface.",
            third: 'Structurer le code.',
        },
        intro: `${siteNarrative.elevatorPitch} ${siteNarrative.qualityLine}`,
        ctaPrimary: 'Voir les projets',
        ctaSecondary: 'Me contacter',
        tags: ['React', 'Next.js', 'TypeScript', 'UI/UX'],
    },

    vision: {
        kicker: 'Vision',
        title: 'Apprendre en construisant.',
        intro: "Je progresse surtout par les projets concrets. Chaque interface est un terrain pour mieux cadrer un besoin, structurer une réponse et améliorer la qualité du rendu final.",
        quote: `${siteNarrative.quotePair.strong} ${siteNarrative.quotePair.accent}`,
    },

    pillars: {
        kicker: 'Piliers',
        title: 'Du regard créatif à la structure front-end.',
        intro: "Mes compétences reposent sur un équilibre simple : penser une interface lisible, la transformer en composants propres, puis fiabiliser l'expérience jusque dans les détails.",
        items: [
            {
                key: 'frontend',
                title: 'Front-end React / Next.js',
                desc: "Composants réutilisables, App Router, TypeScript strict, logique d'interface et rendu fiable.",
                tone: 'accent',
                chips: [
                    { kind: 'tech', label: 'React' },
                    { kind: 'tech', label: 'Next.js' },
                    { kind: 'tech', label: 'TypeScript' },
                    { kind: 'tech', label: 'Tailwind CSS' },
                    { kind: 'architecture', label: 'App Router' },
                ],
            },
            {
                key: 'design',
                title: 'UI/UX & lisibilité',
                desc: "Hiérarchie visuelle, contraste, responsive et cohérence d'ensemble au service de l'usage.",
                tone: 'lilac',
                chips: [
                    { kind: 'design', label: 'UI/UX' },
                    { kind: 'design', label: 'Design system' },
                    { kind: 'design', label: 'Responsive' },
                    { kind: 'design', label: 'UX writing' },
                ],
            },
            {
                key: 'quality',
                title: 'Qualité & finition',
                desc: 'Performance web, accessibilité, SEO technique et rendu propre sur desktop comme mobile.',
                tone: 'sage',
                chips: [
                    { kind: 'architecture', label: 'A11y' },
                    { kind: 'architecture', label: 'Performance Web' },
                    { kind: 'architecture', label: 'SEO technique' },
                    { kind: 'tool', label: 'Lighthouse' },
                ],
            },
            {
                key: 'backend',
                title: 'Backend en progression',
                desc: 'Je consolide mes bases côté serveur avec Node.js, SQL, Prisma et Stripe à travers des cas concrets.',
                tone: 'sage',
                chips: [
                    { kind: 'tech', label: 'Node.js' },
                    { kind: 'architecture', label: 'SQL' },
                    { kind: 'tool', label: 'Prisma' },
                    { kind: 'tool', label: 'Stripe' },
                ],
            },
            {
                key: 'workflow',
                title: 'Workflow & livraison',
                desc: 'Organisation du code, hygiène de repo, déploiement, vérifications et progression continue.',
                tone: 'gold',
                chips: [
                    { kind: 'tool', label: 'Git' },
                    { kind: 'tool', label: 'Vercel' },
                    { kind: 'tool', label: 'ESLint' },
                    { kind: 'tool', label: 'Prettier' },
                ],
            },
        ],
    },

    projects: {
        kicker: 'Preuves concrètes',
        title: 'Des compétences mises en pratique.',
        intro: "Les projets servent ici de preuve : ils montrent ma manière de structurer une interface, d'organiser le code et de tenir une direction produit cohérente.",
        empty: "Aucun projet n'est encore disponible.",
        caseStudyLabel: 'Étude de cas',
        readLabel: 'Lire la démarche',
    },
} as const;
