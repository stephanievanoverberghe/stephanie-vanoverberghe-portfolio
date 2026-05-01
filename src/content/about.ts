import { siteNarrative } from './site';

export const aboutContent = {
    hero: {
        kicker: 'À propos',
        title: {
            line1: siteNarrative.heroWords[0],
            line2: siteNarrative.heroWords[1],
            line3: siteNarrative.heroWords[2],
        },
        intro: 'Mon parcours part d’un univers créatif — le dessin, la composition, l’observation — et s’est progressivement transformé en une manière de concevoir des interfaces web avec du sens, de la clarté et de la structure.',
        note: siteNarrative.professionalFocus,
    },

    journey: [
        {
            eyebrow: '01 · Création',
            title: 'Le regard avant le code',
            text: "Avant les composants, je regarde la lecture d'ensemble : rythme, contraste, hiérarchie, intention. Une interface doit d'abord être comprise avant d'être admirée.",
        },
        {
            eyebrow: '02 · Interface',
            title: "L'usage avant l'effet",
            text: "Une interface réussie ne repose pas sur l'effet. Elle doit guider, rassurer et aider à décider vite. C'est là que l'UX, le responsive et les détails de finition comptent vraiment.",
        },
        {
            eyebrow: '03 · Front-end',
            title: 'La structure pour donner vie',
            text: "Avec React, Next.js et TypeScript, je transforme cette intention en composants maintenables. Le code m'apporte la structure : découper, nommer, tester et faire évoluer sans brouiller l'ensemble.",
        },
    ],

    principles: [
        'Comprendre avant de produire',
        'Soigner la hiérarchie visuelle',
        'Construire des composants réutilisables',
        "Chercher la clarté plutôt que l'effet",
        'Apprendre en construisant',
    ],

    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'UI/UX', 'Accessibilité', 'Performance Web'],

    quote: siteNarrative.quotePair,

    cta: {
        title: 'Découvrir ma manière de construire.',
        text: "Mes projets montrent comment j'aborde un sujet de bout en bout : cadrage, direction visuelle, structure des composants et qualité d'exécution.",
        primary: 'Voir mes projets',
        secondary: 'Me contacter',
    },
} as const;
