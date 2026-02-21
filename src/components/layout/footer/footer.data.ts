// src/components/layout/footer/footer.data.ts

export const FOOTER = {
    name: 'Vanoverberghe Stéphanie',
    role: 'Développeuse Front-End — React · Next.js · TypeScript · UI/UX',
    cvHref: '/cv-vanoverberghe-stephanie.pdf',
    links: {
        site: [
            { href: '/', label: 'Accueil' },
            { href: '/projects', label: 'Projets' },
            { href: '/skills', label: 'Compétences' },
            { href: '/contact', label: 'Contact' },
        ],
        socials: [
            { href: 'https://github.com/stephanievanoverberghe', label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/stephanie-vanoverberghe/', label: 'LinkedIn' },
        ],
    },
} as const;
