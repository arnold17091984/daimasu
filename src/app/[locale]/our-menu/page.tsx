import type {Metadata} from 'next';
import type {Locale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {host} from '@/config';
import {buildAlternates} from '@/lib/seo';
import OurMenuHeader from './(components)/OurMenuHeader';
import MenuView from './(components)/MenuView';
import {buildMenuJsonLd, menu} from './menu-data';

type Props = {
  params: Promise<{locale: Locale}>;
};

const OG_IMAGE = `${host}/our-menu.webp`;

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const title = t('seo_menu_title');
  const description = t('seo_menu_description');
  const url = `${host}/${locale}/our-menu`;
  const baseAlternates = buildAlternates(locale, '/our-menu');
  return {
    title,
    description,
    alternates: {
      ...baseAlternates,
      types: {'application/pdf': `${host}${menu.pdf}`}
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: OG_IMAGE,
          width: 1600,
          height: 900,
          alt: t('seo_site_name')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE]
    }
  };
}

export default async function Page({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const menuJsonLd = buildMenuJsonLd(locale);

  return (
    <div className="flex flex-col">
      {/* Per-page schema.org Menu — Google reads this for menu rich results */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: JSON.stringify(menuJsonLd)}}
      />
      <OurMenuHeader />
      <MenuView />
    </div>
  );
}
