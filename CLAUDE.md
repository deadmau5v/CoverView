# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CoverView is a web application for creating custom blog cover images with various themes, patterns, and styling options. It integrates with Unsplash for background images and supports 7 different visual themes with extensive customization.

**Tech Stack:**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 7.x (migrated from Create React App)
- **Package Manager**: Bun 1.3+ (migrated from npm)
- **Styling**: Tailwind CSS with custom patterns
- **Image Export**: dom-to-image library for converting DOM to PNG/WEBP
- **Icon System**: Devicons integration + custom upload support
- **Image Search**: Unsplash JS SDK

## Development Commands

```bash
# Development
bun run dev              # Start dev server at http://localhost:3000
bun dev                  # Alternative shorthand

# Building
bun run build            # Production build (outputs to build/)
bun run build:check      # Build with TypeScript type checking
bun run preview          # Preview production build

# Package Management
bun install              # Install dependencies
bun add <package>        # Add a new dependency
bun add -d <package>     # Add a dev dependency
bun remove <package>     # Remove a dependency

# Code Formatting
bun run format           # Format all source files with Prettier
bun run format:check     # Check if files are formatted correctly

# Note: TypeScript strict mode is currently disabled for gradual migration
```

## Environment Variables

Environment variables must be prefixed with `VITE_` (not `REACT_APP_`):

```bash
# .env
VITE_UNSPLASH_ACCESS_KEY=your_key_here
```

Access in code using:
```typescript
const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
```

Add new environment variables to `src/vite-env.d.ts`:
```typescript
interface ImportMetaEnv {
  readonly VITE_YOUR_VAR: string;
}
```

## Architecture

### Core Flow

1. **Editor** (`src/components/Editor.tsx`)
   - Class component managing application state
   - Handles user inputs: title, author, icon selection, theme, font, size presets
   - Fetches dev icons from devicons GitHub repository on mount
   - Wraps application with `ImgProvider` for global theme state

2. **ImgContext** (`src/utils/ImgContext.tsx`)
   - Global React Context for sharing state between components
   - Manages: `unsplashImage`, `colorTheme`, `setColorTheme`, `themeColors`
   - Used by theme components to access current color scheme

3. **CoverImage** (`src/components/CoverImage.tsx`)
   - Rendering layer that selects and displays the appropriate theme component
   - Handles responsive scaling using refs and CSS transforms
   - Maps theme names to theme components (BasicTheme, ModernTheme, etc.)

4. **ComponentToImg** (`src/components/ComponentToImg.tsx`)
   - Handles image export functionality
   - Uses `dom-to-image` to convert React component to PNG
   - Supports WEBP conversion with quality control
   - Triggers Unsplash download tracking when using Unsplash images

### Theme System

**Theme Structure:**
- 7 visual themes in `src/components/Themes/`:
  - `BackgroundTheme` - Full background image with overlay
  - `BasicTheme` - Simple centered layout
  - `ModernTheme` - Card-based modern design
  - `OutlineTheme` - Bordered outline style
  - `PreviewTheme` - Preview card layout
  - `StylishTheme` - Stylish gradient design
  - `MobileMockupTheme` - Mobile phone mockup

**Color Themes:**
- Defined in `src/utils/colorThemes.tsx`
- Multiple color schemes: One Dark, Catppuccin (Latte, Frappe, Macchiato, Mocha), Nord, Tokyo Night, Gruvbox, Solarized, Dracula
- Each theme includes: background, foreground, card, primary, secondary, accent, border, muted colors
- Accessed via `getThemeColors(colorTheme)` function

**Pattern System:**
- SVG background patterns in `src/assets/css/patterns.css`
- Applied via Tailwind classes like `pattern-dots`, `pattern-zigzag`, etc.
- Generated using Hero Patterns

### State Management

**Component State** (in Editor):
- `title`, `author` - Text content
- `icon`, `customIcon` - Icon selection
- `theme` - Visual theme name (e.g., 'background', 'modern')
- `pattern` - Background pattern class
- `font`, `fontSize` - Typography settings
- `download` - Export format (PNG/WEBP)
- `sizePreset`, `width`, `height` - Canvas dimensions

**Global State** (in ImgContext):
- `unsplashImage` - Currently selected Unsplash image
- `colorTheme` - Active color scheme name
- `themeColors` - Computed theme colors object

### Image Export Pipeline

1. User clicks download button
2. `ComponentToImg` receives ref to the theme component
3. `domtoimage.toPng()` converts DOM element to PNG data URL
4. If WEBP format selected:
   - Load PNG into Image object
   - Draw to Canvas
   - Convert to WEBP using `canvas.toDataURL('image/webp', quality)`
5. Trigger browser download
6. If Unsplash image used, trigger download tracking API call

## Key Integrations

### Unsplash API
- Configuration: `src/utils/unsplashConfig.tsx`
- Search functionality in `src/components/UnsplashSearch.tsx`
- Requires `VITE_UNSPLASH_ACCESS_KEY` environment variable
- Downloads must be tracked per Unsplash API guidelines

