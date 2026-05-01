import {notFound} from 'next/navigation';
import {Locale, hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import {clsx} from 'clsx';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import {host} from '@/config';
import {buildAlternates} from '@/lib/seo';
import './styles.css';
import {cormorant, inter, shippori} from '@/lib/fonts';
import NextTopLoader from 'nextjs-toploader';
import ClientProviders from '@/components/ClientProviders';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyReservationBar from '@/components/StickyReservationBar';
import {getFooterContent} from '@/lib/keystatic';

// Next.js's auto-generated LayoutProps types `params` as `{ locale: string }`
// (not narrowed to our `Locale` union). Accept the wider type and narrow at
// runtime via `hasLocale`.
type Props = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_PH',
  ja: 'ja_JP'
};

export async function generateMetadata(
  props: Omit<Props, 'children'>
): Promise<Metadata> {
  const {locale: rawLocale} = await props.params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  const t = await getTranslations({locale});

  const title = t('seo_default_title');
  const description = t('seo_default_description');
  const siteName = t('seo_site_name');
  const localePath = `/${locale}`;
  const ogImage = `${host}/homepage/hero-bg.png`;

  return {
    metadataBase: new URL(host),
    title: {
      default: title,
      template: t('seo_title_template')
    },
    description,
    keywords: t('seo_keywords'),
    applicationName: siteName,
    authors: [{name: siteName, url: host}],
    creator: siteName,
    publisher: siteName,
    alternates: buildAlternates(locale, '/'),
    openGraph: {
      type: 'website',
      url: `${host}${localePath}`,
      siteName,
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteName
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    },
    icons: {
      icon: '/homepage/daimasu-logo.svg',
      apple: '/homepage/daimasu-logo.svg'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1
      }
    },
    other: {
      'geo.region': 'PH-00',
      'geo.placename': 'Makati'
    }
  };
}

export default async function LocaleLayout({children, params}: Props) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch footer content
  const footerContent = await getFooterContent();

  // Localised content for Restaurant structured data + meta links
  const t = await getTranslations({locale});
  const restaurantJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${host}/#restaurant`,
    name: t('seo_site_name'),
    alternateName: 'Daimasu',
    url: `${host}/${locale}`,
    image: [
      `${host}/homepage/hero-bg.png`,
      `${host}/homepage/tatler-center.png`
    ],
    logo: `${host}/homepage/daimasu-logo.svg`,
    description: t('seo_default_description'),
    servesCuisine: ['Japanese', 'Sushi', 'Omakase', 'Kaiseki'],
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ground Floor Allegro Center, Chino Roces Ave',
      addressLocality: 'Makati',
      addressRegion: 'Metro Manila',
      postalCode: '1232',
      addressCountry: 'PH'
    },
    telephone: '+63-917-109-6032',
    email: 'daimasumakati@gmail.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '11:00',
        closes: '24:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/DaimasuMakati',
      'https://www.instagram.com/daimasu_makati/'
    ],
    award: 'Tatler Dining Philippines 2024',
    acceptsReservations: 'True',
    inLanguage: routing.locales,
    hasMenu: {
      '@type': 'Menu',
      '@id': `${host}/${locale}/our-menu#menu`,
      url: `${host}/${locale}/our-menu`
    }
  };

  return (
    <html className="h-full" lang={locale}>
      <head>
        {/* Per-page hreflang is emitted by each route's
            metadata.alternates.languages (via @/lib/seo buildAlternates).
            Pre-this-fix the layout hardcoded homepage hreflangs into every
            page's <head>, telling Google "the JA equivalent of /en/our-menu
            is /ja" — wrong. Don't reintroduce static hreflang here. */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{__html: JSON.stringify(restaurantJsonLd)}}
        />
      </head>
      <body
        className={clsx(
          shippori.variable,
          cormorant.variable,
          inter.variable,
          'flex h-full flex-col'
        )}
      >
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/@react-grab/claude-code/dist/client.global.js"
            strategy="lazyOnload"
          />
        )}
        <NextTopLoader color="#FFFFFF" height={1} />
        <ClientProviders>
          <NextIntlClientProvider>
            <Header />
            {/* StickyReservationBar is fixed at the bottom on mobile, so
                pad the wrapper containing both <main> AND <Footer> so the
                bar can't occlude either. md+ hides the bar entirely. */}
            <div className="flex flex-1 flex-col pb-14 md:pb-0">
              <main className="flex-1">{children}</main>
              <Footer content={footerContent} />
            </div>
            <StickyReservationBar />
          </NextIntlClientProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
