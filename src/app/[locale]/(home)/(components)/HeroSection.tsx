'use client';

import {buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type HeroContent = {
  subtitle?: string;
  tagline?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  japaneseText1?: string;
  japaneseText2?: string;
  japaneseText3?: string;
  japaneseText4?: string;
};

type Props = {
  content?: HeroContent;
};

export default function HeroSection({content}: Props) {
  const t = useTranslations();
  const locale = useLocale();
  // Keystatic content is single-locale (English). Prefer translations for non-English locales
  // so the JA route doesn't display English copy authored in the CMS.
  const useCms = locale === 'en';

  const subtitle =
    (useCms && content?.subtitle) ||
    `${t('hero_subtitle_line_1')}\n${t('hero_subtitle_line_2')}`;
  const tagline = (useCms && content?.tagline) || t('hero_tagline');
  const description = (useCms && content?.description) || t('hero_description');
  const buttonText = (useCms && content?.buttonText) || t('book_a_table');
  const buttonLink = content?.buttonLink || 'https://m.me/DaimasuMakati';
  const japaneseText1 = content?.japaneseText1 || t('hero_japanese_1');
  const japaneseText2 = content?.japaneseText2 || t('hero_japanese_2');
  const japaneseText3 = content?.japaneseText3 || t('hero_japanese_3');
  const japaneseText4 = content?.japaneseText4 || t('hero_japanese_4');

  // Split subtitle into lines
  const subtitleLines = subtitle.split('\n');

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Background image — routed through next/image so it's served as
          AVIF/WebP and resized for each viewport. */}
      <Image
        src="/homepage/hero-bg.png"
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-bottom"
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex items-end pb-16 md:pb-24 lg:pb-32">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[139px]">
          <div className="flex items-end justify-between gap-8">
            {/* Left Content - English Text */}
            <div className="max-w-[763px]">
              {/* Subtitle Question */}
              <h2 className="font-playfair font-bold text-2xl md:text-4xl lg:text-[48px] md:leading-[3rem] text-white tracking-[0.02em] mb-4">
                {subtitleLines.map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < subtitleLines.length - 1 && <br />}
                  </span>
                ))}
              </h2>

              {/* Main Tagline */}
              <p className="font-poppins font-medium text-lg md:text-xl lg:text-2xl text-white tracking-[0.01em] mb-6">
                {tagline}
              </p>

              <div
                aria-hidden="true"
                className="mt-8 mb-6 w-[64px] h-px bg-gold-500 mx-auto"
              />

              {/* Description */}
              <p className="font-poppins font-normal text-sm md:text-base text-white leading-[1.44] tracking-[0.02em] max-w-[458px] mb-8">
                {description}
              </p>

              {/* CTA Button */}
              <Link
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({variant: 'daimasu-red', size: 'daimasu-xl'}),
                  'text-xl md:text-2xl lg:text-[32px] tracking-[0.02em]'
                )}
              >
                {buttonText}
              </Link>

              {/* Red Accent Line */}
            </div>

            {/* Right Content - Japanese Vertical Text */}
            <div className="hidden lg:flex items-end gap-4 h-[611px]">
              {/* Smaller Japanese Text - Left */}
              <div className="flex flex-col gap-2">
                <p
                  className="font-zen-old-mincho text-white text-[32px] leading-[1.1] tracking-[0.01em] writing-vertical-rl"
                  style={{height: '295px'}}
                >
                  {japaneseText1}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p
                  className="font-zen-old-mincho text-white text-[32px] leading-[1.1] tracking-[0.01em] writing-vertical-rl"
                  style={{height: '367px'}}
                >
                  {japaneseText2}
                </p>
              </div>

              {/* Larger Japanese Text - Right */}
              <div className="flex flex-col gap-2">
                <p
                  className="font-zen-old-mincho text-white text-[64px] leading-[1.1] tracking-[0.01em] writing-vertical-rl"
                  style={{height: '363px'}}
                >
                  {japaneseText3}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p
                  className="font-zen-old-mincho text-white text-[64px] leading-[1.1] tracking-[0.01em] writing-vertical-rl"
                  style={{height: '498px'}}
                >
                  {japaneseText4}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
