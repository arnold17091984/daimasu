export const port = process.env.PORT || 3000;

// Canonical site URL used by metadata, sitemap, robots and structured data.
// Resolution order:
// 1. NEXT_PUBLIC_SITE_URL (preferred — set in env)
// 2. Vercel preview URL (only on Vercel-hosted previews)
// 3. Production hardcoded fallback (so a missing env var on the VPS does not
//    leak `localhost:3000` into <link rel="canonical"> tags — that was a
//    real production bug surfaced in the luxury upgrade audit)
// 4. Local dev fallback
function resolveHost(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (explicit) return explicit;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.NODE_ENV === 'production') return 'https://daimasu.com.ph';
  return `http://localhost:${port}`;
}

export const host = resolveHost();
