'use client';

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
  const awardedBy = content?.awardedBy || "Awarded by";
  const country = content?.country || "Philippines";
  const year = content?.year || "2024";
  const title = content?.title || "A Masterclass in Japanese Gastronomy";
  const description = content?.description || "Luxury and comfort meet in every detail, creating a refined and immersive dining experience.";
  const japaneseText = content?.japaneseText || "日本料理の極み";

  return (
    <section className="relative w-full bg-[#FFEFD3] overflow-hidden">
      {/* Background Color + Texture */}
      <div className="absolute inset-0 bg-[#FFEFD3]">
        <Image
          src="/homepage/tatler-texture-2.png"
          alt=""
          fill
          className="object-cover mix-blend-multiply opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[155px] py-16 lg:py-[116px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
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
              className="h-[150px] md:h-[200px] lg:h-[280px] w-auto"
            />
            <p className="text-black font-shippori font-extrabold text-xl md:text-2xl lg:text-[33px] tracking-[0.02em] text-center uppercase">
              {country}
            </p>
            <p className="text-black font-shippori font-extrabold text-base lg:text-xl tracking-[0.02em] text-center">
              {year}
            </p>
          </div>

          {/* Center - Photo */}
          <div className="relative w-[280px] md:w-[350px] lg:w-[439px] h-[360px] md:h-[450px] lg:h-[560px] flex-shrink-0">
            <Image
              src="/homepage/tatler-center.png"
              alt="Daimasu Award Display"
              fill
              className="object-contain"
            />
          </div>

          {/* Right Content - Text */}
          <div className="flex items-start gap-4 lg:gap-6">
            <div className="max-w-[320px] lg:max-w-[420px] text-center lg:text-right">
              {/* Main Title */}
              <h2 className="font-poppins font-bold text-xl md:text-3xl lg:text-[48px] text-[#542201] uppercase tracking-[0.02em] leading-[1.23] mb-4 lg:mb-6">
                {title}
              </h2>

              {/* Description */}
              <p className="text-black font-poppins text-sm md:text-base lg:text-xl leading-[1.44] tracking-[0.02em]">
                {description}
              </p>
            </div>

            {/* Japanese Vertical Text */}
            <div className="hidden md:block writing-vertical-rl font-zen-old-mincho text-2xl md:text-3xl lg:text-[48px] text-black leading-[1.1] h-[200px] md:h-[280px] lg:h-[375px]">
              {japaneseText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
