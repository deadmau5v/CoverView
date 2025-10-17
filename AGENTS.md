# Repository Guidelines

## Project Structure & Module Organization
- `src/components/` houses feature flows such as `Home`, `Editor`, and shared UI pieces; keep new features self-contained with companion CSS in the same folder.
- `src/assets/` stores theme resources under `css`, `icons`, and `images`; use `public/` for static entry files (`index.html`, `manifest.json`) and metadata assets.
- Application state helpers live in `src/utils/` (see `ImgContext`, `constants`, `unsplashConfig`); Tailwind setup is centralized in `src/index.css` and `tailwind.config.js`.

## Build, Test, and Development Commands
- `npm install` resolves dependencies using the committed `package-lock.json`; align with the current Node LTS release for compatibility.
- `npm start` runs the Create React App dev server at `http://localhost:3000` with hot reload.
- `npm run build` emits optimized assets into `build/`; `npm test` launches Jest + React Testing Library in watch mode (`npm test -- --watchAll=false` for CI).

## Coding Style & Naming Conventions
- Prefer functional React components in `PascalCase.js`; hooks, utilities, and handlers remain `camelCase`.
- Follow the CRA ESLint defaults; format with two-space indentation and trailing commas to match existing files.
- Reach for Tailwind utility classes first; fall back to scoped CSS (`CoverImage.css`, `RandomTheme.css`) when patterns need custom styling.

## Testing Guidelines
- Co-locate component tests as `ComponentName.test.js` beside implementation files, exercising flows with React Testing Library.
- Prioritize user-facing behavior: verify rendered content, theme toggles, and Unsplash interactions; keep snapshot tests minimal.
- Ensure new features add tests or explain coverage gaps inside the pull request checklist.

## Commit & Pull Request Guidelines
- Match the repository’s conventional prefixes (`feat:`, `fix:`, `chore:`, `doc:`) with concise, imperative summaries.
- Develop on topic branches like `feature/editor-shortcuts`; reference linked issues or discussions in the PR introduction.
- PRs should supply a brief changelog, testing notes, and before/after screenshots for UI-facing adjustments.

## Environment & Configuration
- Store secrets in `.env.local`; Unsplash integration requires `REACT_APP_API_ACCESS_KEY`, which CRA exposes at build time.
- Keep environment files out of version control and redact keys from recorded demos or screenshots.
