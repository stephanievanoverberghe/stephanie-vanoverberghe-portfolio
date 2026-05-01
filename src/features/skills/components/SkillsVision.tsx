import { Sparkles } from 'lucide-react';

import { skillsPageContent } from '@/content/skills-page';

export default function SkillsVision() {
    const { vision } = skillsPageContent;

    return (
        <section className="relative overflow-hidden rounded-[1.8rem] border border-(--border-soft) bg-(--surface-1) p-6 shadow-(--shadow-card) sm:p-8">
            <div aria-hidden className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-(--gold)/20 blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">{vision.kicker}</p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-(--text-strong)">{vision.title}</h2>
                </div>

                <div className="rounded-3xl border border-(--border-soft) bg-(--paper) p-5">
                    <Sparkles size={22} className="text-(--accent)" />

                    <p className="mt-4 text-sm leading-6 text-(--text)">{vision.intro}</p>

                    <p className="mt-4 text-lg font-medium leading-snug text-(--text-strong)">“{vision.quote}”</p>
                </div>
            </div>
        </section>
    );
}
