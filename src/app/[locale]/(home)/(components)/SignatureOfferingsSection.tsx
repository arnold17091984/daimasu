'use client';

import {buttonVariants} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';
import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';

type ArtOfIngredientContent = {
  title?: string;
  description?: string;
  japaneseText?: string;
};

type SakeSectionContent = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  japaneseText?: string;
};

type QuietExperienceContent = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  japaneseText1?: string;
  japaneseText2?: string;
};

type Props = {
  artOfIngredient?: ArtOfIngredientContent;
  sakeSection?: SakeSectionContent;
  quietExperience?: QuietExperienceContent;
};

export default function SignatureOfferingsSection({
  artOfIngredient,
  sakeSection,
  quietExperience
}: Props) {
  const t = useTranslations();
  const useCms = useLocale() === 'en';

  // Art of Ingredient defaults
  const artTitle =
    (useCms && artOfIngredient?.title) ||
    `${t('art_title_line_1')}\n${t('art_title_line_2')}`;
  const artDescription =
    (useCms && artOfIngredient?.description) || t('art_description');
  const artJapanese = artOfIngredient?.japaneseText || t('art_japanese');

  // Sake Section defaults
  const sakeTitle =
    (useCms && sakeSection?.title) ||
    `${t('sake_title_line_1')}\n${t('sake_title_line_2')}`;
  const sakeDescription =
    (useCms && sakeSection?.description) || t('sake_description');
  const sakeButtonText =
    (useCms && sakeSection?.buttonText) || t('sake_button');
  const sakeButtonLink = sakeSection?.buttonLink || '/our-menu';
  const sakeJapanese = sakeSection?.japaneseText || t('sake_japanese');

  // Quiet Experience defaults
  const quietTitle = (useCms && quietExperience?.title) || t('quiet_title');
  const quietDescription =
    (useCms && quietExperience?.description) || t('quiet_description');
  const quietButtonText =
    (useCms && quietExperience?.buttonText) || t('quiet_button');
  const quietButtonLink = quietExperience?.buttonLink || '/our-rooms';
  const quietJapanese1 =
    quietExperience?.japaneseText1 || t('quiet_japanese_1');
  const quietJapanese2 =
    quietExperience?.japaneseText2 || t('quiet_japanese_2');

  // Split titles into lines
  const artTitleLines = artTitle.split('\n');
  const sakeTitleLines = sakeTitle.split('\n');

  return (
    <section className="relative w-full bg-white">
      {/* Section 1: Art of Ingredient */}
      <div className="relative min-h-[700px] lg:min-h-[800px] overflow-hidden bg-white">
        {/* Gold Pattern Background */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/4">
          <Image
            src="/homepage/gold-pattern-1.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-contain object-right"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-24 flex items-center min-h-[700px] lg:min-h-[800px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full">
            {/* Image */}
            <div className="w-full lg:w-auto">
              <div className="relative w-full lg:w-[520px] xl:w-[600px] aspect-square overflow-hidden">
                <Image
                  src="/homepage/experience-1.png"
                  alt="Art of Ingredient"
                  fill
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 520px, 100vw"
                  quality={75}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex items-start gap-4 lg:gap-6">
              <div className="max-w-[450px] text-center lg:text-right">
                <h3 className="font-shippori font-bold text-3xl md:text-4xl lg:text-[44px] text-black leading-tight md:leading-tight lg:!leading-[1.3] mb-4 lg:break-keep-all">
                  {artTitleLines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < artTitleLines.length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className="text-black font-shippori text-sm md:text-base lg:text-[16px] leading-[1.7]">
                  {artDescription}
                </p>
              </div>

              {/* Japanese Vertical Text */}
              <div className="hidden lg:flex flex-col gap-2">
                <p className="writing-vertical-rl font-zen-old-mincho text-3xl lg:text-[40px] text-black leading-[1.15] h-[280px]">
                  {artJapanese}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: The Story Sake Performs */}
      <div className="relative min-h-[700px] lg:min-h-[800px] overflow-hidden bg-[#FFEFD3]">
        {/* Gold Pattern Background */}
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-3/4">
          <Image
            src="/homepage/gold-pattern-2.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-contain object-left scale-x-[-1]"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-24 flex items-center min-h-[700px] lg:min-h-[800px]">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16 w-full">
            {/* Image */}
            <div className="w-full lg:w-auto">
              <div className="relative w-full lg:w-[520px] xl:w-[600px] aspect-[630/582] overflow-hidden">
                <Image
                  src="/homepage/experience-2.png"
                  alt="The Story Sake Performs"
                  fill
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 520px, 100vw"
                  quality={75}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex items-start gap-4 lg:gap-6">
              <div className="max-w-[450px] text-center lg:text-right">
                <h3 className="font-shippori font-bold text-3xl md:text-4xl lg:text-[44px] text-black leading-tight md:leading-tight lg:!leading-[1.3] mb-4 lg:break-keep-all">
                  {sakeTitleLines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < sakeTitleLines.length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className="text-black font-shippori text-sm md:text-base lg:text-[16px] leading-[1.7] mb-6">
                  {sakeDescription}
                </p>
                <Link
                  href={sakeButtonLink}
                  className={cn(
                    buttonVariants({
                      variant: 'daimasu-red',
                      size: 'daimasu-lg'
                    }),
                    'w-full lg:w-auto'
                  )}
                >
                  {sakeButtonText}
                </Link>
              </div>

              {/* Japanese Vertical Text */}
              <div className="hidden lg:flex flex-col">
                <p className="writing-vertical-rl font-zen-old-mincho text-3xl lg:text-[40px] text-black leading-[1.15] h-[310px]">
                  {sakeJapanese}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: A Quiet, Intimate Experience */}
      <div className="relative min-h-[700px] lg:min-h-[800px] overflow-hidden bg-white/22">
        {/* Gold Pattern Background */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/4">
          <Image
            src="/homepage/gold-pattern-1.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-contain object-right"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-24 flex items-center min-h-[700px] lg:min-h-[800px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full">
            {/* Image */}
            <div className="w-full lg:w-auto">
              <div className="relative w-full lg:w-[520px] xl:w-[600px] aspect-[630/578] overflow-hidden">
                <Image
                  src="/homepage/experience-3.png"
                  alt="A Quiet, Intimate Experience"
                  fill
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 520px, 100vw"
                  quality={75}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex items-start gap-4 lg:gap-6">
              <div className="max-w-[450px] text-center lg:text-right">
                <h3 className="font-shippori font-bold text-3xl md:text-4xl lg:text-[44px] text-black leading-tight md:leading-tight lg:!leading-[1.3] mb-4 lg:break-keep-all">
                  {quietTitle}
                </h3>
                <p className="text-black font-shippori text-sm md:text-base lg:text-[16px] leading-[1.7] mb-6">
                  {quietDescription}
                </p>
                <Link
                  href={quietButtonLink}
                  className={cn(
                    buttonVariants({
                      variant: 'daimasu-red',
                      size: 'daimasu-lg'
                    }),
                    'w-full lg:w-auto'
                  )}
                >
                  {quietButtonText}
                </Link>
              </div>

              {/* Japanese Vertical Text */}
              <div className="hidden lg:flex flex-col gap-1">
                <p className="writing-vertical-rl font-zen-old-mincho text-3xl lg:text-[40px] text-black leading-[1.15] h-[277px]">
                  {quietJapanese1}
                </p>
                <p className="writing-vertical-rl font-zen-old-mincho text-3xl lg:text-[40px] text-black leading-[1.15] h-[318px]">
                  {quietJapanese2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
