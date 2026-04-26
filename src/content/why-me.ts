import type { WhyMeContent } from './types';

export const whyMeContent: WhyMeContent = {
    kicker: 'Pourquoi me choisir',
    title: 'Une développeuse front-end à la croisée du design et du code',
    subtitle: 'React · Next.js · TypeScript · UI/UX',
    intro: 'Mon parcours s’est construit entre création visuelle, JavaScript et projets concrets. Je conçois des interfaces avec le souci du détail, mais aussi avec une vraie attention à la structure, à la maintenabilité et à l’expérience utilisateur.',
    chips: [
        { kind: 'tech', label: 'React' },
        { kind: 'tech', label: 'Next.js' },
        { kind: 'tech', label: 'TypeScript' },
        { kind: 'design', label: 'UI/UX' },
        { kind: 'architecture', label: 'API / MongoDB' },
        { kind: 'tool', label: 'Git / Vercel' },
    ],
    contributionTitle: 'Ce que j’apporte',
    sections: [
        {
            icon: 'clarity',
            text: 'Un regard créatif : je fais attention à la hiérarchie visuelle, à la lisibilité et à la cohérence de l’interface.',
        },
        {
            icon: 'system',
            text: 'Une base front structurée : composants réutilisables, TypeScript, logique séparée de l’UI et code plus facile à maintenir.',
        },
        {
            icon: 'delivery',
            text: 'Une vraie volonté de progresser : je pratique, je teste, je corrige et je cherche à comprendre plutôt qu’à appliquer mécaniquement.',
        },
    ],
    stats: [
        { label: 'Approche', value: 'Design + développement' },
        { label: 'Qualité', value: 'A11y · structure · UX' },
        { label: 'État d’esprit', value: 'Curieuse · impliquée · déterminée' },
    ],
};
