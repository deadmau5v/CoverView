# CoverView Enhanced

Create customizable blog and social cover images in seconds.

> This is an enhanced fork of [rutikwankhade/CoverView](https://github.com/rutikwankhade/CoverView).
> Latest major update: migrated from Vite SPA to Next.js 15 App Router.

<p>
<a href="https://github.com/rutikwankhade/CoverView"><img src="https://img.shields.io/badge/Original-CoverView-blue"></a>
<a href="https://github.com/rutikwankhade/CoverView"><img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103"></a>
<a href="https://lbesson.mit-license.org"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
</p>

<img src="https://gist.github.com/user-attachments/assets/1d1c1833-29bc-45d6-97dd-e26c2d1019cb" height="auto" width="800px" margin="20px">

## Features

- Server-rendered app shell with Next.js App Router (`app/` directory)
- Cover editor with multiple visual themes and color themes
- Canvas size presets and typography customization
- Image search with two sources: Unsplash and Pexels
- Server-side API proxy routes for image search/download tracking
- Multi-language support with i18next
- Export cover images using `html-to-image`

## Tech Stack

- Next.js 15
- React 19 + TypeScript
- Tailwind CSS
- i18next / react-i18next
- html-to-image
- Unsplash API + Pexels API (via Next.js API routes)

## Project Structure

```text
app/                 # App Router pages and API routes
components/          # UI and editor components
components/themes/   # Theme renderer components
hooks/               # Custom hooks (image context)
lib/                 # Constants, i18n, Unsplash client
locales/             # Translation files
public/              # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.18+ (or newer LTS)
- npm

### Installation

```bash
git clone https://github.com/yourusername/CoverView.git
cd CoverView
npm install
```

### Environment Variables

Create `.env.local` in the project root:

```env
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
PEXELS_API_KEY=your_pexels_api_key_here
```

- `UNSPLASH_ACCESS_KEY`: required for Unsplash search
- `PEXELS_API_KEY`: required for Pexels search

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run Next.js lint
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

## Routes

- `/` home page
- `/editor` cover editor
- `/faq` FAQ
- `/code-of-conduct` code of conduct

## API Routes

- `GET /api/unsplash/search?q=<keyword>&page=<n>`
- `POST /api/unsplash/download`
- `GET /api/pexels/search?q=<keyword>&page=<n>`
- `POST /api/pexels/download`

## Breaking Changes (Migration Notes)

- Migrated from Vite SPA to Next.js App Router
- Removed legacy `src/`-based entry structure
- Environment variable renamed:
  - `VITE_UNSPLASH_ACCESS_KEY` -> `UNSPLASH_ACCESS_KEY`
- Added server-side API routes for Unsplash/Pexels integrations
- Replaced `dom-to-image`/`react-component-export-image` usage with `html-to-image`

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

1. Fork the repository
2. Create your branch (`git checkout -b feature/my-change`)
3. Commit your changes (`git commit -m "feat: describe change"`)
4. Push to your branch (`git push origin feature/my-change`)
5. Open a pull request

## Acknowledgments

- [rutikwankhade/CoverView](https://github.com/rutikwankhade/CoverView) for the original project
- [Unsplash](https://unsplash.com/) for image APIs
- [Pexels](https://www.pexels.com/api/) for image APIs

## License

MIT License. See [LICENSE](LICENSE).


