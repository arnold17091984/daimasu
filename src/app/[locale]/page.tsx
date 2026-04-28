import type {Metadata} from 'next';
import {Locale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {getHomepageContent} from '@/lib/keystatic';
import HeroSection from './(home)/(components)/HeroSection';
import TatlerAwardsSection from './(home)/(components)/TatlerAwardsSection';
import SignatureOfferingsSection from './(home)/(components)/SignatureOfferingsSection';
import MembershipSection from './(home)/(components)/MembershipSection';
import GrabFoodSection from './(home)/(components)/GrabFoodSection';
import LocationSection from './(home)/(components)/LocationSection';

type Props = {
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const title = t('seo_home_title');
  const description = t('seo_home_description');
  return {
    title,
    description,
    alternates: {canonical: `/${locale}`},
    openGraph: {title, description, url: `/${locale}`},
    twitter: {card: 'summary_large_image', title, description}
  };
}

export default async function IndexPage({params}: Props) {
  const {locale} = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch homepage content from Keystatic
  const content = await getHomepageContent();

  return (
    <>
      <HeroSection content={content?.hero} />
      <TatlerAwardsSection content={content?.tatlerAwards} />
      <SignatureOfferingsSection
        artOfIngredient={content?.artOfIngredient}
        sakeSection={content?.sakeSection}
        quietExperience={content?.quietExperience}
      />
      <MembershipSection content={content?.membership} />
      <GrabFoodSection content={content?.grabFood} />
      <LocationSection content={content?.location} />
    </>
  );
}
