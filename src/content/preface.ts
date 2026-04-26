import type { PrefaceContent } from './types';

export const prefaceContent: PrefaceContent = {
    title: 'Préface',
    role: 'Développeuse Front-End React / Next.js',
    availability: 'Disponible — React/Next.js',
    intro: 'Je conçois des interfaces claires, rapides et fiables. Mon objectif : transformer une intention produit en expérience concrète, avec des composants propres, une bonne structure et une vraie attention au détail.',
    sections: [
        { icon: 'ui', text: 'UI/UX — parcours lisibles, composants réutilisables, feedbacks utiles.' },
        { icon: 'performance', text: 'Performance — App Router, images optimisées, rendu adapté au contexte.' },
        { icon: 'a11y', text: 'Accessibilité — navigation clavier, contrastes maîtrisés, base inclusive.' },
    ],
    stats: [
        { label: 'Stack', value: 'Next.js + TypeScript' },
        { label: 'Déploiement', value: 'Vercel' },
        { label: 'Approche', value: 'Produit + Design' },
    ],
    profileName: 'Vanoverberghe Stéphanie',
    profileStack: 'React · Next.js · TypeScript',
    quote: 'Créer des interfaces qui inspirent confiance, dès la première interaction.',
};
