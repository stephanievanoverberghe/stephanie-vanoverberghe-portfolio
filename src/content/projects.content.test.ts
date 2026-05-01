import { describe, expect, it } from 'vitest';

import { getAllProjects } from '@/lib/projects';

describe('projects content consistency', () => {
    it('has unique slugs and required public fields', async () => {
        const projects = await getAllProjects();
        const slugs = new Set<string>();

        for (const project of projects) {
            expect(project.slug.length > 0).toBe(true);
            expect(project.title.length > 0).toBe(true);
            expect((project.context?.length ?? 0) > 0).toBe(true);

            expect(slugs.has(project.slug)).toBe(false);
            slugs.add(project.slug);

            if (project.status) {
                expect(project.status === 'published' || project.status === 'in-progress').toBe(true);
            }

            if (project.links?.demo) {
                expect(project.links.demo.startsWith('http')).toBe(true);
            }

            if (project.links?.repo) {
                expect(project.links.repo.startsWith('http')).toBe(true);
            }
        }
    });
});
