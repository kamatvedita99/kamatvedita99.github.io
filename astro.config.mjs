import { defineConfig } from 'astro/config';

// SITE and BASE are filled in by the GitHub Actions workflow when it deploys.
// Locally (npm run dev) they fall back to the defaults, so you never touch this file.
export default defineConfig({
  site: process.env.SITE || 'http://localhost:4321',
  base: process.env.BASE || '/',
  trailingSlash: 'always',
});
