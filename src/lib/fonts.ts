import localFont from 'next/font/local';
import {Cormorant_Garamond, Inter} from 'next/font/google';

// Phase 1B luxury type system. The site reduces from six families to three:
//   1. Cormorant Garamond — Latin display (kaiseki gravitas instead of
//      Playfair's fashion-magazine bounce)
//   2. Inter             — humanist sans body (replaces Poppins's
//      geometric-SaaS roundness)
//   3. Shippori Mincho B1 — single Japanese serif used for both vertical
//      and horizontal CJK contexts (eliminates Zen Old Mincho)
//
// Existing components use legacy class names (font-playfair, font-poppins,
// font-mplus, font-zen-old-mincho). Those classes are remapped in
// styles.css to point at these new variables, so no component edits are
// required for the visual swap.

const shippori = localFont({
  src: [
    {
      path: './fonts/shippori/ShipporiMinchoB1-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/shippori/ShipporiMinchoB1-SemiBold.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/shippori/ShipporiMinchoB1-Medium.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/shippori/ShipporiMinchoB1-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  style: 'normal',
  variable: '--font-shippori',
  display: 'swap',
  fallback: ['serif']
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'serif']
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  fallback: [
    'system-ui',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ]
});

export {shippori, cormorant, inter};
