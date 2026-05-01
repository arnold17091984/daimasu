import type {Metadata} from 'next';
import type {Locale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import OurMenuHeader from './(components)/OurMenuHeader';
import MenuView from './(components)/MenuView';

type Props = {
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const title = t('seo_menu_title');
  const description = t('seo_menu_description');
  return {
    title,
    description,
    alternates: {canonical: `/${locale}/our-menu`},
    openGraph: {title, description, url: `/${locale}/our-menu`},
    twitter: {card: 'summary_large_image', title, description}
  };
}

export default async function Page({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      <OurMenuHeader />
      <MenuView />
    </div>
  );
}
