# LaneVal — Landing Page + API

Official marketing site for **LaneVal**, an AI margin assistant for independent truckload freight brokers. Built as a **Cloudflare Workers** app: a single [Hono](https://hono.dev) Worker serves the static site and `/api/*` routes, with both **SEO** (Google/Bing) and **GEO** (AI engines: ChatGPT, Perplexity, Google AI Overviews, Claude) in mind.

## Project structure

```
.
├── src/
│   └── index.ts             # Hono Worker: API routes + static-asset fallback
├── public/                  # Static assets served at the site root
│   ├── index.html           # Landing page (single page, all sections)
│   ├── 404.html             # Custom 404
│   ├── robots.txt           # Crawl + AI-bot allow rules, sitemap pointer
│   ├── sitemap.xml          # Sitemap
│   ├── llms.txt             # GEO: machine-readable product description for LLMs
│   └── assets/
│       ├── css/styles.css
│       ├── js/main.js
│       ├── favicon.svg
│       └── og-image.svg
├── package.json             # deps + dev/deploy/build scripts
├── wrangler.jsonc           # Cloudflare Workers config (static assets + bindings)
├── tsconfig.json
├── BUSINESS_PLAN.md         # Business plan
└── LICENSE
```

## Requirements

- Node.js 18+ and npm.

## Local preview

```bash
npm install
npm run dev
```

`wrangler dev` starts a local Worker at **http://localhost:8787** (serves the static site and the API). No separate build step is needed for local development.

## API

The Worker exposes a minimal API to build on:

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Liveness check — returns `{ ok, service, time }`. |
| `POST` | `/api/early-access` | Early-access form submission (scaffold only — logs the JSON body and returns `202`; no storage yet). |

Add new routes in `src/index.ts` on the `app` instance (e.g. `app.get("/api/foo", (c) => c.json({ ... }))`). Bindings (D1, KV, R2, queues, …) go in `wrangler.jsonc` and are typed via `npm run cf-typegen`.

> The on-page early-access form currently composes a `mailto:` and is not yet wired to `/api/early-access`. To switch it over, replace the `mailto` handler in `public/assets/js/main.js` with a `fetch("/api/early-access", { method: "POST", ... })` call — then add a storage binding to actually persist submissions.

## Build & type-check

```bash
npm run build      # tsc --noEmit (type-check)
npm run cf-typegen # generate worker-configuration.d.ts from wrangler.jsonc bindings
```

`wrangler deploy` bundles the TypeScript Worker automatically — there is no separate bundling step.

## Deploy to Cloudflare

1. Install, authenticate, and deploy:
   ```bash
   npm install
   wrangler login          # interactive — opens a browser
   npm run deploy
   ```
2. Your site is live at `https://laneval.<your-subdomain>.workers.dev` (the exact URL is printed by `wrangler deploy`).

### Custom domain (`laneval.com`)

1. Make sure `laneval.com` is an **Active** zone in Cloudflare (nameservers pointed at Cloudflare).
2. Dashboard → **Workers & Pages → laneval → Settings → Domains & Routes → Add → Custom Domain** → enter `laneval.com` (and `www.laneval.com` if desired). Cloudflare creates the DNS records and SSL cert automatically.
3. The Worker redirects `www.laneval.com` → `laneval.com` (apex is canonical) via a 301 in `src/index.ts`.

To auto-deploy on every push to `main`, connect the repo in the Cloudflare dashboard (**Workers & Pages → Create → Workers → Connect to Git**) using build command `npm run build` (optional) and no separate output directory — `wrangler` handles the deploy.

## Before you launch — customize these

- **Domain / canonical URL:** the canonical, Open Graph, `robots.txt`, `sitemap.xml`, and `llms.txt` URLs now point to `https://laneval.com/`. If you change the domain, update `public/index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, and the www-redirect in `src/index.ts`.
- **Contact email:** `hello@laneval.io` appears in the CTA and the early-access form.
- **OG image:** `public/assets/og-image.svg` is an SVG. For full social-preview support (LinkedIn/Facebook/X render SVGs inconsistently), replace it with a **1200×630 PNG** and update the `og:image` / `twitter:image` tags.
- **Favicon:** `public/assets/favicon.svg` is already wired up.

## SEO / GEO notes

- **SEO:** semantic HTML, one H1, `<title>` + meta description, canonical, Open Graph + Twitter cards, JSON-LD structured data (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`), `robots.txt`, `sitemap.xml`.
- **GEO:** `llms.txt` at the root, explicit product + category in the first sentence, FAQ section with concise quotable answers, specific numbers/claims LLMs can cite, and `robots.txt` rules that explicitly allow GPTBot, ClaudeBot, PerplexityBot, and Google-Extended.
- **Headless-crawl friendly:** no client-side-rendered content — all copy is in the HTML.
- **Headers:** security headers (frame/type/referrer/permissions policy) are set in the Worker (`src/index.ts`); cache headers for `/assets/*` (immutable) and `/` (revalidate) are set there too, replacing the old Pages `_headers` file.
