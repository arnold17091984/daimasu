import type {Locale} from 'next-intl';
import {host} from '@/config';
import {routing} from '@/i18n/routing';

/**
 * Build per-page metadata.alternates so Next.js emits the correct
 * <link rel="canonical"> and <link rel="alternate" hrefLang> tags.
 * Without this, child pages reuse the layout's homepage hreflangs
 * and tell Google "the JA equivalent of /en/our-menu is /ja" — wrong.
 */
export function buildAlternates(locale: Locale, subpath: string) {
  const path = subpath.startsWith('/') ? subpath : `/${subpath}`;
  return {
    canonical: `${host}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(
        routing.locales.map((loc) => [loc, `${host}/${loc}${path}`])
      ),
      'x-default': `${host}/${routing.defaultLocale}${path}`
    }
  };
}
