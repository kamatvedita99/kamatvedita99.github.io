// The few words that make the site yours. Change them here and they change everywhere.
export const site = {
  title: 'My Safe Space',
  tagline: 'A quiet place to put things down.',
  // shown until the time-of-day greeting takes over (see index.astro)
  welcome: 'Come in. Close the door behind you.',
};

// Every "room" in the house. A room is just a folder inside src/content/entries/.
// To add a new room (bookmarks, bucket list, recipes...):
//   1. add a line below
//   2. create a folder with the same slug in src/content/entries/
// That's all. Pages, links and the front-page doors appear on their own.
export type Section = {
  slug: string;
  name: string;
  blurb: string;
  // the colour of this room's door: a CSS colour (it works in light and dark)
  door: string;
  // optional ink stamp shown on every page in this room
  stamp?: string;
  // optional shelves: the room's page groups entries under these headings.
  // An entry picks its shelf with `shelf: "..."` in its header.
  shelves?: string[];
};

export const sections: Section[] = [
  { slug: 'journal', name: 'Journal', blurb: 'Days as they happen.', door: '#b5573a' },
  {
    slug: 'letters',
    name: 'Letters I Never Sent',
    blurb: 'Said here, instead of out loud.',
    door: '#5f7a6a',
    stamp: 'never sent',
  },
  {
    slug: 'curious-mind',
    name: 'The Curious Mind',
    blurb: 'Articles, essays, books and ideas that make me think.',
    door: '#4f6f8f',
    shelves: ['To read', 'Books', 'Read & remembered'],
  },
  // { slug: 'bucket-list', name: 'Bucket List', blurb: 'Someday, one by one.', door: '#8a6a3c' },
];

// Turns a path like "/journal/" into one that also works when the site
// lives under a sub-path (e.g. username.github.io/my-journal/).
export const url = (path = '/') =>
  (import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, ''));
