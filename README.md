# Nganba Irom - Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features a dark theme with cyan/teal accents and smooth animations.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Static Export (GitHub Pages compatible)

## 📋 Features

- ✨ Modern dark theme with gradient accents
- 🎨 Smooth scroll animations with Framer Motion
- 📱 Fully responsive design
- ⚡ Optimized for performance
- 🔍 SEO-friendly with Next.js metadata API
- 🎯 Clean, maintainable code structure
- 📊 Case studies with Problem-Solution-Impact format
- 💼 Experience timeline with alternating layout
- 🛠️ Skills categorized by type
- 📬 Contact section with copy-to-clipboard email

## 🏗️ Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles & theme
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Section.tsx
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Skills.tsx          # Skills section
│   ├── Experience.tsx      # Experience timeline
│   ├── Projects.tsx        # Projects grid
│   ├── CaseStudies.tsx     # Detailed case studies
│   ├── Blog.tsx            # Blog placeholder
│   ├── Contact.tsx         # Contact section
│   ├── Navbar.tsx          # Navigation bar
│   └── Footer.tsx          # Footer
├── data/
│   ├── skills.ts           # Skills data
│   ├── projects.ts         # Projects data
│   ├── experience.ts       # Work experience data
│   └── social.ts           # Social links
├── lib/
│   ├── animations.ts       # Framer Motion variants
│   └── utils.ts            # Utility functions
├── public/
│   └── images/             # Project images
└── next.config.js          # Next.js configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/iromn/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Building for Production

### Static Export (for GitHub Pages)

1. Build the static site:

```bash
npm run build
```

This creates an optimized static export in the `out/` directory.

2. Test the production build locally:

```bash
npx serve out
```

## 🚀 Deployment to GitHub Pages

### Method 1: Manual Deployment

1. Build the static site:

```bash
npm run build
```

2. Create a new repository on GitHub (e.g., `username.github.io` or `portfolio`)

3. If using a repository name (not `username.github.io`), update `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/portfolio', // Add your repository name
}
```

4. Push the `out/` directory to the `gh-pages` branch:

```bash
git add out
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix out origin gh-pages
```

5. Go to your repository settings → Pages → Set source to `gh-pages` branch

### Method 2: GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## ✏️ Customization

### Updating Content

All content is stored in the `data/` directory:

- **Skills**: Edit `data/skills.ts`
- **Projects**: Edit `data/projects.ts`
- **Experience**: Edit `data/experience.ts`
- **Social Links**: Edit `data/social.ts`

### Adding a Resume

1. Add your resume PDF to `public/resume.pdf`
2. Update the resume URL in `data/social.ts`:

```typescript
export const resumeUrl = '/resume.pdf'
```

### Changing Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --background: #020617;
  --accent: #06b6d4;        /* Primary accent color */
  --accent-secondary: #8b5cf6; /* Secondary accent */
  /* ... */
}
```

### Adding Project Images

1. Add images to `public/images/`
2. Update the image path in `data/projects.ts`:

```typescript
{
  id: 'project-id',
  image: '/images/your-image.jpg',
  // ...
}
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (creates static export)
- `npm run start` - Start production server (not needed for static export)
- `npm run lint` - Run ESLint

## 🎨 Design Philosophy

- **Dark Theme**: Professional developer-focused aesthetic
- **Minimal**: Clean, uncluttered design
- **Animated**: Subtle Framer Motion transitions
- **Responsive**: Mobile-first approach
- **Performance**: Optimized for fast loading

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contact

- **Email**: <nganba.irom47@gmail.com>
- **GitHub**: [@iromn](https://github.com/iromn)
- **LinkedIn**: [nganba-irom](https://www.linkedin.com/in/nganba-irom/)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
