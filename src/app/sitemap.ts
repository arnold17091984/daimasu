import {MetadataRoute} from 'next';
import {Locale} from 'next-intl';
import {host} from '@/config';
import {routing} from '@/i18n/routing';
import {getPathname} from '@/i18n/navigation';

// Routes that should appear in the sitemap. Order roughly reflects how a
// search engine should prioritise them (home first, then key landing pages).
const ROUTES = [
  {href: '/', priority: 1, changeFrequency: 'weekly' as const},
  {href: '/our-menu', priority: 0.9, changeFrequency: 'weekly' as const},
  {href: '/our-rooms', priority: 0.9, changeFrequency: 'monthly' as const},
  {href: '/about-us', priority: 0.7, changeFrequency: 'monthly' as const},
  {href: '/membership', priority: 0.7, changeFrequency: 'monthly' as const}
];

type Href = Parameters<typeof getPathname>[0]['href'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const localised = ROUTES.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: getUrl(route.href as Href, locale),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((cur) => [cur, getUrl(route.href as Href, cur)])
        )
      }
    }))
  );
  // Surface the printed PDF so Google can crawl/refresh it. The PDF is
  // locale-agnostic (one designed artefact), so list it once.
  const menuPdf = {
    url: `${host}/menu/daimasu-grand-menu.pdf`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6
  };
  return [...localised, menuPdf];
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({locale, href});
  return host + pathname;
}
