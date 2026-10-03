import { Hono } from "hono";

type Bindings = {
  ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

// Security headers (migrated from the old Pages _headers file)
const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

// Redirect www.laneval.com → laneval.com (apex is canonical)
app.use("*", async (c, next) => {
  const url = new URL(c.req.url);
  if (url.hostname === "www.laneval.com") {
    url.hostname = "laneval.com";
    return c.redirect(url.toString(), 301);
  }
  await next();
});

// Apply security headers to API responses (built via c.json()/c.text()/…)
app.use("*", async (c, next) => {
  await next();
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    c.header(name, value);
  }
});

// API routes
app.get("/api/health", (c) =>
  c.json({ ok: true, service: "laneval", time: new Date().toISOString() }),
);

// Early-access form endpoint (scaffold only — the page still uses mailto for now).
// TODO: persist the submission to D1/KV or forward it to an email service.
app.post("/api/early-access", async (c) => {
  const body = await c.req.json().catch(() => null);
  console.log("early-access request:", body);
  return c.json({ ok: true, message: "Thanks — we will be in touch." }, 202);
});

// Static assets (served from ./public via the ASSETS binding)
app.all("*", async (c) => {
  const res = await c.env.ASSETS.fetch(c.req.raw);
  const path = new URL(c.req.url).pathname;

  // ASSETS returns a response with immutable headers, so build a mutable copy
  // before adding headers.
  const headers = new Headers(res.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }

  // Cache headers (migrated from the old Pages _headers file)
  if (path.startsWith("/assets/")) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (path === "/" || path === "/index.html") {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
});

export default app;
