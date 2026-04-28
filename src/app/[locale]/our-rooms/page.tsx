import type {Metadata} from 'next';
import type {Locale} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import {getOurRoomsContent} from '@/lib/keystatic';
import OurRooms from './(components)/OurRooms';

type Props = {
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const title = t('seo_rooms_title');
  const description = t('seo_rooms_description');
  return {
    title,
    description,
    alternates: {canonical: `/${locale}/our-rooms`},
    openGraph: {title, description, url: `/${locale}/our-rooms`},
    twitter: {card: 'summary_large_image', title, description}
  };
}

export default async function OurRoomsPage() {
  const content = await getOurRoomsContent();

  return <OurRooms content={content} />;
}
