# Prathik Salla Portfolio

Modern portfolio website generated from the supplied GitHub README resume content. Built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis, and React Three Fiber.

## Features

- Cinematic minimal luxury visual identity with editorial typography and product-launch pacing
- Premium responsive UI with glassmorphism, animated backgrounds, gradients, and micro-interactions
- Dark and light mode with persisted theme switching
- Custom glowing cursor, mouse-reactive spotlight, Lenis smooth scrolling, and GSAP scroll reveals
- React Three Fiber luminous 3D artifact
- Studio narrative, capability index, sticky case-study projects, and cinematic CTA finale
- Hero, About, Skills, Experience, Projects, Education, Achievements, and Contact sections
- Interactive project cards with GitHub and demo links
- Typed content layer in `src/data/portfolio.ts`
- SEO metadata, Open Graph data, robots, sitemap, and web app manifest
- Clean component structure for easy editing and deployment

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

If PowerShell blocks `npm`, use:

```bash
npm.cmd install
npm.cmd run dev
```

## Edit Portfolio Content

Update resume details, projects, certifications, skills, links, and generated professional content in:

```text
src/data/portfolio.ts
```

Main visual sections live in:

```text
src/components/sections
```

## Production Build

```bash
npm run build
npm run start
```

## Deploy To Vercel

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com/new).
3. Import the GitHub repository.
4. Keep the default framework preset as `Next.js`.
5. Build command: `npm run build`.
6. Output directory: leave blank for Next.js.
7. Deploy.

After deployment, update the production URL in `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts` if your Vercel domain is different from `https://prathik-05.vercel.app`.