### Devicons
- Fetched from: `https://raw.githubusercontent.com/devicons/devicon/master/devicon.json`
- Icons rendered using CSS classes from devicon CDN
- Custom icon upload option prepended to icon list

## File Organization

```
src/
├── components/
│   ├── App.tsx                 # Router setup (React Router v6)
│   ├── Editor.tsx              # Main editor component
│   ├── CoverImage.tsx          # Theme renderer with scaling
│   ├── ComponentToImg.tsx      # Export functionality
│   ├── Header.tsx              # Navigation header
│   ├── Home.tsx                # Landing page
│   ├── Faq.tsx                 # FAQ page
│   ├── RandomTheme.tsx         # Random theme generator button
│   ├── UnsplashSearch.tsx      # Unsplash image search
│   └── Themes/                 # Individual theme components
├── utils/
│   ├── ImgContext.tsx          # Global state context
│   ├── colorThemes.tsx         # Color scheme definitions
│   ├── constants.tsx           # Theme metadata and presets
│   └── unsplashConfig.tsx      # Unsplash API setup
├── assets/
│   ├── css/patterns.css        # SVG background patterns
│   ├── icons/                  # Logo and icons
│   └── images/                 # Theme previews and screenshots
├── index.tsx                   # React 18 entry point
├── index.css                   # Global styles + Tailwind
└── vite-env.d.ts              # Type declarations for assets and env vars
```

## TypeScript Migration Status

**Current State:**
- All files converted from `.js` to `.tsx`
- TypeScript strict mode is **disabled** (`strict: false` in tsconfig.json)
- Many components use `any` types temporarily
- `npm run build` does NOT run type checking by default (use `npm run build:check` for type validation)

**Areas Needing Types:**
- Component props interfaces (most components use implicit `any`)
- Event handler parameters
- Unsplash API response types
- Theme component props
- State interfaces in Editor component

## Build Configuration

### Vite Config (`vite.config.ts`)
- Dev server port: 3000
- Build output: `build/` directory (not `dist/`)
- Path alias: `@/` → `src/`
- Source maps enabled in production

### Tailwind Config
- Custom fonts: Inter, Poppins, Anek Latin, Nunito
- Content scanning: `src/**/*.{js,jsx,ts,tsx}`

### Important CSS Details
- `@import` statements in `src/index.css` MUST come before `@tailwind` directives (PostCSS requirement)
- Custom scrollbar styling for better UX
- Responsive breakpoints for mobile (max-width: 768px)

## Common Patterns

### Adding a New Theme
1. Create component in `src/components/Themes/YourTheme.tsx`
2. Use `useContext(ImgContext)` to access `themeColors`
3. Accept props: `title`, `author`, `icon`, `pattern`, `font`, `fontSize`
4. Add to theme selector in `CoverImage.tsx`
5. Add preview image and metadata to `src/utils/constants.tsx`

### Adding a New Color Scheme
1. Add theme object to `COLOR_THEMES` in `src/utils/colorThemes.tsx`
2. Include all required color properties (background, foreground, primary, etc.)
3. Theme automatically appears in color selector

### Accessing Unsplash Images
Always use `ImgContext` to share selected image between search and theme components:
```typescript
const { unsplashImage, setUnsplashImage } = useContext(ImgContext);
```

## Migration Notes

This project was recently migrated from CRA to Vite + React 18 + TypeScript. See `MIGRATION.md` for details.

**Key Changes:**
- Environment variables: `REACT_APP_*` → `VITE_*`
- Entry point updated to React 18's `createRoot` API
- React Router v6: removed `exact` prop from routes
- Build output: `dist/` → `build/` (for deployment compatibility)

## Code Formatting

This project uses Prettier for automatic code formatting with Tailwind CSS class sorting.

**Configuration:**
- `.prettierrc` - Prettier configuration (semi, single quotes, tab width, etc.)
- `.prettierignore` - Files to exclude from formatting
- `.vscode/settings.json` - VS Code format-on-save enabled

**VS Code Integration:**
- Install recommended extension: `esbenp.prettier-vscode`
- Files automatically format on save
- Tailwind classes are automatically sorted

**Manual Formatting:**
```bash
bun run format        # Format all files
bun run format:check  # Check formatting without changes
```

**Formatting Rules:**
- Semicolons: Required
- Quotes: Double quotes
- Print width: 100 characters
- Tab width: 2 spaces
- Trailing commas: ES5
- End of line: LF

## Development Tips

- **Hot Reload**: Vite HMR is extremely fast (~68ms startup)
- **Image Testing**: Use Unsplash search or upload custom images
- **Theme Testing**: Use RandomTheme shuffle button for quick theme iteration
- **Export Testing**: Both PNG and WEBP formats should be tested
- **Responsive**: Check scaling behavior in CoverImage component when changing canvas sizes
- **Code Quality**: Run `bun run format` before committing to ensure consistent code style
