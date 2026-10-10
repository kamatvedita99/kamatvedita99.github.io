import { getCollection, type CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'entries'> & { section: string; slug: string };
export type Line = { id: string; section: string; text: string; date: Date };

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// "One line a day" entries live in a folder called "lines" inside a room,
// e.g. journal/lines/2026-10-11-0830-line.md. They are shown as short dated
// sentences, not as pages of their own, so the normal lists leave them out.
const isLine = (id: string) => {
  const parts = id.split('/');
  return parts.length > 2 && parts[1] === 'lines';
};

// All published entries, newest first. An entry's id looks like "letters/some-title",
// so the part before the slash is its room and the part after is its page name.
export async function getEntries(section?: string): Promise<Entry[]> {
  const all = await getCollection('entries', ({ id, data }) => !data.draft && !isLine(id));
  return all
    .map((e) => {
      const [sec, ...rest] = e.id.split('/');
      return { ...e, section: sec, slug: rest.join('/') } as Entry;
    })
    .filter((e) => !section || e.section === section)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// The one-liners, newest first. The sentence itself is the entry's title.
export async function getLines(section?: string): Promise<Line[]> {
  const all = await getCollection('entries', ({ id, data }) => !data.draft && isLine(id));
  return all
    .map((e) => ({ id: e.id, section: e.id.split('/')[0], text: e.data.title, date: e.data.date }))
    .filter((l) => !section || l.section === section)
    .sort((a, b) => b.date.valueOf() - a.date.valueOf() || b.id.localeCompare(a.id));
}
