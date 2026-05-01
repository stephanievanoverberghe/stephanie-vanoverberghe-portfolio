import type { LucideIcon } from 'lucide-react';

export type NavLink = {
    href: `/${string}` | '/';
    label: string;
};

export type ExternalLink = {
    href: string;
    label: string;
};

export type SiteSocialLinks = {
    github: ExternalLink;
    linkedin: ExternalLink;
};

export type SiteProfile = {
    name: string;
    firstName: string;
    role: string;
    signature: string;
    availability: string;
    primaryStack: readonly string[];
    resumeHref: string;
    avatar: {
        src: string;
        alt: string;
    };
    quote: string;
    socials: SiteSocialLinks;
};

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
