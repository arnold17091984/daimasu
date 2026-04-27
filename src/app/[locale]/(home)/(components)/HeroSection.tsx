'use client';

import {buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';
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
  const subtitle = content?.subtitle || "Struggling to find truly\nAuthentic Japanese dining?";
  const tagline = content?.tagline || "Japan, served at the table.";
  const description = content?.description || "Premium seafood, wagyu, and artisanal ingredients are flown from Japan and prepared with precision and respect for tradition, creating an unmistakably Japanese dining experience.";
  const buttonText = content?.buttonText || "Book a Table";
  const buttonLink = content?.buttonLink || "https://m.me/DaimasuMakati";
  const japaneseText1 = content?.japaneseText1 || "本物の日本の味。";
  const japaneseText2 = content?.japaneseText2 || "フィリピンで味わう、";
  const japaneseText3 = content?.japaneseText3 || "日本の味。";
  const japaneseText4 = content?.japaneseText4 || "食卓に広がる、";

  // Split subtitle into lines
  const subtitleLines = subtitle.split('\n');

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-bottom bg-cover"
        style={{backgroundImage: "url('/homepage/hero-bg.png')"}}
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

              <div className="mt-8 mb-6 w-[101px] h-[6px] bg-[#FF4040] mx-auto" />

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
