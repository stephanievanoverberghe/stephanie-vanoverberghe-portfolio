export const skillsPageContent = {
    metadata: {
        title: 'Compétences — Stéphanie Vanoverberghe',
        description: 'Compétences front-end React, Next.js, TypeScript, Tailwind, UI/UX, accessibilité, performance et qualité du code.',
    },

    hero: {
        kicker: 'Compétences',
        title: {
            first: 'Penser',
            second: 'l’interface.',
            third: 'Structurer le code.',
        },
        intro: 'Je développe des interfaces React / Next.js avec une attention particulière portée à la lisibilité, à l’expérience utilisateur et à la qualité du code. Mon approche mélange regard créatif, logique produit et construction front-end maintenable.',
        ctaPrimary: 'Voir les projets',
        ctaSecondary: 'Me contacter',
        tags: ['React', 'Next.js', 'TypeScript', 'UI/UX'],
    },

    vision: {
        kicker: 'Vision',
        title: 'Apprendre en construisant.',
        intro: 'Je crois aux projets concrets. Chaque interface est une manière de comprendre un besoin, structurer une réponse et affiner mon regard. Je cherche à construire des expériences web claires, cohérentes et utiles.',
        quote: 'Le code m’a appris la rigueur. Le design m’a appris le regard.',
    },

    pillars: {
        kicker: 'Piliers',
        title: 'Du regard créatif à la structure front-end.',
        intro: 'Mes compétences se construisent autour d’un équilibre : concevoir une interface lisible, la transformer en composants propres, puis soigner les détails qui rendent l’expérience solide.',
        items: [
            {
                key: 'frontend',
                title: 'Front-end React / Next.js',
                desc: 'Composants réutilisables, App Router, TypeScript, rendu, routing et logique d’interface.',
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
                desc: 'Hiérarchie visuelle, contraste, responsive, micro-interactions et cohérence d’ensemble.',
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
                desc: 'Performance web, accessibilité, SEO technique, images optimisées et rendu propre.',
                tone: 'sage',
                chips: [
                    { kind: 'architecture', label: 'A11y' },
                    { kind: 'architecture', label: 'Performance Web' },
                    { kind: 'architecture', label: 'SEO technique' },
                    { kind: 'tool', label: 'Lighthouse' },
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
        intro: 'Mes projets montrent ma manière de passer d’une intention à une interface réelle : design, composants, responsive, logique front-end et qualité du rendu.',
        empty: 'Aucun projet n’est encore disponible.',
        caseStudyLabel: 'Étude de cas',
        demoLabel: 'Voir la démo',
        readLabel: 'Lire la démarche',
    },
} as const;
