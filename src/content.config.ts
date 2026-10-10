import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One collection holds every entry. The folder an entry sits in decides its room:
// src/content/entries/letters/anything.md  ->  the "letters" room.
const entries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/entries' }),
  schema: z.object({
    title: z.string().default('Untitled'),
    // a blank date (an empty box in the editor) becomes today, so it can't break a publish
    date: z.preprocess((v) => (v === '' || v == null ? new Date() : v), z.coerce.date()),
    // optional one-liner shown under the title and on listing pages
    note: z.string().optional(),
    // which shelf of a room the entry sits on (only rooms with shelves use this)
    shelf: z.string().optional(),
    // a link to the original article or book page; an empty box in the editor is fine
    link: z.union([z.string().url(), z.literal('')]).optional(),
    // set to true to keep an entry out of the site while you're still writing it
    draft: z.boolean().default(false),
  }),
});

export const collections = { entries };
