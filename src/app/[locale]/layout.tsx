import { notFound } from 'next/navigation';
import { Locale, hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { routing } from '@/i18n/routing';
import './styles.css';
import { mplus, poppins, shippori } from '@/lib/fonts';
import NextTopLoader from 'nextjs-toploader';
import ClientProviders from '@/components/ClientProviders';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getFooterContent } from '@/lib/keystatic';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// export async function generateMetadata(props: Omit<Props, 'children'>) {
//   const {locale} = await props.params;

//   // const t = await getTranslations({locale});

//   return {
//     title: 'Daimasu'
//   };
// }

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch footer content
  const footerContent = await getFooterContent();

  return (
    <html className="h-full" lang={locale}>
      <body
        className={clsx(
          // inter.className,
          shippori.variable,
          mplus.variable,
          poppins.variable,
          'flex h-full flex-col'
        )}
      >
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/@react-grab/claude-code/dist/client.global.js"
            strategy="lazyOnload"
          />
        )}
        <NextTopLoader color="#FFFFFF" height={1} />
        <ClientProviders>
          <NextIntlClientProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer content={footerContent} />
          </NextIntlClientProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
