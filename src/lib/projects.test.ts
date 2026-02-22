import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { MockInstance } from '@vitest/spy';

vi.mock('node:fs/promises', () => ({
    readdir: vi.fn(),
    readFile: vi.fn(),
}));

import { readdir, readFile } from 'node:fs/promises';
import { getAllProjects, getProjectBySlug } from './projects';

const mockedReaddir = readdir as unknown as MockInstance<typeof readdir>;
const mockedReadFile = readFile as unknown as MockInstance<typeof readFile>;

describe('projects loader', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('parses a valid JSON project', async () => {
        mockedReadFile.mockResolvedValueOnce(
            JSON.stringify({
                slug: 'demo-projet',
                title: 'Demo Projet',
                year: 2025,
                stack: ['Next.js', 'TypeScript'],
            }),
        );

        const project = await getProjectBySlug('demo-projet');

        expect(project).toEqual({
            slug: 'demo-projet',
            title: 'Demo Projet',
            subtitle: undefined,
            year: 2025,
            role: undefined,
            stack: ['Next.js', 'TypeScript'],
            context: undefined,
            objectives: undefined,
            challenges: undefined,
            solutions: undefined,
            highlights: undefined,
            links: undefined,
            logo: undefined,
            hero: undefined,
            gallery: undefined,
        });
    });

    it('falls back to file slug when slug is missing from JSON', async () => {
        mockedReadFile.mockResolvedValueOnce(JSON.stringify({ title: 'Projet Sans Slug' }));

        const project = await getProjectBySlug('slug-fallback');
        expect(project?.slug).toBe('slug-fallback');
    });

    it('sorts projects by descending year', async () => {
        mockedReaddir.mockResolvedValueOnce(['alpha.json', 'beta.json', 'gamma.json'] as unknown as Awaited<ReturnType<typeof readdir>>);

        mockedReadFile
            .mockResolvedValueOnce(JSON.stringify({ title: 'Alpha', year: 2022 }))
            .mockResolvedValueOnce(JSON.stringify({ title: 'Beta', year: 2025 }))
            .mockResolvedValueOnce(JSON.stringify({ title: 'Gamma', year: 2024 }));

        const projects = await getAllProjects();

        expect(projects.map((p) => `${p.title}-${p.year}`)).toEqual(['Beta-2025', 'Gamma-2024', 'Alpha-2022']);
    });
});
