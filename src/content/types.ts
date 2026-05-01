import type { LucideIcon } from 'lucide-react';

export type TextSection<TIcon extends string = string> = {
    icon: TIcon;
    text: string;
};

export type PrefaceContent = {
    title: string;
    role: string;
    availability: string;
    intro: string;
    heroKicker: string;
    heroTitle: {
        first: string;
        second: string;
        third: string;
    };
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    profileName: string;
    profileRole: string;
    profileStack: string;
    quote: string;
    sections: ReadonlyArray<TextSection<'ui' | 'code' | 'learning'>>;
    stats: ReadonlyArray<{ label: string; value: string }>;
};

export type WhyMeContent = {
    kicker: string;
    title: string;
    subtitle: string;
    intro: string;
    chips: ReadonlyArray<{ kind: 'tech' | 'design' | 'architecture' | 'tool'; label: string }>;
    contributionTitle: string;
    sections: ReadonlyArray<TextSection<'clarity' | 'system' | 'delivery'>>;
    stats: ReadonlyArray<{ label: string; value: string }>;
};

export type VisionContent = {
    kicker: string;
    title: string;
    intro: string;
    quote: string;
};

export type CollaborationContent = {
    title: string;
    intro: string;
    ctaPrimary: string;
    ctaSecondary: string;
};

export type ContactAction = {
    href: string;
    icon: LucideIcon;
    title: string;
    description: string;
    external?: boolean;
};

export type ContactContent = {
    metadata: {
        title: string;
        description: string;
    };

    hero: {
        kicker: string;
        responseDelay: string;
        title: {
            first: string;
            accent: string;
        };
        intro: string;
        ctaPrimary: string;
        ctaSecondary: string;
    };

    form: {
        kicker: string;
        title: string;
        intro: string;
        submitLabel: string;
        loadingLabel: string;
    };

    aside: {
        kicker: string;
        title: string;
        intro: string;
        noteTitle: string;
        note: string;
    };

    actions: ReadonlyArray<ContactAction>;
};
