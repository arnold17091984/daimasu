'use client';

import Image from 'next/image';
import Link from 'next/link';
import {cn} from '@/lib/utils';
import {buttonVariants} from '@/components/ui/button';
import {FaCheck, FaXmark} from 'react-icons/fa6';

type MembershipContent = {
  hero?: {
    title?: string;
    subtitle?: string;
    description?: string;
    registerButtonText?: string;
    registerButtonLink?: string | null;
    benefitsButtonText?: string;
    benefitsButtonLink?: string | null;
    japaneseText1?: string;
    japaneseText2?: string;
    japaneseText3?: string;
    japaneseText4?: string;
    japaneseText5?: string;
  };
  programConcept?: {
    title?: string;
    description?: string;
  };
};

type Props = {
  content?: MembershipContent | null;
};

export default function Membership({content}: Props) {
  // Hero section defaults
  const heroTitle =
    content?.hero?.title || 'Daimasu\nPremium Reserve';
  const heroSubtitle =
    content?.hero?.subtitle || 'Make Daimasu Your Second Dining Table';
  const heroDescription =
    content?.hero?.description ||
    "Daimasu Premium Reserve offers exclusive access and personalized service. Enjoy priority reservations and seasonal, curated menus. Every visit becomes an intimate celebration of Japanese culinary artistry.";
  const registerButtonText =
    content?.hero?.registerButtonText || 'Register Now';
  const registerButtonLink =
    content?.hero?.registerButtonLink || 'https://m.me/daimasujapaneserestaurant';
  const benefitsButtonText =
    content?.hero?.benefitsButtonText || 'View Benefits';
  const benefitsButtonLink =
    content?.hero?.benefitsButtonLink || '#benefits';

  // Japanese text defaults
  const japaneseText1 = content?.hero?.japaneseText1 || 'あなたの第二の食卓';
  const japaneseText2 = content?.hero?.japaneseText2 || '会員だけの特別な時間、';
  const japaneseText3 = content?.hero?.japaneseText3 || '旬の料理とともに。';
  const japaneseText4 = content?.hero?.japaneseText4 || '日本料理の静かな旅。';
  const japaneseText5 = content?.hero?.japaneseText5 || '二度、記憶に残る。';

  // Program Concept section defaults
  const programConceptTitle =
    content?.programConcept?.title || 'Daimasu as Your\nSecond Dining Room';
  const programConceptDescription =
    content?.programConcept?.description ||
    'A membership-based premium deposit program designed for Daimasu, which values the spirit of "Omotenashi" (Japanese hospitality) above all else, to forge strong bonds with true loyal customers and establish a stable revenue base.';

  // Split titles into lines
  const titleLines = heroTitle.split('\n');
  const programTitleLines = programConceptTitle.split('\n');

  return (
    <section className="bg-[#252A2E] text-white w-full">
      {/* Hero Section */}
      <div className="relative w-full min-h-[600px] md:min-h-[800px] lg:min-h-[900px]">
        {/* Background Image */}
        <Image
          src="/membership/membership-hero-273bf1.png"
          alt="Membership Hero"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20">
              {/* Main Content Card */}
              <div className="max-w-[675px] text-center">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold font-playfair text-white leading-[1.23] tracking-[0.02em]">
                  {titleLines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < titleLines.length - 1 && <br />}
                    </span>
                  ))}
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl md:text-[24px] font-poppins font-medium text-white mt-6 leading-[1.22] tracking-[0.01em]">
                  {heroSubtitle}
                </p>

                {/* Red Accent Line */}
                <div
                  className="my-6 mx-auto"
                  style={{
                    width: '101px',
                    height: '6px',
                    backgroundColor: '#FF4040'
                  }}
                />

                {/* Description */}
                <p className="text-sm sm:text-base md:text-[16px] font-poppins font-normal text-white leading-[1.44] tracking-[0.02em] max-w-[502px] mx-auto">
                  {heroDescription}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 mt-8">
                  <Link
                    href={registerButtonLink}
                    className={cn(
                      buttonVariants({size: 'daimasu-lg', variant: 'daimasu-red'}),
                      'min-w-[200px] sm:min-w-[329px] h-14 text-lg md:text-xl shadow-[0px_4px_9px_0px_rgba(0,0,0,1)]'
                    )}
                  >
                    {registerButtonText}
                  </Link>
                  <Link
                    href={benefitsButtonLink}
                    className={cn(
                      buttonVariants({size: 'daimasu-lg'}),
                      'min-w-[200px] sm:min-w-[329px] h-14 text-lg md:text-xl bg-transparent border-2 border-[#C66600] text-white hover:bg-[#C66600]/20 shadow-[0px_4px_9px_0px_rgba(0,0,0,1)]'
                    )}
                  >
                    {benefitsButtonText}
                  </Link>
                </div>
              </div>

              {/* Japanese Text (Vertical) - Right side */}
              <div className="hidden lg:flex flex-row gap-3 items-start">
                <div className="writing-vertical-rl text-white font-zen-old-mincho text-[24px] leading-[1.1] tracking-[0.01em]">
                  {japaneseText2}
                </div>
                <div className="writing-vertical-rl text-white font-zen-old-mincho text-[24px] leading-[1.1] tracking-[0.01em]">
                  {japaneseText3}
                </div>
                <div className="writing-vertical-rl text-white font-zen-old-mincho text-[24px] leading-[1.1] tracking-[0.01em]">
                  {japaneseText4}
                </div>
                <div className="writing-vertical-rl text-white font-zen-old-mincho text-[36px] leading-[1.1] tracking-[0.01em]">
                  {japaneseText1}
                </div>
                <div className="writing-vertical-rl text-white font-zen-old-mincho text-[36px] leading-[1.1] tracking-[0.01em]">
                  {japaneseText5}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Concept Section - Daimasu as Your Second Dining Room */}
      <div className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[917px] bg-black">
        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1280px] px-4 sm:px-8 mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
              {/* Left: Text Content */}
              <div className="max-w-[650px]">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-playfair text-white leading-[1.23] tracking-[0.02em]">
                  {programTitleLines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < programTitleLines.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-poppins font-medium text-white mt-8 leading-[1.22] tracking-[0.01em]">
                  {programConceptDescription}
                </p>
              </div>

              {/* Right: Decorative Pattern */}
              <div className="hidden lg:block relative w-[600px] xl:w-[791px] h-[365px] xl:h-[482px]">
                <Image
                  src="/membership/daimasu-pattern.png"
                  alt="Daimasu Pattern"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Grades Section - Choose Your Exclusive Tier */}
      <div className="relative w-full bg-black py-12 md:py-16 lg:py-20">
        <div className="w-full max-w-[1600px] px-4 sm:px-8 mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold font-playfair text-white leading-[1.23] tracking-[0.02em] mb-4">
              Choose Your Exclusive Tier
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-[24px] font-poppins font-medium text-[#868686] leading-[1.22] tracking-[0.01em] max-w-[650px] mx-auto mb-6">
              Three carefully curated membership grades,<br />
              each offering exceptional value and VIP treatment
            </p>
            <Link
              href="#program-concept"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-[#C66600] text-[#C66600] font-poppins font-medium text-lg rounded-[9px] hover:bg-[#C66600]/10 transition-all shadow-[0px_4px_9px_0px_rgba(0,0,0,1)]"
            >
              Program Concept
            </Link>
          </div>

          {/* Pricing Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Tier Headers */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] pb-4 mb-2">
                <div className="font-poppins font-medium text-xl text-white">Features</div>
                <div className="text-center">
                  <div className="font-poppins font-medium text-2xl md:text-[32px] text-white mb-1">Matsu</div>
                  <div className="bg-[#3B3B3B]/50 rounded px-3 py-1 inline-block">
                    <span className="font-poppins font-medium text-sm text-white/75">Limited to 50 Members</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-poppins font-medium text-2xl md:text-[32px] text-white mb-1">Toku-Matsu</div>
                  <div className="bg-[#1D1D1D] rounded px-3 py-1 inline-block">
                    <span className="font-poppins font-medium text-sm text-white/75">Limited to 30 Members</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-poppins font-medium text-2xl md:text-[32px] text-white mb-1">Goku-Matsu</div>
                  <div className="bg-[#1D1D1D] rounded px-3 py-1 inline-block">
                    <span className="font-poppins font-medium text-sm text-white/75">Limited to 10 Members</span>
                  </div>
                </div>
              </div>

              {/* Total Price Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-4">
                <div className="font-poppins font-medium text-xl text-white flex items-center">Total Price</div>
                <div className="text-center font-poppins font-medium text-2xl md:text-[36px] text-[#C66600]">PHP 130,000</div>
                <div className="text-center font-poppins font-medium text-2xl md:text-[36px] text-[#C66600]">PHP 250,000</div>
                <div className="text-center font-poppins font-medium text-2xl md:text-[36px] text-[#C66600]">PHP 500,000</div>
              </div>

              {/* Annual Fees Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-4">
                <div className="font-poppins font-medium text-xl text-white flex items-center">Annual Fees</div>
                <div className="text-center font-poppins font-bold text-xl text-white">PHP 30,000</div>
                <div className="text-center font-poppins font-bold text-xl text-white">PHP 50,000</div>
                <div className="text-center font-poppins font-bold text-xl text-white">PHP 100,000</div>
              </div>

              {/* Deposit Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-4">
                <div className="font-poppins font-medium text-xl text-white flex items-center">Deposit</div>
                <div className="text-center font-poppins font-bold text-xl text-white">PHP 100,000</div>
                <div className="text-center font-poppins font-bold text-xl text-white">PHP 200,000</div>
                <div className="text-center font-poppins font-bold text-xl text-white">PHP 400,000</div>
              </div>

              {/* Bonus Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-4">
                <div className="font-poppins font-medium text-xl text-white flex items-center">Bonus</div>
                <div className="text-center">
                  <div className="font-poppins font-medium text-xl text-[#C66600]">10%</div>
                  <div className="font-poppins font-medium text-sm text-white/50">PHP 10,000</div>
                </div>
                <div className="text-center">
                  <div className="font-poppins font-medium text-xl text-[#C66600]">15%</div>
                  <div className="font-poppins font-medium text-sm text-white/50">PHP 30,000</div>
                </div>
                <div className="text-center">
                  <div className="font-poppins font-medium text-xl text-[#C66600]">20%</div>
                  <div className="font-poppins font-medium text-sm text-white/50">PHP 80,000</div>
                </div>
              </div>

              {/* Total Balance Row - Highlighted */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-4 bg-[#C66600]/10">
                <div className="font-poppins font-medium text-xl text-white flex items-center">Total Balance</div>
                <div className="text-center font-poppins font-medium text-2xl text-[#C66600]">PHP 110,000</div>
                <div className="text-center font-poppins font-medium text-2xl text-[#C66600]">PHP 230,000</div>
                <div className="text-center font-poppins font-medium text-2xl text-[#C66600]">PHP 480,000</div>
              </div>

              {/* Dining Discount Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-4">
                <div className="flex flex-col">
                  <span className="font-poppins font-medium text-xl text-white">Dining Discount</span>
                  <span className="font-poppins font-medium text-sm text-white/50">(Applied after deposit bonus is consumed)</span>
                </div>
                <div className="text-center font-poppins font-medium text-xl text-[#C66600]">10% OFF</div>
                <div className="text-center font-poppins font-medium text-xl text-[#C66600]">13% OFF</div>
                <div className="text-center font-poppins font-medium text-xl text-[#C66600]">15% OFF</div>
              </div>

              {/* Member Benefits Header - Highlighted */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-4 bg-[#C66600]/10">
                <div className="font-poppins font-medium text-xl text-white flex items-center">Member Benefits</div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              {/* Deposit Bonus Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-3">
                <div className="font-poppins font-medium text-base text-white/75 flex items-center">Deposit Bonus</div>
                <div className="text-center font-poppins font-medium text-base text-[#C66600]">10%</div>
                <div className="text-center font-poppins font-medium text-base text-[#C66600]">15%</div>
                <div className="text-center font-poppins font-medium text-base text-[#C66600]">20%</div>
              </div>

              {/* Permanent Priority Reservation Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-3">
                <div className="font-poppins font-medium text-base text-white/75 flex items-center">Permanent Priority Reservation</div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
              </div>

              {/* Free Private Room Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-3">
                <div className="font-poppins font-medium text-base text-white/75 flex items-center">Free Private Room</div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
              </div>

              {/* Chef's Special Birthday Course Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-3">
                <div className="font-poppins font-medium text-base text-white/75 flex items-center">Chef&apos;s Special Birthday Course (PHP 20,000 value)</div>
                <div className="text-center flex justify-center items-center"><FaXmark className="text-[#2C2C2C] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaXmark className="text-[#2C2C2C] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
              </div>

              {/* Pair Omakase Birthday Course Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-3">
                <div className="font-poppins font-medium text-base text-white/75 flex items-center">Pair Omakase Birthday Course (PHP 12,000 value)</div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaXmark className="text-[#2C2C2C] w-5 h-5" /></div>
              </div>

              {/* Seasonal Tasting Events Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-3">
                <div className="font-poppins font-medium text-base text-white/75 flex items-center">Seasonal Tasting Events</div>
                <div className="text-center font-poppins font-medium text-xl text-[#C66600]">2x/year</div>
                <div className="text-center font-poppins font-medium text-xl text-[#C66600]">2x/year</div>
                <div className="text-center font-poppins font-medium text-xl text-[#C66600]">4x/year</div>
              </div>

              {/* Free Sake/Shochu Bottle Keep Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-3">
                <div className="font-poppins font-medium text-base text-white/75 flex items-center">Free Sake/Shochu Bottle Keep</div>
                <div className="text-center font-poppins font-medium text-xl text-[#C66600]">1 Bottle</div>
                <div className="text-center font-poppins font-medium text-xl text-[#C66600]">1 Bottle</div>
                <div className="text-center font-poppins font-medium text-xl text-[#C66600]">2 Bottles</div>
              </div>

              {/* Chef Consultation Available Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-3">
                <div className="font-poppins font-medium text-base text-white/75 flex items-center">Chef Consultation Available</div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
              </div>

              {/* Priority Chef Consultation Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-3">
                <div className="font-poppins font-medium text-base text-white/50 flex items-center">Priority Chef Consultation</div>
                <div className="text-center flex justify-center items-center"><FaXmark className="text-[#2C2C2C] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaXmark className="text-[#2C2C2C] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
              </div>

              {/* Free Chauffeur Service Row */}
              <div className="grid grid-cols-4 gap-4 border-b border-[#C66600] py-3">
                <div className="font-poppins font-medium text-base text-white/50 flex items-center">Free Chauffeur Service (Makati/BGC)</div>
                <div className="text-center flex justify-center items-center"><FaXmark className="text-[#2C2C2C] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaXmark className="text-[#2C2C2C] w-5 h-5" /></div>
                <div className="text-center flex justify-center items-center"><FaCheck className="text-[#C66600] w-5 h-5" /></div>
              </div>

              {/* Register Now Buttons Row */}
              <div className="grid grid-cols-4 gap-4 py-6">
                <div></div>
                <div className="text-center">
                  <Link
                    href="https://m.me/daimasujapaneserestaurant"
                    className={buttonVariants({size: 'daimasu-lg', variant: 'daimasu-orange'})}
                  >
                    Register Now
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    href="https://m.me/daimasujapaneserestaurant"
                    className={buttonVariants({size: 'daimasu-lg', variant: 'daimasu-orange'})}
                  >
                    Register Now
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    href="https://m.me/daimasujapaneserestaurant"
                    className={buttonVariants({size: 'daimasu-lg', variant: 'daimasu-orange'})}
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exclusive VIP Treatment Section */}
      <div className="relative w-full bg-black py-16 md:py-20 lg:py-24">
        <div className="w-full max-w-[1600px] px-4 sm:px-8 mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold font-playfair text-white leading-[1.23] tracking-[0.02em] mb-6">
              Exclusive VIP Treatment
            </h2>
            <Link
              href="#member-benefits"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#C66600] text-[#C66600] font-poppins font-medium text-xl rounded-[9px] hover:bg-[#C66600]/10 transition-all shadow-[0px_4px_9px_0px_rgba(0,0,0,1)]"
            >
              Member Benefits
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {/* Chef's Special Card */}
            <div className="bg-[#171717] border border-[#C66600] rounded-[10px] p-6 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-[#D9D9D9] mb-5" />
              <h3 className="font-poppins font-bold text-xl text-white mb-4 tracking-[0.02em]">
                Chef&apos;s Special
              </h3>
              <p className="font-poppins font-medium text-sm text-white/75 leading-[1.09] tracking-[0.02em]">
                Exclusive access to chef consultations and bespoke menu creations
              </p>
            </div>

            {/* Priority Reservation Card */}
            <div className="bg-[#171717] border border-[#C66600] rounded-[10px] p-6 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-[#D9D9D9] mb-5" />
              <h3 className="font-poppins font-bold text-xl text-white mb-4 tracking-[0.02em]">
                Priority Reservation
              </h3>
              <p className="font-poppins font-medium text-sm text-white/75 leading-[1.09] tracking-[0.02em]">
                Permanent guarantee of table availability, even on the busiest days
              </p>
            </div>

            {/* Bottle Keep Service Card */}
            <div className="bg-[#171717] border border-[#C66600] rounded-[10px] p-6 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-[#D9D9D9] mb-5" />
              <h3 className="font-poppins font-bold text-xl text-white mb-4 tracking-[0.02em]">
                Bottle Keep Service
              </h3>
              <p className="font-poppins font-medium text-sm text-white/75 leading-[1.09] tracking-[0.02em]">
                Complimentary sake and shochu bottle storage for your visits
              </p>
            </div>

            {/* Chauffeur Service Card */}
            <div className="bg-[#171717] border border-[#C66600] rounded-[10px] p-6 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-[#D9D9D9] mb-5" />
              <h3 className="font-poppins font-bold text-xl text-white mb-4 tracking-[0.02em]">
                Chauffeur Service
              </h3>
              <p className="font-poppins font-medium text-sm text-white/75 leading-[1.09] tracking-[0.02em]">
                Free or discounted transportation within Makati and BGC area
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Settlement Process Section */}
      <div className="relative w-full min-h-[800px] lg:min-h-[1000px]">
        {/* Background Image */}
        <Image
          src="/membership/settlement-bg.png"
          alt="Settlement Background"
          fill
          className="object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1200px] px-4 sm:px-8 mx-auto py-16 md:py-24">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold font-playfair leading-[1.23] tracking-[0.02em] mb-6">
              <span className="text-white">Simple</span>{' '}
              <span className="text-[#C66600]">Settlement Process</span>
            </h2>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#C66600] text-[#C66600] font-poppins font-medium text-xl rounded-[9px] hover:bg-[#C66600]/10 transition-all shadow-[0px_4px_9px_0px_rgba(0,0,0,1)]"
            >
              How It Works
            </Link>
          </div>

          {/* Three Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 mb-12">
            {/* Step 1 */}
            <div>
              <div className="font-poppins font-bold text-5xl lg:text-[64px] text-[#C66600] leading-[1.23] tracking-[0.02em] mb-4">
                1
              </div>
              <h3 className="font-playfair font-bold text-2xl lg:text-[32px] text-white leading-[1.23] tracking-[0.02em] mb-4">
                Deduct from Deposit
              </h3>
              <p className="font-poppins font-normal text-lg lg:text-xl text-white/75 leading-[1.23] tracking-[0.02em]">
                Your dining expenses are deducted from your deposit balance (including bonus).
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <div className="font-poppins font-bold text-5xl lg:text-[64px] text-[#C66600] leading-[1.23] tracking-[0.02em] mb-4">
                2
              </div>
              <h3 className="font-playfair font-bold text-2xl lg:text-[32px] text-white leading-[1.23] tracking-[0.02em] mb-4">
                Discount Continues
              </h3>
              <p className="font-poppins font-normal text-lg lg:text-xl text-white/75 leading-[1.23] tracking-[0.02em]">
                Even after your deposit balance reaches zero, your grade-specific dining discount continues as long as your membership is valid.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <div className="font-poppins font-bold text-5xl lg:text-[64px] text-[#C66600] leading-[1.23] tracking-[0.02em] mb-4">
                3
              </div>
              <h3 className="font-playfair font-bold text-2xl lg:text-[32px] text-white leading-[1.23] tracking-[0.02em] mb-4">
                Top-up Anytime
              </h3>
              <p className="font-poppins font-normal text-lg lg:text-xl text-white/75 leading-[1.23] tracking-[0.02em]">
                You can top up your deposit anytime with the same bonus percentage (minimum PHP 10,000).
              </p>
            </div>
          </div>

          {/* Additional Information Box */}
          <div className="bg-[#171717] border border-[#C66600] rounded-[15px] p-8 lg:p-12 max-w-[878px] mx-auto mb-16">
            <h4 className="font-playfair font-bold text-2xl lg:text-[32px] text-white leading-[1.23] tracking-[0.02em] mb-6">
              Additional Information
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaCheck className="text-white w-5 h-5 mt-1 flex-shrink-0" />
                <span className="font-poppins font-normal text-lg lg:text-xl text-white/75 leading-[1.23] tracking-[0.02em]">
                  Deposit can be topped up anytime with the same bonus percentage
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheck className="text-white w-5 h-5 mt-1 flex-shrink-0" />
                <span className="font-poppins font-normal text-lg lg:text-xl text-white/75 leading-[1.23] tracking-[0.02em]">
                  Minimum top-up amount is PHP 10,000
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheck className="text-white w-5 h-5 mt-1 flex-shrink-0" />
                <span className="font-poppins font-normal text-lg lg:text-xl text-white/75 leading-[1.23] tracking-[0.02em]">
                  Deposit balance has no expiration date
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheck className="text-white w-5 h-5 mt-1 flex-shrink-0" />
                <span className="font-poppins font-normal text-lg lg:text-xl text-white/75 leading-[1.23] tracking-[0.02em]">
                  Membership valid for 1 year (no automatic renewal)
                </span>
              </li>
            </ul>
          </div>

          {/* Ready to Join Section */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold font-playfair leading-[1.23] tracking-[0.02em] mb-6">
              <span className="text-white">Ready to Join Our</span><br />
              <span className="text-[#C66600]">Exclusive Community?</span>
            </h2>
            <p className="font-poppins font-normal text-lg lg:text-2xl text-white/75 leading-[1.23] tracking-[0.02em] max-w-[650px] mx-auto mb-8">
              Each grade has limited slots. Register now to experience Daimasu&apos;s exceptional hospitality.
            </p>
            <Link
              href="https://m.me/daimasujapaneserestaurant"
              className={buttonVariants({size: 'daimasu-lg', variant: 'daimasu-orange'})}
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
