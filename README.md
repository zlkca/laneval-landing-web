# LaneVal — Landing Page

Official marketing site for **LaneVal**, an AI margin assistant for independent truckload freight brokers. Static HTML/CSS/JS, built for **Cloudflare Pages** with both **SEO** (Google/Bing) and **GEO** (AI engines: ChatGPT, Perplexity, Google AI Overviews, Claude) in mind.

## Project structure

```
.
├── index.html              # Landing page (single page, all sections)
├── 404.html                # Custom 404
├── robots.txt              # Crawl + AI-bot allow rules, sitemap pointer
├── sitemap.xml             # Sitemap
├── llms.txt                # GEO: machine-readable product description for LLMs
├── _headers                # Cloudflare security + cache headers
├── BUSINESS_PLAN.md        # Business plan
└── assets/
    ├── css/styles.css
    ├── js/main.js
    ├── favicon.svg
    └── og-image.svg
```

## Local preview

No build step. Serve the directory and open `http://localhost:8000`:

```bash
python3 -m http.server 8000
# or
npx serve .
```

## Deploy to Cloudflare Pages

### Option A — Wrangler direct upload (fastest)

1. Install and authenticate (opens a browser — interactive, run it yourself):
   ```bash
   npm install -g wrangler
   wrangler login
   ```
2. Create + deploy:
   ```bash
   wrangler pages project create laneval --production-branch main
   wrangler pages deploy . --project-name laneval --branch main
   ```
   Your site is live at `https://laneval.pages.dev`.

### Option B — Git integration (auto-deploy on push)

1. Push this repo to GitHub.
2. In the Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repo. Build settings: **no build command**, output directory **`.`** (root).
4. Deploy. Every push to `main` redeploys automatically.

## Before you launch — customize these

- **Domain:** the canonical URL and sitemap point to `https://laneval.pages.dev/`. If you add a custom domain, update `index.html` (canonical + OG/Twitter URLs), `robots.txt`, and `sitemap.xml`.
- **Contact email:** `hello@laneval.io` appears in the CTA and the early-access form.
- **OG image:** `assets/og-image.svg` is an SVG. For full social-preview support (LinkedIn/Facebook/X render SVGs inconsistently), replace it with a **1200×630 PNG** and update the `og:image` / `twitter:image` tags.
- **Favicon:** `assets/favicon.svg` is already wired up.

## SEO / GEO notes

- **SEO:** semantic HTML, one H1, `<title>` + meta description, canonical, Open Graph + Twitter cards, JSON-LD structured data (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`), `robots.txt`, `sitemap.xml`.
- **GEO:** `llms.txt` at the root, explicit product + category in the first sentence, FAQ section with concise quotable answers, specific numbers/claims LLMs can cite, and `robots.txt` rules that explicitly allow GPTBot, ClaudeBot, PerplexityBot, and Google-Extended.
- **Headless-crawl friendly:** no client-side-rendered content — all copy is in the HTML.
