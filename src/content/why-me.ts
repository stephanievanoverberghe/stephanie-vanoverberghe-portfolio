import type { WhyMeContent } from './types';

export const whyMeContent: WhyMeContent = {
    kicker: 'Pourquoi moi',
    title: 'Front-end React/Next.js',
    subtitle: 'UI/UX · Performance · A11y',
    intro: 'Je combine sens visuel et rigueur technique pour livrer des interfaces prêtes à évoluer. Je travaille la lisibilité, la structure des composants et la cohérence d’ensemble, sans sacrifier la vitesse.',
    chips: [
        { kind: 'tech', label: 'React' },
        { kind: 'tech', label: 'Next.js' },
        { kind: 'tech', label: 'TypeScript' },
        { kind: 'design', label: 'UI/UX' },
        { kind: 'architecture', label: 'Perf/SEO' },
        { kind: 'tool', label: 'Git/Vercel' },
    ],
    contributionTitle: 'Ce que j’apporte',
    sections: [
        { icon: 'clarity', text: 'Des interfaces scannables avec une hiérarchie claire et des CTA utiles.' },
        { icon: 'system', text: 'Une base front maintenable : composants modulaires, conventions simples, styles cohérents.' },
        { icon: 'delivery', text: 'Une exécution soignée : accessibilité, performance et détails d’interaction intégrés dès le build.' },
    ],
    stats: [
        { label: 'Approche', value: 'Mobile-first & scannable' },
        { label: 'Qualité', value: 'A11y · SEO · Perf' },
        { label: 'Style', value: 'Sobre, clair, orienté usage' },
    ],
};
