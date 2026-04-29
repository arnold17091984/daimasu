import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json'
  }
});

/**
 * Content-Security-Policy for the public site.
 *
 * Next.js 16's RSC pipeline still emits inline `__next_f` hydration scripts
 * without a nonce-tagging hook, so script-src has to allow 'unsafe-inline'
 * until next/script supports nonces site-wide. Tightening to a strict
 * nonce-only policy is tracked as a Phase 5 follow-up.
 *
 * The menu list lazily fetches additional pages from
 * NEXT_PUBLIC_API_BASE_URL via SWR (see OurMenuGrid). Add that origin to
 * connect-src so browser-side pagination doesn't get blocked.
 */
const apiOrigin = (() => {
  try {
    return process.env.NEXT_PUBLIC_API_BASE_URL
      ? new URL(process.env.NEXT_PUBLIC_API_BASE_URL).origin
      : '';
  } catch {
    return '';
  }
})();

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://www.google-analytics.com https://maps.gstatic.com https://*.googleusercontent.com",
  "media-src 'self' blob:",
  `connect-src 'self' https://www.google-analytics.com${apiOrigin ? ' ' + apiOrigin : ''}`,
  'frame-src https://www.google.com https://www.youtube.com',
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests'
].join('; ');

// CSP is production-only. In development, layout.tsx injects helper
// scripts from //unpkg.com (react-grab) which a strict script-src would
// block. The other security headers are safe to emit in dev too — we
// just gate the CSP header itself behind NODE_ENV.
const isProd = process.env.NODE_ENV === 'production';

const securityHeaders = [
  ...(isProd ? [{key: 'Content-Security-Policy', value: csp}] : []),
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {key: 'X-Frame-Options', value: 'DENY'},
  {key: 'X-Content-Type-Options', value: 'nosniff'},
  {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {key: 'X-DNS-Prefetch-Control', value: 'on'}
];

const config: NextConfig = {
  poweredByHeader: false,
  compiler: {
    // Remove console logs only in production
    removeConsole: process.env.NODE_ENV === 'production'
  },
  // Image optimization. Next.js streams AVIF/WebP variants from the original
  // PNGs/JPGs in /public on first request and caches them for one year.
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31_536_000, // 1 year
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    qualities: [50, 60, 70, 75, 80, 85, 90]
  },
  // Aggressive long-term caching for hashed JS/CSS bundles (Nginx still owns
  // image caching for /_next/image and /public so we set those headers there).
  async headers() {
    return [
      {source: '/:path*', headers: securityHeaders},
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/(homepage|aboutus|ourrooms|membership|textures)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400'
          }
        ]
      }
    ];
  }
};

export default withNextIntl(config);
