# Repository Guidelines

## Project Structure & Module Organization
- `app/` houses the Next.js App Router pages, layouts, and API routes.
- `components/` contains React components; `components/themes/` specifically contains the various cover image themes.
- `hooks/` and `lib/` contain custom hooks and utility logic respectively.
- `public/` is used for static assets like images, logos, and `manifest.json`.
- `locales/` stores i18n translation files.

## Build, Test, and Development Commands
- `npm install` resolves dependencies.
- `npm run dev` starts the Next.js development server at `http://localhost:3000`.
- `npm run build` creates an optimized production build in `.next/` and generates OpenNext artifacts in `.open-next/`.
- `npm run start` starts the production server.
- `npm run deploy` builds and deploys to Cloudflare via OpenNext.

## Coding Style & Naming Conventions
- Prefer functional React components in `PascalCase.tsx`.
- Follow Next.js and React best practices.
- Use Tailwind CSS for styling. Custom CSS can be found in `app/globals.css` or component-specific files if necessary.

## Commit & Pull Request Guidelines
- Match the repository’s conventional prefixes (`feat:`, `fix:`, `chore:`, `doc:`) with concise, imperative summaries.
- Develop on topic branches.
- PRs should supply a brief changelog and testing notes.

## Environment & Configuration
- Store secrets in `.env.local` or `.dev.vars` (for Wrangler).
- Unsplash search requires `UNSPLASH_ACCESS_KEY`.
- Pexels search requires `PEXELS_API_KEY`.
