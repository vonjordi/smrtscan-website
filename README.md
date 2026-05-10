# InspiraCube Website (inspiracube.com)

Vite + React + Three.js single-page site for InspiraCube, plus statically-served subroutes for SMRTscan (`/smrtscan/`, `/privacy/`, `/terms/`, `/join/`) and Universal Links (`/.well-known/apple-app-site-association`).

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build

```bash
npm run build
```

Outputs static site to `dist/`. Vercel runs this automatically on push to `main`.

## Project layout

- `src/main.jsx` — Three.js motherbox, brain, product cards, scroll animations.
- `src/styles.css` — Page styling.
- `index.html` — Vite entry shell.
- `public/brain-reference.jpg` — Brain texture used by the 3D scene.
- `public/privacy/`, `public/terms/`, `public/smrtscan/` — Pre-rendered static legal/product pages (HTML harvested from the previous Next.js build; reference `/_next/static/...`).
- `public/_next/static/` — CSS + JS chunks for the legal/product pages.
- `public/join/index.html` — SMRTscan invite redirect (`/join/?t=<token>`); also paired with the AASA file for Universal Links.
- `public/.well-known/apple-app-site-association` — Apple App Site Association for SMRTscan Universal Links.
- `vercel.json` — Sets `Content-Type: application/json` on the AASA file (required by Apple).

## Important: do not break SMRTscan routes

The SMRTscan iOS app depends on:
- `/.well-known/apple-app-site-association` — Universal Links handshake. Path **must** stay exactly there with `Content-Type: application/json`.
- `/join/index.html` — invite redirect parsing `?t=<token>`. App pushes invite links of the form `https://inspiracube.com/join/?t=<token>`.
- `/privacy/` and `/terms/` — referenced by the App Store listing.

If you regenerate or replace these, keep them at the same paths.

## Deploy

Vercel project is connected to this GitHub repo. Pushing to `main` triggers a deploy.
