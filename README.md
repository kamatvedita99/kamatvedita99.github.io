# My Journal

A small, quiet website that works like a house. Each section is a **room** (Journal, Letters I Never Sent, and whatever you add later), and each entry is one plain text file.

Built with [Astro](https://astro.build), hosted free on GitHub Pages, written from your phone with [Pages CMS](https://pagescms.org).

---

## How it's laid out, and why

```
src/
  site.ts                 <- site name, tagline, and the list of rooms
  content.config.ts       <- the rules every entry must follow
  content/entries/
    journal/              <- one .md file per journal entry
    letters/              <- one .md file per letter
  layouts/Base.astro      <- header, nav, footer: the frame around every page
  pages/
    index.astro           <- the doorway (home page)
    [section]/index.astro <- the list page for a room
    [section]/[slug].astro<- the page for one entry
  components/EntryList.astro
  lib/entries.ts          <- "give me the published entries, newest first"
  styles/global.css       <- colours, fonts, spacing
.pages.yml                <- tells Pages CMS what your rooms and fields are
.github/workflows/deploy.yml <- rebuilds and publishes the site on every save
```

**Why entries are plain files.** A `.md` file is just text with a small header. There's no database to run, nothing to log into, nothing that can break or expire, and your writing is yours in a format any tool can read in 20 years.

**Why one folder per room.** The folder an entry sits in decides which room it belongs to. So a new room is a new folder plus one line in `src/site.ts`, and the home page, navigation and list pages all appear on their own. That's what makes it easy to grow into bookmarks and a bucket list later.

**Why a static site.** Every page is built ahead of time into plain HTML. It loads fast on a bad connection (a bus, say), costs nothing to host, and has nothing to hack.

**Why the colours are tokens.** All colours live at the top of `global.css` as variables (`--paper`, `--ink`, `--accent`). To change the whole mood, change a few lines there. A second set of values switches the site to a lamp-lit dark mode automatically when your phone is in dark mode.

**Why `url()` in `site.ts`.** On GitHub Pages the site usually lives under a sub-path (`you.github.io/my-journal/`), so a link written as `/journal/` would break. `url('/journal/')` adds the right prefix everywhere.

---

## An entry file

```md
---
title: "A good day"
date: 2026-10-12
note: "Optional one-liner shown under the title."
draft: false
---

Write whatever you like here. **Bold**, *italic* and > quotes all work.
```

`draft: true` keeps an entry off the site while you're still writing it.

---

## Run it on your laptop

```bash
npm install
npm run dev      # opens at http://localhost:4321
```

---

## Put it online (one time)

1. Create a **public** repository on GitHub (Pages is free for public repos on a free account). Push this folder to it, on the `main` branch.
2. In the repo go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push again (or open the **Actions** tab and run "Publish the journal"). After a minute or two the site is live at `https://<your-username>.github.io/<repo-name>/`.

**Why Actions.** The workflow in `.github/workflows/deploy.yml` builds the site and publishes it every time something is saved to `main`. That is what lets a phone edit go live without you running anything.

Name the repo `<your-username>.github.io` if you'd like the site at the root address with no sub-path. The workflow handles both cases.

---

## Write from your phone

1. Go to [app.pagescms.org](https://app.pagescms.org) in your phone browser and sign in with GitHub.
2. Open this repo. You'll see **Journal** and **Letters I Never Sent**, because `.pages.yml` describes them.
3. Tap a room, tap **Add entry**, write, tap **Save**.
4. Saving commits the file to GitHub, which triggers the workflow, and the entry is on the site in a minute or two.

Tip: use your browser's "Add to Home Screen" on the Pages CMS page so it opens like an app.

**Why Pages CMS.** It's only an editor on top of your repo. It never holds your writing itself, so if it ever disappears, your files are still right there in GitHub.

---

## Add a new room (bookmarks, bucket list...)

1. In `src/site.ts`, add a line to `sections`, e.g. `{ slug: 'bookmarks', name: 'Bookmarks', blurb: '...' }` (there are commented examples).
2. Create the folder `src/content/entries/bookmarks/` and put at least one `.md` file in it.
3. Copy one block in `.pages.yml`, change `name`, `label` and `path`, so Pages CMS shows the new room on your phone.

---

## Good to know

- **Everything is public.** On a free GitHub account the repo has to be public for Pages, which means the `.md` source files are readable on GitHub as well as the website, **including entries marked `draft: true`**. Use `draft` only to hide something from the site, not to keep it private.
- **Fonts** (Lora for text, Caveat for the handwriting) are bundled into the site through the `@fontsource` packages, so they always load and nothing is fetched from a third party.
- **Door colours and stamps.** Each room's door colour (and the optional ink stamp, like "never sent") is set per room in `src/site.ts`.
- **The look is all in `src/styles/global.css`.** Colours are tokens at the top, with a second set for dark mode. The window scene on the home page is a small SVG in `src/pages/index.astro`.
- **Images** aren't set up yet. When you want photos in entries, that's a small addition (a `media` setting in `.pages.yml` plus a folder in `public/`).
- **Site name.** It's "My Journal" for now. Change `title`, `tagline` and `welcome` at the top of `src/site.ts`.
