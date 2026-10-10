// The few words that make the site yours. Change them here and they change everywhere.
export const site = {
  title: 'My Journal',
  tagline: 'A quiet place to put things down.',
  welcome: 'Come in. Close the door behind you.',
};

// Every "room" in the house. A room is just a folder inside src/content/entries/.
// To add a new room (bookmarks, bucket list, recipes...):
//   1. add a line below
//   2. create a folder with the same slug in src/content/entries/
// That's all. Pages, links and the front-page doorway appear on their own.
export type Section = { slug: string; name: string; blurb: string };

export const sections: Section[] = [
  { slug: 'journal', name: 'Journal', blurb: 'Days as they happen.' },
  { slug: 'letters', name: 'Letters I Never Sent', blurb: 'Said here, instead of out loud.' },
  // { slug: 'bookmarks', name: 'Bookmarks', blurb: 'Things worth coming back to.' },
  // { slug: 'bucket-list', name: 'Bucket List', blurb: 'Someday, one by one.' },
];

// Turns a path like "/journal/" into one that also works when the site
// lives under a sub-path (e.g. username.github.io/my-journal/).
export const url = (path = '/') =>
  (import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, ''));
