'use client';

import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import {cn} from '@/lib/utils';
import {buttonVariants} from '@/components/ui/button';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type AboutUsContent = {
  hero?: {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    japaneseText1?: string;
    japaneseText2?: string;
    japaneseText3?: string;
    japaneseText4?: string;
  };
  aboutUsTitle?: string;
  atDaimasu?: {
    title?: string;
    description?: string;
  };
  craftedWithPrecision?: {
    title?: string;
    description?: string;
  };
  moreThanAMeal?: {
    title?: string;
    description?: string;
    japaneseText1?: string;
    japaneseText2?: string;
    japaneseText3?: string;
    japaneseText4?: string;
  };
  meetOurStaff?: {
    title?: string;
  };
};

type Props = {
  content?: AboutUsContent | null;
};

const staffMembers = [
  {id: 1, image: '/aboutus/staff-1.png', name: 'Staff 1'},
  {id: 2, image: '/aboutus/staff-2.png', name: 'Staff 2'},
  {id: 3, image: '/aboutus/staff-3.png', name: 'Staff 3'},
  {id: 4, image: '/aboutus/staff-4.png', name: 'Staff 4'}
];

export default function AboutUs({content}: Props) {
  // Hero section defaults
  const heroTitle = content?.hero?.title || 'The Art of Omotenashi';
  const heroSubtitle = content?.hero?.subtitle || 'Refined Cuisine, Attentive Service, Thoughtfully Tailored for You';
  const heroDescription = content?.hero?.description || 'Guided by the Japanese spirit of omotenashi, we strive to understand our guests and deliver heartfelt cuisine and service that leave them genuinely satisfied.';
  const heroButtonText = content?.hero?.buttonText || 'Book a table';
  const heroButtonLink = content?.hero?.buttonLink || 'https://m.me/daimasujapaneserestaurant';
  const heroJapanese1 = content?.hero?.japaneseText1 || '細やかな心配り、';
  const heroJapanese2 = content?.hero?.japaneseText2 || '上質なひととき';
  const heroJapanese3 = content?.hero?.japaneseText3 || '細部まで行き届く心配り';
  const heroJapanese4 = content?.hero?.japaneseText4 || '上質なおもてなし';

  // About Us section defaults
  const aboutUsTitle = content?.aboutUsTitle || 'About Us';
  const atDaimasuTitle = content?.atDaimasu?.title || 'At Daimasu, we bring the heart of Japan to your table.';
  const atDaimasuDescription = content?.atDaimasu?.description || 'Our name, meaning "Great Celebration," reflects our passion for crafting unforgettable dining experiences rooted in authentic Japanese culinary tradition. Whether you\'re a seasoned sushi lover, a ramen enthusiast, or a curious first-time guest, Daimasu is your home for genuine, handcrafted Japanese cuisine.';

  // Crafted with Precision defaults
  const craftedTitle = content?.craftedWithPrecision?.title || 'Crafted with Precision';
  const craftedDescription = content?.craftedWithPrecision?.description || 'Every dish at Daimasu is thoughtfully prepared using the freshest ingredients, traditional techniques, and a deep respect for flavor. From delicately sliced sashimi and perfectly grilled yakitori to comforting bowls of ramen and artfully arranged bento sets, our menu celebrates the diversity and elegance of Japanese food.';

  // More Than a Meal defaults
  const moreThanMealTitle = content?.moreThanAMeal?.title || 'More Than a Meal';
  const moreThanMealDescription = content?.moreThanAMeal?.description || 'At Daimasu, we believe in omotenashi —the Japanese spirit of heartfelt service. Whether you\'re here for a quiet dinner, a special celebration, or a quick lunch escape, we strive to make each visit feel personal and memorable.';
  const moreThanMealJapanese1 = content?.moreThanAMeal?.japaneseText1 || '静かな夕食や特別な祝いごと、気軽なランチでも、';
  const moreThanMealJapanese2 = content?.moreThanAMeal?.japaneseText2 || '一人ひとりに寄り添い、心に残るひとときを。';
  const moreThanMealJapanese3 = content?.moreThanAMeal?.japaneseText3 || '大松では、日本の心「おもてなし」を大切に。';
  const moreThanMealJapanese4 = content?.moreThanAMeal?.japaneseText4 || '食を超えて';

  // Meet Our Staff defaults
  const meetOurStaffTitle = content?.meetOurStaff?.title || 'Meet Our Staff';

  return (
    <section className="w-full">
      {/* Hero Section - The Art of Omotenashi */}
      <div className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
        {/* Background Image */}
        <Image
          src="/aboutus/aboutus-hero.png"
          alt="The Art of Omotenashi"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
            {/* Left Content */}
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-[48px] font-bold font-playfair leading-tight tracking-wide mb-4">
                {heroTitle}
              </h1>
              <p className="text-xl md:text-2xl font-poppins font-medium leading-relaxed mb-2">
                {heroSubtitle}
              </p>
              {/* Red accent line */}
              <div className="w-[101px] h-[6px] bg-[#FF4040] my-6 mx-auto" />
              <p className="text-base md:text-lg font-poppins leading-relaxed mb-8 max-w-md">
                {heroDescription}
              </p>
              <Link
                href={heroButtonLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({variant: 'daimasu-red', size: 'daimasu-xl'}),
                  'text-xl'
                )}
              >
                {heroButtonText}
              </Link>
            </div>

            {/* Right Japanese Vertical Text */}
            <div className="hidden lg:flex flex-row gap-4 items-start">
              <div className="writing-vertical-rl text-white font-zen-old-mincho text-3xl tracking-wider">
                {heroJapanese1}
              </div>
              <div className="writing-vertical-rl text-white font-zen-old-mincho text-3xl tracking-wider">
                {heroJapanese2}
              </div>
              <div className="writing-vertical-rl text-white font-zen-old-mincho text-4xl tracking-wider">
                {heroJapanese3}
              </div>
              <div className="writing-vertical-rl text-white font-zen-old-mincho text-4xl tracking-wider">
                {heroJapanese4}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Content Section - At Daimasu - Gray Background */}
      <div className="relative bg-[#F6F6F6]">
        <div className="py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
          {/* About Us Title */}
          <h2 className="text-5xl md:text-6xl lg:text-[64px] font-bold font-playfair text-black text-center mb-16 md:mb-24">
            {aboutUsTitle}
          </h2>

          {/* At Daimasu Section */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left: Text */}
            <div className="lg:w-1/2">
              <h3 className="text-3xl md:text-4xl lg:text-[48px] font-bold font-playfair text-black leading-tight mb-6">
                {atDaimasuTitle}
              </h3>
              <p className="text-lg md:text-xl font-poppins text-black leading-relaxed">
                {atDaimasuDescription}
              </p>
            </div>
            {/* Right: Image */}
            <div className="lg:w-1/2">
              <div className="relative aspect-square max-w-[630px] mx-auto">
                <Image
                  src="/aboutus/aboutus-daimasu.png"
                  alt="Sushi presentation"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crafted with Precision Section - Cream Background */}
      <div className="relative bg-[#FFEBC8] overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0">
          <Image
            src="/aboutus/aboutus-texture-bg.png"
            alt=""
            fill
            className="object-cover mix-blend-multiply opacity-30"
          />
        </div>

        <div className="relative py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
            {/* Right: Text (reversed order on desktop) */}
            <div className="lg:w-1/2">
              <h3 className="text-3xl md:text-4xl lg:text-[48px] font-bold font-playfair text-black leading-tight mb-6">
                {craftedTitle}
              </h3>
              <p className="text-lg md:text-xl font-poppins text-black leading-relaxed">
                {craftedDescription}
              </p>
            </div>
            {/* Left: Image */}
            <div className="lg:w-1/2">
              <div className="relative aspect-square max-w-[630px] mx-auto">
                <Image
                  src="/aboutus/aboutus-crafted.png"
                  alt="Chef preparing food"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Than a Meal Section */}
      <div className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
        {/* Background Image */}
        <Image
          src="/aboutus/more-than-meal-bg-52682f.png"
          alt="More Than a Meal"
          fill
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
            {/* Center-Right Content */}
            <div className="ml-auto max-w-md text-white">
              <h3 className="text-3xl md:text-4xl lg:text-[48px] font-bold font-playfair leading-tight mb-6">
                {moreThanMealTitle}
              </h3>
              <p className="text-lg md:text-xl font-poppins leading-relaxed">
                {moreThanMealDescription}
              </p>
            </div>

            {/* Right Japanese Vertical Text */}
            <div className="hidden lg:flex flex-row gap-4 items-start ml-8">
              <div className="writing-vertical-rl text-white font-zen-old-mincho text-2xl tracking-wider">
                {moreThanMealJapanese1}
              </div>
              <div className="writing-vertical-rl text-white font-zen-old-mincho text-2xl tracking-wider">
                {moreThanMealJapanese2}
              </div>
              <div className="writing-vertical-rl text-white font-zen-old-mincho text-2xl tracking-wider">
                {moreThanMealJapanese3}
              </div>
              <div className="writing-vertical-rl text-white font-zen-old-mincho text-5xl tracking-wider">
                {moreThanMealJapanese4}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Staff Section */}
      <div className="relative bg-black py-16 md:py-24">
        {/* Content */}
        <div className="px-4 sm:px-8 max-w-7xl mx-auto text-center text-white">
          <h3 className="text-3xl md:text-4xl lg:text-[48px] font-bold font-playfair mb-12">
            {meetOurStaffTitle}
          </h3>

          {/* Staff Grid Image - Desktop */}
          <div className="hidden md:block relative w-full max-w-[1300px] mx-auto aspect-[1301/728]">
            <Image
              src="/aboutus/staff-grid.png"
              alt="Our Staff"
              fill
              className="object-contain"
            />
          </div>

          {/* Staff Carousel - Mobile */}
          <div className="md:hidden">
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              arrows={false}
              autoplay={true}
              autoplaySpeed={3000}
            >
              {staffMembers.map((staff) => (
                <div key={staff.id} className="px-2">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={staff.image}
                      alt={staff.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
