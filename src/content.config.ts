import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const pieces = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pieces' }),
  schema: z.object({
    title: z.string(), kind: z.enum(['job', 'story', 'thought-experiment']),
    summary: z.string(), topics: z.array(z.string()).default([]),
    label: z.string().optional(),
    status: z.string().default('Draft'),
    layout: z.enum(['featured', 'story', 'fragment', 'context']).default('fragment'),
    draft: z.boolean().default(true), order: z.number().default(0),
  }),
});
export const collections = { pieces };
