import type {Metadata} from 'next';
import {Locale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {host} from '@/config';
import {buildAlternates} from '@/lib/seo';
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
  const url = `${host}/${locale}`;
  return {
    title,
    description,
    // Codex review M1 fix: this previously set `alternates` to canonical only,
    // which silently overrode the layout-level languages map and left the home
    // page without ja↔en hreflang tags. buildAlternates emits the correct
    // canonical + languages + x-default triplet.
    alternates: buildAlternates(locale, '/'),
    openGraph: {title, description, url},
    twitter: {card: 'summary_large_image', title, description}
  };
}

// Keystatic returns `string | null` for optional fields, but our component
// props use `string | undefined`. Coerce nulls to undefined for fields whose
// types diverge across the boundary.
function nullToUndefined<T extends Record<string, unknown> | undefined>(
  obj: T,
  keys: readonly string[]
): T {
  if (!obj) return obj;
  const out: Record<string, unknown> = {...obj};
  for (const k of keys) {
    if (out[k] === null) out[k] = undefined;
  }
  return out as T;
}

export default async function IndexPage({params}: Props) {
  const {locale} = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch homepage content from Keystatic
  const content = await getHomepageContent();

  const hero = nullToUndefined(content?.hero, ['buttonLink']) as
    | React.ComponentProps<typeof HeroSection>['content']
    | undefined;
  const grabFood = nullToUndefined(content?.grabFood, ['buttonLink']) as
    | React.ComponentProps<typeof GrabFoodSection>['content']
    | undefined;
  const location = nullToUndefined(content?.location, ['buttonLink']) as
    | React.ComponentProps<typeof LocationSection>['content']
    | undefined;

  return (
    <>
      <HeroSection content={hero} />
      <TatlerAwardsSection content={content?.tatlerAwards} />
      <SignatureOfferingsSection
        artOfIngredient={content?.artOfIngredient}
        sakeSection={content?.sakeSection}
        quietExperience={content?.quietExperience}
      />
      <MembershipSection content={content?.membership} />
      <GrabFoodSection content={grabFood} />
      <LocationSection content={location} />
    </>
  );
}
