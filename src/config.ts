export const port = process.env.PORT || 3000;

// Canonical site URL used by metadata, sitemap, robots and structured data.
// Override via NEXT_PUBLIC_SITE_URL on production. Falls back to the Vercel
// preview URL when present, then to local dev.
export const host =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `http://localhost:${port}`);
