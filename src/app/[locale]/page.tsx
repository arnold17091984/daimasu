import {Locale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
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
