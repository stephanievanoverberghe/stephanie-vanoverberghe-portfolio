'use client';

import Image from 'next/image';
import Link from 'next/link';

import { BRAND } from './header.data';

export function HeaderBrand() {
    return (
        <Link href="/" aria-label="Retour à l'accueil" className="group flex min-w-0 items-center gap-4">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-(--gold) bg-(--surface-2)">
                <Image src={BRAND.avatarSrc} alt={BRAND.name} fill sizes="48px" className="object-cover" priority />
            </span>

            <span className="hidden min-w-0 sm:block">
                <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-(--text-strong)">Stéphanie</span>
                <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.18em] text-(--accent)">Développeuse Frontend</span>
            </span>
        </Link>
    );
}
