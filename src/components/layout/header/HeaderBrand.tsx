'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from './header.data';

export function HeaderBrand() {
    return (
        <Link href="/" aria-label="Retour à l'accueil" className="group inline-flex items-center gap-3">
            <span
                className="relative h-11 w-11 overflow-hidden rounded-full border bg-(--surface-2)"
                style={{ borderColor: 'color-mix(in oklab, var(--gold) 38%, var(--border-soft))' }}
            >
                <Image
                    src={BRAND.avatarSrc}
                    alt={`Portrait de ${BRAND.name}`}
                    fill
                    sizes="44px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    priority={false}
                />
                <span aria-hidden className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 0 1px color-mix(in oklab, var(--paper) 60%, transparent)' }} />
            </span>

            <span className="min-w-0">
                <span className="block text-sm font-semibold tracking-[0.04em] text-(--text-strong)">{BRAND.name}</span>
                <span className="mt-1 block text-xs text-(--text-muted)">{BRAND.title}</span>
            </span>
        </Link>
    );
}
