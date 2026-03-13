# Dilip Shakya - Tour & Trekking Guide Website

A modern, premium static website built with SvelteKit showcasing Dilip Shakya's tour and trekking guide services in Nepal, featuring a markdown-based blog system.

## 🌟 Features

- **Static Site Generation**: Fully pre-rendered for optimal performance
- **Markdown Blog**: Write blog posts in markdown with frontmatter metadata
- **Premium Design**: Modern dark mode with glassmorphism effects and smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast & Lightweight**: Optimized for performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open in browser at http://localhost:5173
```

### Building for Production

```bash
# Build static site
npm run build

# Preview production build
npm run preview
```

The static site will be generated in the `build/` directory, ready to deploy to any static hosting service.

## 📝 Adding Blog Posts

Blog posts are stored in `src/posts/` as markdown files with frontmatter metadata.

### Creating a New Post

1. Create a new `.md` file in `src/posts/`
2. Add frontmatter metadata at the top:

```markdown
---
title: "Your Post Title"
date: "2024-02-09"
author: "Dilip Shakya"
category: "Category Name"
excerpt: "Brief description of the post"
image: "/images/your-image.jpg"
---

Your post content here...
```

3. Add images to `static/images/`
4. The post will automatically appear on the blog page

### Post Metadata Fields

- `title`: Post title (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `author`: Author name (defaults to "Dilip Shakya")
- `category`: Post category (defaults to "Uncategorized")
- `excerpt`: Short description for post cards
- `image`: Featured image path (relative to static folder)

## 📁 Project Structure

```
dilip/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Navigation.svelte
│   │   │   └── BlogCard.svelte
│   │   └── utils/
│   │       └── posts.js
│   ├── posts/
│   │   ├── panauti-oldest-town.md
│   │   ├── 2015-earthquake-experience.md
│   │   ├── newari-foods-patan.md
│   │   └── welcome.md
│   ├── routes/
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   ├── +page.svelte
│   │   │   │   └── +page.js
│   │   │   ├── +page.svelte
│   │   │   └── +page.js
│   │   ├── +layout.svelte
│   │   ├── +layout.js
│   │   ├── +page.svelte
│   │   └── +page.js
│   └── app.css
├── static/
│   └── images/
├── svelte.config.js
├── vite.config.js
└── package.json
```

## 🎨 Customization

### Colors

Edit CSS custom properties in `src/app.css` to change the color scheme:

```css
:root {
  --color-accent-primary: hsl(280, 85%, 65%);
  --color-accent-secondary: hsl(200, 90%, 60%);
  /* ... more colors */
}
```

### Fonts

The site uses Inter for body text and Outfit for headings. Change fonts in `src/app.css`.

### Layout

Modify `src/routes/+layout.svelte` to update the header, footer, or overall layout.

## 🚢 Deployment

The built static site in the `build/` directory can be deployed to:

- **Netlify**: Drag and drop the `build/` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push the `build/` folder to a `gh-pages` branch
- **Any static hosting**: Upload the `build/` folder contents

### Build Command

```bash
npm run build
```

### Output Directory

```
build/
```

## 📧 Contact

- Email: info@dilipshakya.com.np
- Location: Lalitpur, Nepal
- Facebook: [Dilip Shakya](https://www.facebook.com/dilip.shakya.750)
- Instagram: [@whiteyshakyadilip](https://www.instagram.com/whiteyshakyadilip/)

## 📄 License

This project is created for Dilip Shakya's personal website.

---

Built with ❤️ using [SvelteKit](https://kit.svelte.dev/)
