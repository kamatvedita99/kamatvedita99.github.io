import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One collection holds every entry. The folder an entry sits in decides its room:
// src/content/entries/letters/anything.md  ->  the "letters" room.
const entries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/entries' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // optional one-liner shown under the title and on listing pages
    note: z.string().optional(),
    // set to true to keep an entry out of the site while you're still writing it
    draft: z.boolean().default(false),
  }),
});

export const collections = { entries };
