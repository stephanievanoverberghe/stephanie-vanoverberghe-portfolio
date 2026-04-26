'use client';

import Image from 'next/image';
import Link from 'next/link';

import { headerContent } from '@/content/navigation';
import { siteProfile } from '@/content/site';

export function HeaderBrand() {
    return (
        <Link href="/" aria-label={headerContent.homeAriaLabel} className="group flex min-w-0 items-center gap-4">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-(--gold) bg-(--surface-2)">
                <Image src={siteProfile.avatar.src} alt={siteProfile.avatar.alt} fill sizes="48px" className="object-cover" priority />
            </span>

            <span className="hidden min-w-0 sm:block">
                <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-(--text-strong)">{siteProfile.firstName}</span>
                <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.18em] text-(--accent)">{siteProfile.role}</span>
            </span>
        </Link>
    );
}
