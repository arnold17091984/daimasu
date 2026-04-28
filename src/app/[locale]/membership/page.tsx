import type {Metadata} from 'next';
import type {Locale} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import {getMembershipContent} from '@/lib/keystatic';
import Membership from './(components)/Membership';

type Props = {
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const title = t('seo_membership_title');
  const description = t('seo_membership_description');
  return {
    title,
    description,
    alternates: {canonical: `/${locale}/membership`},
    openGraph: {title, description, url: `/${locale}/membership`},
    twitter: {card: 'summary_large_image', title, description}
  };
}

export default async function MembershipPage() {
  const content = await getMembershipContent();

  return <Membership content={content} />;
}
