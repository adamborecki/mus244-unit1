# MUS 244 — Unit 1

🔗 **Live site:** https://adamborecki.github.io/mus244-unit1/

The Unit 1 slide deck for MUS 244, presented as a scrollable stream of 205 rendered slide images. Select slides expand into an **"Explore more"** panel with curated external links (Chrome Music Lab, Ableton Learning Synths, PhET simulations, NASA, 3Blue1Brown, Sound Lab, and more) tied to that slide or slide range.

Companion to [Unit 1 Review](https://github.com/adamborecki/mus244-unit1-review) ([live](https://adamborecki.github.io/mus244-unit1-review/)) — an interactive quiz/tutorial hub for the same unit, linked from the deck's own explore panels.

## Stack

- **React 19** + **vinext** (RSC-capable dev/build tool) targeting a Cloudflare Workers runtime
- **Tailwind CSS 4** + **shadcn**-based UI components (`components/`, `components.json`)
- Deployed as a **static export to GitHub Pages** (see below), not to Cloudflare

## Structure

- `app/page.tsx` — the slide stream, the per-slide "Explore more" resource map (`resourcesBySlide` / `resourceRanges`), and which slides get an explore panel
- `app/layout.tsx`, `app/globals.css` — root layout and global styles
- `components/`, `hooks/`, `lib/` — shared UI components and utilities
- `public/` — static assets, including slide images (`slides/slide-<n>.png`)

## Running locally

```bash
npm ci
npm run dev      # start dev server
npm run build    # production build → dist/client
npm run lint      # oxlint
npm run format    # oxfmt
```

## Deployment

Pushes to `main` build the app and publish `dist/client` to GitHub Pages via [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml). The workflow copies `dist/client/mus244-unit1/_next` to `dist/client/_next` to keep asset paths working under the `/mus244-unit1/` Pages base path.

## Updating slide content

- Add/replace slide images under `public/slides/`.
- Bump `totalSlides` in `app/page.tsx` if the slide count changes.
- Add entries to `resourcesBySlide` (single slide) or `resourceRanges` (a slide range) to attach "Explore more" links; slides with no resources — or listed in `slidesWithoutExplore` — won't show the explore chip.
