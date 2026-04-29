'use client';

import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';

type TatlerAwardsContent = {
  awardedBy?: string;
  country?: string;
  year?: string;
  title?: string;
  description?: string;
  japaneseText?: string;
};

type Props = {
  content?: TatlerAwardsContent;
};

export default function TatlerAwardsSection({content}: Props) {
  const t = useTranslations();
  const useCms = useLocale() === 'en';

  const awardedBy = (useCms && content?.awardedBy) || t('tatler_awarded_by');
  const country = (useCms && content?.country) || t('tatler_country');
  const year = (useCms && content?.year) || t('tatler_year');
  const title = (useCms && content?.title) || t('tatler_title');
  const description =
    (useCms && content?.description) || t('tatler_description');
  const japaneseText = content?.japaneseText || t('tatler_japanese');

  return (
    <section className="relative w-full bg-[#FFEFD3] overflow-hidden">
      {/* Background Color + Texture */}
      <div className="absolute inset-0 bg-[#FFEFD3]">
        <Image
          src="/homepage/tatler-texture-2.png"
          alt=""
          fill
          sizes="100vw"
          quality={50}
          className="object-cover mix-blend-multiply opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          {/* Left Content - Award */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <p className="text-black font-shippori font-extrabold text-base lg:text-xl tracking-[0.02em] text-center">
              {awardedBy}
            </p>
            <Image
              src="/homepage/tatler-logo.svg"
              alt="Tatler Dining"
              width={483}
              height={317}
              className="h-[140px] md:h-[180px] lg:h-[220px] w-auto"
            />
            <p className="text-black font-shippori font-extrabold text-xl md:text-2xl lg:text-[28px] tracking-[0.02em] text-center">
              {country}
            </p>
            <p className="text-black font-shippori font-extrabold text-base lg:text-xl tracking-[0.02em] text-center">
              {year}
            </p>
          </div>

          {/* Center - Photo */}
          <div className="relative w-[260px] md:w-[320px] lg:w-[360px] h-[340px] md:h-[420px] lg:h-[460px] flex-shrink-0">
            <Image
              src="/homepage/tatler-center.png"
              alt="Daimasu Award Display"
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 360px, 320px"
            />
          </div>

          {/* Right Content - Text + Vertical JP */}
          <div className="flex items-start justify-end gap-4 lg:gap-6 flex-1 min-w-0">
            <div className="flex-1 min-w-0 max-w-[460px] text-center lg:text-right">
              {/* Main Title */}
              <h2 className="font-shippori font-extrabold text-2xl md:text-3xl lg:text-[40px] text-[#542201] tracking-[0.02em] leading-tight md:leading-tight lg:!leading-[1.35] mb-4 lg:mb-6 lg:break-keep-all whitespace-pre-line">
                {title}
              </h2>

              {/* Description */}
              <p className="text-black font-shippori text-sm md:text-base lg:text-lg leading-[1.7] tracking-[0.02em]">
                {description}
              </p>
            </div>

            {/* Japanese Vertical Text */}
            <div className="hidden md:block writing-vertical-rl font-zen-old-mincho text-2xl md:text-3xl lg:text-[40px] text-black leading-[1.15] flex-shrink-0">
              {japaneseText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
