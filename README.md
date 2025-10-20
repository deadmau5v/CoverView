# CoverView Enhanced

Creating beautiful, customizable cover images for your blogs in seconds.

> **Note:** This is an enhanced fork of [rutikwankhade/CoverView](https://github.com/rutikwankhade/CoverView) with additional features and modern tech stack.

<p>
<a href="https://github.com/rutikwankhade/CoverView"><img src="https://img.shields.io/badge/Original-CoverView-blue"></a>
<a href="https://github.com/rutikwankhade/CoverView"><img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103"></a>
<a href="https://lbesson.mit-license.org"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
</p>




<img src="https://gist.github.com/user-attachments/assets/1d1c1833-29bc-45d6-97dd-e26c2d1019cb
" height="auto" width="800px"  margin="20px">



 


## ⚡ Features

### Core Features (Original)
- 🚀 Super fast and easy to use
- ✨ Unsplash integration to search images
- 🌠 100+ dev icons with option to upload custom icon
- 💾 Export as PNG or WEBP format

### ✨ Enhanced Features (This Fork)
- 🎨 **9 Color Themes**: One Dark, Catppuccin (Latte, Frappé, Macchiato, Mocha), Nord, Tokyo Night, Gruvbox, Solarized, Dracula
- 🖼️ **7 Visual Themes**: Background, Stylish, Basic, Modern, Outline, Preview, Mobile Mockup
- 📐 **Multiple Canvas Sizes**: 16:9, 4:3, 16:10, 1:1, 3:2 presets with custom dimensions support
- 🔤 **4 Font Families**: Inter, Poppins, Anek Latin, Nunito
- 📏 **Dynamic Font Sizing**: Adjustable text size for perfect layout
- 🎭 **Background Patterns**: Dots, Zigzag, Cross, and more SVG patterns
- 🌐 **Internationalization Ready**: Multi-language support structure
- ⚡ **Modern Tech Stack**: Vite, React 18, TypeScript, Bun
- 🎯 **Auto-format on Save**: Prettier with Tailwind CSS plugin

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 7.x (migrated from Create React App)
- **Package Manager**: Bun 1.3+
- **Styling**: Tailwind CSS with custom patterns
- **Code Quality**: Prettier with Tailwind CSS plugin
- **Image Processing**: dom-to-image for export
- **API Integration**: Unsplash JS SDK

## 📦 Installation & Development

### Prerequisites
- [Bun](https://bun.sh/) 1.3 or higher
- Node.js 18+ (if using npm/yarn instead)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/CoverView.git
cd CoverView/

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Unsplash API key

# Start development server
bun run dev
# or simply
bun dev
```

The app will be available at `http://localhost:3000`

### Available Scripts

```bash
# Development
bun run dev              # Start dev server
bun run build            # Production build
bun run preview          # Preview production build

# Code Quality
bun run format           # Format all files with Prettier
bun run format:check     # Check formatting
bun run build:check      # Build with TypeScript type checking
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

Get your Unsplash API key from [Unsplash Developers](https://unsplash.com/developers)


## 👇 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


1. Fork it (<https://github.com/rutikwankhade/CoverView/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request


## 🎯 What's Different from Original?

This fork enhances the original CoverView with:

1. **More Customization Options**
   - 9 professionally designed color themes vs original's color picker
   - Multiple canvas size presets (16:9, 4:3, etc.)
   - Font size adjustment
   - Additional font choices

2. **Modern Development Stack**
   - Migrated from Create React App to Vite (faster builds, better DX)
   - Full TypeScript support
   - Bun package manager for faster installs
   - Prettier auto-formatting

3. **Better Developer Experience**
   - Format-on-save with VS Code integration
   - Comprehensive documentation (CLAUDE.md)
   - Migration guide included
   - Better project structure

4. **Enhanced UI/UX**
   - Theme preview system
   - Better color scheme organization
   - Responsive canvas scaling

## 🙏 Acknowledgments

### Original Project
- [rutikwankhade/CoverView](https://github.com/rutikwankhade/CoverView) - Original creator and maintainer
- Visit [rutik.dev](https://rutik.dev) for more awesome projects

### Dependencies & Tools
- [dom-to-image](https://github.com/tsayen/dom-to-image) - DOM to image conversion
- [Hero Patterns](https://www.heropatterns.com/) - SVG background patterns
- [Devicons](https://github.com/devicons/devicon) - Developer icons
- [Unsplash](https://unsplash.com/) - Beautiful free images
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

⭐ If you found this useful, please star this repository and the [original project](https://github.com/rutikwankhade/CoverView)!


