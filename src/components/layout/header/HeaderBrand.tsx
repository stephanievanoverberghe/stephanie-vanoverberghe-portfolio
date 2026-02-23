// src/components/layout/header/HeaderBrand.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from './header.data';

export function HeaderBrand() {
    return (
        <Link href="/" aria-label="Retour à l'accueil" className="group inline-flex items-center gap-3">
            <span className="relative h-9 w-9 overflow-hidden rounded-full border border-(--border-soft) bg-(--surface-2)">
                <Image src={BRAND.avatarSrc} alt={`Portrait de ${BRAND.name}`} fill sizes="36px" className="object-cover" priority={false} />
            </span>

            <span className="leading-none">
                <span className="block text-sm font-semibold tracking-wide text-(--text-strong)">{BRAND.name}</span>
                <span className="block text-xs opacity-70">{BRAND.title}</span>
            </span>

            <span aria-hidden className="hidden sm:inline-block h-2 w-2 rounded-full transition-transform group-hover:scale-110 bg-(--accent)" />
        </Link>
    );
}
