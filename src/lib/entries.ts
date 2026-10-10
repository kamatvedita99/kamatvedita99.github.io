import { getCollection, type CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'entries'> & { section: string; slug: string };

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// All published entries, newest first. An entry's id looks like "letters/some-title",
// so the part before the slash is its room and the part after is its page name.
export async function getEntries(section?: string): Promise<Entry[]> {
  const all = await getCollection('entries', ({ data }) => !data.draft);
  return all
    .map((e) => {
      const [sec, ...rest] = e.id.split('/');
      return { ...e, section: sec, slug: rest.join('/') } as Entry;
    })
    .filter((e) => !section || e.section === section)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
