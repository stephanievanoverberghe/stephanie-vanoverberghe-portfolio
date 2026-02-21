// src/components/project/GalleryLightbox.tsx
'use client';

import * as React from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export type GalleryItem = { src: string; alt?: string };

type Props = {
    images: GalleryItem[];
    title?: string;
    className?: string;

    // ✅ controlled (optionnel)
    open?: boolean;
    startIndex?: number;
    onClose?: () => void;
};

function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(' ');
}

export default function GalleryLightbox({ images, title, className, open, startIndex = 0, onClose }: Props) {
    const isControlled = typeof open === 'boolean';

    // mode autonome
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [internalIndex, setInternalIndex] = React.useState<number | null>(null);

    // état “source of truth”
    const isOpen = isControlled ? !!open : internalOpen;
    const [controlledIndex, setControlledIndex] = React.useState(startIndex);

    // quand on ouvre depuis le parent, on se cale sur startIndex
    React.useEffect(() => {
        if (!isControlled) return;
        if (open) setControlledIndex(startIndex);
    }, [isControlled, open, startIndex]);

    const openIndex = isControlled ? (isOpen ? controlledIndex : null) : internalIndex;

    const close = React.useCallback(() => {
        if (isControlled) onClose?.();
        else {
            setInternalOpen(false);
            setInternalIndex(null);
        }
    }, [isControlled, onClose]);

    const prev = React.useCallback(() => {
        if (openIndex === null) return;
        const nextIdx = (openIndex - 1 + images.length) % images.length;

        if (isControlled) setControlledIndex(nextIdx);
        else setInternalIndex(nextIdx);
    }, [openIndex, images.length, isControlled]);

    const next = React.useCallback(() => {
        if (openIndex === null) return;
        const nextIdx = (openIndex + 1) % images.length;

        if (isControlled) setControlledIndex(nextIdx);
        else setInternalIndex(nextIdx);
    }, [openIndex, images.length, isControlled]);

    // scroll lock + keyboard
    React.useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };

        window.addEventListener('keydown', onKey);
        return () => {
            document.documentElement.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
        };
    }, [isOpen, close, prev, next]);

    const current = openIndex !== null ? images[openIndex] : null;

    const ctrlCls =
        'inline-flex items-center justify-center rounded-full border transition ' +
        'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ' +
        'hover:scale-[1.04] active:scale-[0.98]';

    const ctrlStyle: React.CSSProperties = {
        outlineColor: 'var(--ring-focus)',
        borderColor: 'color-mix(in oklab, var(--surface-1) 40%, transparent)',
        color: 'var(--surface-1)',
        background: 'color-mix(in oklab, var(--ink) 42%, transparent)',
        boxShadow: '0 10px 30px rgba(2,8,23,0.35)',
    };

    return (
        <>
            {/* Grid (utile si tu utilises le composant seul) */}
            <div className={className ?? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
                {images.map((g, i) => (
                    <figure
                        key={g.src}
                        className="group overflow-hidden rounded-2xl border hover:shadow-[0_14px_40px_rgba(2,8,23,0.10)] transition"
                        style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)', boxShadow: 'var(--shadow-card)' }}
                    >
                        <button
                            type="button"
                            onClick={() => {
                                if (isControlled) {
                                    setControlledIndex(i);
                                } else {
                                    setInternalIndex(i);
                                    setInternalOpen(true);
                                }
                            }}
                            className="relative block w-full aspect-4/3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                            style={{ outlineColor: 'var(--ring-focus)' }}
                            aria-label={`Ouvrir l’image ${i + 1} sur ${images.length}`}
                        >
                            <Image
                                src={g.src}
                                alt={g.alt ?? title ?? 'Image'}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <span
                                aria-hidden
                                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                                style={{ boxShadow: 'inset 0 -80px 120px rgba(2,8,23,0.18)' }}
                            />
                        </button>

                        {g.alt ? (
                            <figcaption className="px-3 py-2 text-xs opacity-75" style={{ color: 'var(--text)' }}>
                                {g.alt}
                            </figcaption>
                        ) : null}
                    </figure>
                ))}
            </div>

            {/* Lightbox */}
            {isOpen && current
                ? (() => {
                      const idx = openIndex ?? 0;

                      return (
                          <div role="dialog" aria-modal="true" aria-label="Visionneuse" className="fixed inset-0 z-999">
                              <button
                                  type="button"
                                  aria-label="Fermer"
                                  onClick={close}
                                  className="absolute inset-0"
                                  style={{ background: 'color-mix(in oklab, var(--ink) 74%, transparent)' }}
                              />
                              <div className="absolute inset-0 backdrop-blur-[10px]" />

                              <div className="relative mx-auto flex h-full max-w-6xl flex-col px-3 py-4 md:px-6 md:py-6">
                                  <div className="flex items-center justify-between gap-3">
                                      <div
                                          className="text-xs md:text-sm opacity-85 px-3 py-1 rounded-full border"
                                          style={{
                                              color: 'var(--surface-1)',
                                              borderColor: 'color-mix(in oklab, var(--surface-1) 28%, transparent)',
                                              background: 'color-mix(in oklab, var(--ink) 40%, transparent)',
                                          }}
                                      >
                                          {idx + 1} / {images.length}
                                      </div>

                                      <button
                                          type="button"
                                          onClick={close}
                                          className={cn(ctrlCls, 'h-10 w-10 md:h-12 md:w-12 cursor-pointer')}
                                          style={ctrlStyle}
                                          aria-label="Fermer"
                                      >
                                          <X className="h-5 w-5" />
                                      </button>
                                  </div>

                                  <div className="relative mt-3 flex-1">
                                      <div
                                          className="absolute inset-0 rounded-2xl border overflow-hidden"
                                          style={{
                                              borderColor: 'color-mix(in oklab, var(--surface-1) 24%, transparent)',
                                              background: 'color-mix(in oklab, var(--ink) 18%, transparent)',
                                              boxShadow: '0 30px 90px rgba(2,8,23,0.45)',
                                          }}
                                      />

                                      <div className="relative h-full rounded-2xl overflow-hidden">
                                          <div className="absolute inset-0 flex items-center justify-center p-3 md:p-6">
                                              <div
                                                  className="relative w-full h-full rounded-xl overflow-hidden"
                                                  style={{ background: 'color-mix(in oklab, var(--surface-1) 70%, transparent)' }}
                                              >
                                                  <Image
                                                      key={current.src}
                                                      src={current.src}
                                                      alt={current.alt ?? title ?? 'Image'}
                                                      fill
                                                      sizes="100vw"
                                                      className="object-contain"
                                                      priority
                                                  />
                                              </div>
                                          </div>

                                          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:px-4">
                                              <button
                                                  type="button"
                                                  onClick={(e) => {
                                                      e.stopPropagation();
                                                      prev();
                                                  }}
                                                  className={cn(ctrlCls, 'h-10 w-10 md:h-12 md:w-12 cursor-pointer')}
                                                  style={ctrlStyle}
                                                  aria-label="Précédent"
                                              >
                                                  <ChevronLeft className="h-5 w-5" />
                                              </button>

                                              <button
                                                  type="button"
                                                  onClick={(e) => {
                                                      e.stopPropagation();
                                                      next();
                                                  }}
                                                  className={cn(ctrlCls, 'h-10 w-10 md:h-12 md:w-12 cursor-pointer')}
                                                  style={ctrlStyle}
                                                  aria-label="Suivant"
                                              >
                                                  <ChevronRight className="h-5 w-5" />
                                              </button>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="mt-3 space-y-3">
                                      {current.alt ? (
                                          <div className="text-center text-sm opacity-90" style={{ color: 'var(--surface-1)' }}>
                                              {current.alt}
                                          </div>
                                      ) : null}

                                      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                          {images.map((img, i) => {
                                              const active = i === idx;
                                              return (
                                                  <button
                                                      key={img.src}
                                                      type="button"
                                                      onClick={() => {
                                                          if (isControlled) setControlledIndex(i);
                                                          else setInternalIndex(i);
                                                      }}
                                                      className="relative shrink-0 h-14 w-20 md:h-16 md:w-24 overflow-hidden rounded-xl border transition cursor-pointer"
                                                      style={{
                                                          borderColor: active
                                                              ? 'color-mix(in oklab, var(--accent) 55%, var(--border-soft))'
                                                              : 'color-mix(in oklab, var(--surface-1) 24%, transparent)',
                                                          boxShadow: active ? '0 10px 28px rgba(2,8,23,0.35)' : undefined,
                                                          outline: 'none',
                                                      }}
                                                      aria-label={`Voir l’image ${i + 1}`}
                                                  >
                                                      <Image src={img.src} alt={img.alt ?? title ?? 'Miniature'} fill sizes="160px" className="object-cover" />
                                                      <span
                                                          aria-hidden
                                                          className="pointer-events-none absolute inset-0"
                                                          style={{
                                                              boxShadow: active
                                                                  ? 'inset 0 0 0 2px color-mix(in oklab, var(--accent) 55%, transparent)'
                                                                  : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                                                          }}
                                                      />
                                                  </button>
                                              );
                                          })}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      );
                  })()
                : null}
        </>
    );
}
