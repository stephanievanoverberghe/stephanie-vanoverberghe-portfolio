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
    sections: ReadonlyArray<TextSection<'ui' | 'performance' | 'a11y'>>;
    stats: ReadonlyArray<{ label: string; value: string }>;
    profileName: string;
    profileStack: string;
    quote: string;
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
    kicker: string;
    responseDelay: string;
    title: string;
    intro: string;
    quickResponseTitle: string;
    quickResponseText: string;
    actions: ReadonlyArray<ContactAction>;
};
