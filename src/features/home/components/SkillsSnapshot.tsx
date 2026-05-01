import { Code2, Eye, Gauge, Layers3 } from 'lucide-react';

import Chip from '@/components/ui/Chip';
import SectionHeader from '@/components/ui/SectionHeader';
import { skillsSnapshotContent } from '@/content/home';
import { chipPropsByKind } from '@/lib/project-display';

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
                        className="surface-card surface-card-hover group rounded-[1.6rem] p-5"
                    >
                        <div className="flex items-start gap-4">
                            <div className="surface-accent-soft grid h-11 w-11 shrink-0 place-items-center rounded-2xl border">
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
