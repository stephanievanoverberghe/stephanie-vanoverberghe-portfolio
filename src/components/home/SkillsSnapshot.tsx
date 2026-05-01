import { Code2, Eye, Gauge, Layers3 } from 'lucide-react';

import Chip from '@/components/ui/Chip';
import SectionHeader from '@/components/ui/SectionHeader';
import { skillsSnapshotContent } from '@/content/home';
import { chipPropsByKind } from './home.utils';

const iconByKey = { eye: Eye, code2: Code2, gauge: Gauge, layers3: Layers3 } as const;
const skillsGroups = skillsSnapshotContent.groups.map((group) => ({ ...group, icon: iconByKey[group.icon] }));

export default function SkillsSnapshot() {
    const [skillsTitleStart, skillsTitleEnd = ''] = skillsSnapshotContent.title.split(' à ');

    return (
        <section className="space-y-6">
            <SectionHeader
                kicker={skillsSnapshotContent.kicker}
                title={
                    <>
                        {skillsTitleStart}
                        <br className="hidden sm:block" /> à {skillsTitleEnd}
                    </>
                }
                intro={skillsSnapshotContent.intro}
            />

            <div className="grid gap-4 md:grid-cols-2">
                {skillsGroups.map(({ icon: Icon, kicker, title, text, chips }) => (
                    <article
                        key={title}
                        className="group rounded-[1.6rem] border bg-(--surface-1) p-5 shadow-(--shadow-card) transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(18,19,20,0.08)]"
                        style={{ borderColor: 'var(--border-soft)' }}
                    >
                        <div className="flex items-start gap-4">
                            <div
                                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border"
                                style={{
                                    borderColor: 'color-mix(in oklab, var(--accent) 28%, var(--border-soft))',
                                    background: 'color-mix(in oklab, var(--accent) 8%, var(--surface-1))',
                                }}
                            >
                                <Icon size={20} className="text-(--accent)" />
                            </div>

                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-(--accent)">{kicker}</p>

                                <h3 className="mt-1 text-lg font-semibold leading-snug text-(--text-strong)">{title}</h3>
                            </div>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-(--text)">{text}</p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {chips.map((chip) => (
                                <Chip key={chip.label} {...chipPropsByKind(chip.kind)}>
                                    {chip.label}
                                </Chip>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
