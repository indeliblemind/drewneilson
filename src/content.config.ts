import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const pieces = defineCollection({
 loader: glob({ pattern: '**/*.md', base: './src/content/pieces' }),
 schema: z.object({
  title: z.string().min(1), label: z.string().optional(),
  kind: z.enum(['job', 'project', 'idea']), summary: z.string().min(1),
  status: z.string().optional(), role: z.string().optional(), attribution: z.string().optional(),
  period: z.string().optional(),
  startDate: z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/).optional(),
  endDate: z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/).optional(),
  topics: z.array(z.string().trim().min(1)).default([]),
  draft: z.boolean().default(true),
  connections: z.array(z.object({
   to: z.string().min(1), relation: z.enum(['part-of', 'led-to', 'informed', 'related']),
   note: z.string().optional(),
  })).default([]),
 }),
});
export const collections = { pieces };
