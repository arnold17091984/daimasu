import {MetadataRoute} from 'next';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({locale: routing.defaultLocale});

  return {
    name: t('seo_site_name'),
    short_name: 'Daimasu',
    description: t('seo_default_description'),
    start_url: '/',
    display: 'standalone',
    background_color: '#101E33',
    theme_color: '#101E33',
    orientation: 'portrait',
    icons: [
      {
        src: '/homepage/daimasu-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any'
      }
    ]
  };
}
