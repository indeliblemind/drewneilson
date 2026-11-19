import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import {competencyIds} from './data/competencies';
const pieces = defineCollection({
 loader: glob({ pattern: '**/*.md', base: './src/content/pieces' }),
 schema: z.object({
  title: z.string().min(1), label: z.string().optional(),
  subtitle: z.string().optional(), headline: z.string().optional(),
  headlineHighlights: z.array(z.string().trim().min(1)).default([]),
  introduction: z.string().optional(),
  kind: z.enum(['job', 'project', 'idea']), summary: z.string().min(1),
  status: z.string().optional(), role: z.string().optional(), attribution: z.string().optional(),
  // Optional descriptors stay in frontmatter; the Markdown body remains the narrative.
  employer: z.string().optional(), location: z.string().optional(),
  workArrangement: z.string().optional(), employmentType: z.string().optional(),
  recordClass: z.string().optional(), problem: z.string().optional(),
  hypothesis: z.string().optional(), approach: z.string().optional(),
  outcome: z.string().optional(), lessons: z.string().optional(),
  proposition: z.string().optional(), origin: z.string().optional(), limitations: z.string().optional(),
  period: z.string().optional(),
  startDate: z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/).optional(),
  endDate: z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/).optional(),
  topics: z.array(z.string().trim().min(1)).default([]),
  competencies: z.array(z.enum(competencyIds)).default([]),
  accomplishments: z.array(z.object({
   id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
   text: z.string().min(1),
   competencies: z.array(z.enum(competencyIds)).default([]),
   default: z.boolean().default(false),
   priority: z.number().default(0),
   supporting: z.string().optional(),
  })).default([]),
  draft: z.boolean().default(true),
  connections: z.array(z.object({
   to: z.string().min(1), relation: z.enum(['part-of', 'led-to', 'informed', 'related']),
   note: z.string().optional(),
  })).default([]),
 }),
});
export const collections = { pieces };
