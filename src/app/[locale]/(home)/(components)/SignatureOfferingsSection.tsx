'use client';

import {buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

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
  // Art of Ingredient defaults
  const artTitle = artOfIngredient?.title || "ART OF\nINGREDIENT";
  const artDescription = artOfIngredient?.description || "Our seasonal selections change with nature's rhythm. Each dish showcases ingredients at their peak, crafted with the essence of Japan's bounty.";
  const artJapanese = artOfIngredient?.japaneseText || "季節の恵み";

  // Sake Section defaults
  const sakeTitle = sakeSection?.title || "THE STORY\nSAKE PERFORMS";
  const sakeDescription = sakeSection?.description || "Every bottle in our collection carries the essence of its brewery, the season, and the craft. Carefully selected, each sake harmonizes with your meal, creating a flowing, unforgettable experience from the first sip to the last";
  const sakeButtonText = sakeSection?.buttonText || "Discover Our Sakes";
  const sakeButtonLink = sakeSection?.buttonLink || "/our-menu";
  const sakeJapanese = sakeSection?.japaneseText || "酒が奏でる物語";

  // Quiet Experience defaults
  const quietTitle = quietExperience?.title || "A QUIET, INTIMATE EXPERIENCE";
  const quietDescription = quietExperience?.description || "Step into a serene space where every detail is designed for calm and connection. Here, the seasons unfold gently on each plate, and every moment is meant to be savored in quiet elegance.";
  const quietButtonText = quietExperience?.buttonText || "Explore Our Rooms";
  const quietButtonLink = quietExperience?.buttonLink || "/our-rooms";
  const quietJapanese1 = quietExperience?.japaneseText1 || "静けさの中で、";
  const quietJapanese2 = quietExperience?.japaneseText2 || "季節を味わう";

  // Split titles into lines
  const artTitleLines = artTitle.split('\n');
  const sakeTitleLines = sakeTitle.split('\n');

  return (
    <section className="relative w-full bg-white">
      {/* Section 1: Art of Ingredient */}
      <div className="relative min-h-[700px] lg:min-h-[923px] overflow-hidden bg-white">
        {/* Gold Pattern Background */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/4">
          <Image
            src="/homepage/gold-pattern-1.svg"
            alt=""
            fill
            className="object-contain object-right"
          />
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[291px] py-16 lg:py-0 flex items-center min-h-[700px] lg:min-h-[923px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full">
            {/* Image */}
            <div className="w-full lg:w-auto">
              <div className="relative w-full lg:w-[630px] aspect-square overflow-hidden">
                <Image
                  src="/homepage/experience-1.png"
                  alt="Art of Ingredient"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex items-start gap-4 lg:gap-6">
              <div className="max-w-[450px] text-center lg:text-right">
                <h3 className="font-poppins font-bold text-3xl md:text-4xl lg:text-[48px] text-black leading-[1.1] mb-4">
                  {artTitleLines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < artTitleLines.length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className="text-black font-poppins text-sm md:text-base lg:text-[16px] leading-[1.3]">
                  {artDescription}
                </p>
              </div>

              {/* Japanese Vertical Text */}
              <div className="hidden lg:flex flex-col gap-2">
                <p className="writing-vertical-rl font-zen-old-mincho text-3xl lg:text-[48px] text-black leading-[1.1] h-[280px]">
                  {artJapanese}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: The Story Sake Performs */}
      <div className="relative min-h-[700px] lg:min-h-[923px] overflow-hidden bg-[#FFEFD3]">
        {/* Gold Pattern Background */}
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-3/4">
          <Image
            src="/homepage/gold-pattern-2.svg"
            alt=""
            fill
            className="object-contain object-left scale-x-[-1]"
          />
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[291px] py-16 lg:py-0 flex items-center min-h-[700px] lg:min-h-[923px]">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16 w-full">
            {/* Image */}
            <div className="w-full lg:w-auto">
              <div className="relative w-full lg:w-[630px] aspect-[630/582] overflow-hidden">
                <Image
                  src="/homepage/experience-2.png"
                  alt="The Story Sake Performs"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex items-start gap-4 lg:gap-6">
              <div className="max-w-[450px] text-center lg:text-right">
                <h3 className="font-poppins font-bold text-3xl md:text-4xl lg:text-[48px] text-black leading-[1.1] mb-4">
                  {sakeTitleLines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < sakeTitleLines.length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className="text-black font-poppins text-sm md:text-base lg:text-[16px] leading-[1.3] mb-6">
                  {sakeDescription}
                </p>
                <Link
                  href={sakeButtonLink}
                  className={cn(
                    buttonVariants({variant: 'daimasu-red', size: 'daimasu-lg'}),
                    'w-full lg:w-auto'
                  )}
                >
                  {sakeButtonText}
                </Link>
              </div>

              {/* Japanese Vertical Text */}
              <div className="hidden lg:flex flex-col">
                <p className="writing-vertical-rl font-zen-old-mincho text-3xl lg:text-[48px] text-black leading-[1.1] h-[310px]">
                  {sakeJapanese}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: A Quiet, Intimate Experience */}
      <div className="relative min-h-[700px] lg:min-h-[923px] overflow-hidden bg-white/22">
        {/* Gold Pattern Background */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/4">
          <Image
            src="/homepage/gold-pattern-1.svg"
            alt=""
            fill
            className="object-contain object-right"
          />
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[291px] py-16 lg:py-0 flex items-center min-h-[700px] lg:min-h-[923px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full">
            {/* Image */}
            <div className="w-full lg:w-auto">
              <div className="relative w-full lg:w-[630px] aspect-[630/578] overflow-hidden">
                <Image
                  src="/homepage/experience-3.png"
                  alt="A Quiet, Intimate Experience"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex items-start gap-4 lg:gap-6">
              <div className="max-w-[450px] text-center lg:text-right">
                <h3 className="font-poppins font-bold text-3xl md:text-4xl lg:text-[48px] text-black leading-[1.1] mb-4">
                  {quietTitle}
                </h3>
                <p className="text-black font-poppins text-sm md:text-base lg:text-[16px] leading-[1.3] mb-6">
                  {quietDescription}
                </p>
                <Link
                  href={quietButtonLink}
                  className={cn(
                    buttonVariants({variant: 'daimasu-red', size: 'daimasu-lg'}),
                    'w-full lg:w-auto'
                  )}
                >
                  {quietButtonText}
                </Link>
              </div>

              {/* Japanese Vertical Text */}
              <div className="hidden lg:flex flex-col gap-1">
                <p className="writing-vertical-rl font-zen-old-mincho text-3xl lg:text-[48px] text-black leading-[1.1] h-[277px]">
                  {quietJapanese1}
                </p>
                <p className="writing-vertical-rl font-zen-old-mincho text-3xl lg:text-[48px] text-black leading-[1.1] h-[318px]">
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
