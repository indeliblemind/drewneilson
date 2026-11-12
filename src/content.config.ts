import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const pieces = defineCollection({
 loader: glob({ pattern: '**/*.md', base: './src/content/pieces' }),
 schema: z.object({
  title: z.string().min(1), label: z.string().optional(),
  kind: z.enum(['job', 'project', 'idea']), summary: z.string().min(1),
  status: z.string().optional(), role: z.string().optional(), attribution: z.string().optional(),
  draft: z.boolean().default(true),
  connections: z.array(z.object({
   to: z.string().min(1), relation: z.enum(['part-of', 'led-to', 'informed', 'related']),
   note: z.string().optional(),
  })).default([]),
 }),
});
export const collections = { pieces };
