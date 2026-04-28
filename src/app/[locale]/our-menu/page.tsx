import {Suspense} from 'react';
import type {Metadata} from 'next';
import type {Locale} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import OurMenu from './(components)/OurMenu';
import OurMenuHeader from './(components)/OurMenuHeader';
import type {ItemSet, ItemType} from '@/app/types';

export const dynamic = 'force-dynamic';

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

type MenuApiResult = {
  sets: ItemSet[];
  types: ItemType[];
};

async function fetchMenuData(): Promise<MenuApiResult> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const tenant = process.env.NEXT_PUBLIC_TENANT_NAME;

  if (!apiBase || !tenant) {
    return {sets: [], types: []};
  }

  const root = `${apiBase}/api/${tenant}`;

  try {
    const [setsRes, typesRes] = await Promise.all([
      fetch(`${root}/sets?is_active=1`, {cache: 'no-store'}),
      fetch(`${root}/types?is_active=1`, {cache: 'no-store'})
    ]);

    if (!setsRes.ok || !typesRes.ok) {
      return {sets: [], types: []};
    }

    const [setsData, typesData] = await Promise.all([
      setsRes.json(),
      typesRes.json()
    ]);

    return {
      sets: (setsData?.data as ItemSet[]) ?? [],
      types: (typesData?.data as ItemType[]) ?? []
    };
  } catch {
    return {sets: [], types: []};
  }
}

async function page() {
  const {sets, types} = await fetchMenuData();

  return (
    <Suspense>
      <div className="flex flex-col">
        <OurMenuHeader />
        <OurMenu sets={sets} types={types} />
      </div>
    </Suspense>
  );
}

export default page;
