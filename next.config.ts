import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json'
  }
});

const config: NextConfig = {
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
