import type {Metadata} from 'next';
import type {Locale} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import {getAboutUsContent} from '@/lib/keystatic';
import AboutUs from './(components)/AboutUs';

type Props = {
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const title = t('seo_about_title');
  const description = t('seo_about_description');
  return {
    title,
    description,
    alternates: {canonical: `/${locale}/about-us`},
    openGraph: {title, description, url: `/${locale}/about-us`},
    twitter: {card: 'summary_large_image', title, description}
  };
}

export default async function AboutUsPage() {
  const content = await getAboutUsContent();

  // Keystatic returns `string | null` for optional fields; AboutUs expects
  // `string | undefined`. Normalise null -> undefined to satisfy strict types.
  const normalised = content
    ? {
        ...content,
        hero: content.hero
          ? {
              ...content.hero,
              buttonLink: content.hero.buttonLink ?? undefined
            }
          : undefined
      }
    : null;

  return <AboutUs content={normalised} />;
}
