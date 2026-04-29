'use client';

import {useState, useRef} from 'react';
import Image from 'next/image';
import {FaUsers} from 'react-icons/fa6';
import {buttonVariants} from '@/components/ui/button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {cn} from '@/lib/utils';

type OurRoomsContent = {
  hero?: {
    title?: string;
    subtitle?: string;
    description?: string;
    japaneseText1?: string;
    japaneseText2?: string;
    japaneseText3?: string;
  };
  layoutFlow?: {
    title?: string;
  };
  roomDetails?: {
    title?: string;
    description?: string;
  };
  vipRooms?: {
    title?: string;
    capacity?: string;
    description?: string;
    tagline1?: string;
    tagline2?: string;
    buttonText?: string;
  };
  tatamiRooms?: {
    title?: string;
    capacity?: string;
    description?: string;
    tagline1?: string;
    tagline2?: string;
    buttonText?: string;
  };
  sushiCounter?: {
    title?: string;
    capacity?: string;
    description?: string;
    tagline1?: string;
    tagline2?: string;
    buttonText?: string;
  };
};

interface RoomCardProps {
  title: string;
  capacity: string;
  description: string;
  images: string[];
  tagline1: string;
  tagline2: string;
  buttonText: string;
}

// VIP Room Card with gallery layout (main image + thumbnails)
function VIPRoomCard({
  title,
  capacity,
  description,
  images,
  tagline1,
  tagline2,
  buttonText
}: RoomCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const mainSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, next: number) => setActiveIndex(next)
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <div className="bg-[#F6F6F6] rounded-[21px] p-6 md:p-8 lg:p-10 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-auto lg:flex-shrink-0">
          {/* Main Image */}
          <div className="relative w-full lg:w-[400px] xl:w-[450px] aspect-[4/3] overflow-hidden shadow-md">
            <Slider ref={sliderRef} {...mainSliderSettings}>
              {images.map((img, idx) => (
                <div key={idx} className="relative w-full aspect-[4/3]">
                  <Image
                    src={img}
                    alt={`${title} ${idx + 1}`}
                    fill
                    sizes="(min-width: 1280px) 450px, (min-width: 1024px) 400px, 100vw"
                    quality={75}
                    className="object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 w-full lg:w-[400px] xl:w-[450px]">
              {images.slice(1).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleThumbnailClick(idx + 1)}
                  className={`relative flex-1 aspect-[4/3] overflow-hidden transition-all ${
                    activeIndex === idx + 1
                      ? 'ring-2 ring-[#A00000] opacity-100'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${title} thumbnail ${idx + 2}`}
                    fill
                    sizes="150px"
                    quality={70}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-3xl md:text-4xl lg:text-[40px] font-bold font-poppins text-black mb-2">
            {title}
          </h3>

          {/* Capacity */}
          <div className="flex items-center gap-2 text-black mb-4 justify-center lg:justify-start">
            <FaUsers className="w-5 h-5" />
            <span className="text-sm md:text-base font-poppins">
              {capacity}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base font-poppins text-black/80 leading-relaxed max-w-md mx-auto lg:mx-0">
            {description}
          </p>

          {/* Book Button */}
          <div className="mt-6">
            <Link
              className={cn(
                buttonVariants({size: 'daimasu-md', variant: 'daimasu-red'})
              )}
              href="https://m.me/daimasujapaneserestaurant"
            >
              {buttonText}
            </Link>
          </div>
        </div>

        {/* Right: Japanese Tagline (Vertical) */}
        <div className="hidden lg:flex flex-row gap-3 self-stretch items-center">
          <div className="writing-vertical-rl text-black font-zen-old-mincho text-xl xl:text-2xl tracking-wider">
            {tagline1}
          </div>
          <div className="writing-vertical-rl text-black font-zen-old-mincho text-2xl xl:text-3xl tracking-wider">
            {tagline2}
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  content?: OurRoomsContent | null;
};

export default function OurRooms({content}: Props) {
  const t = useTranslations();
  const useCms = useLocale() === 'en';

  // Hero section defaults
  const heroTitle = (useCms && content?.hero?.title) || t('a_quiet_journey');
  const heroSubtitle =
    (useCms && content?.hero?.subtitle) || t('drawn_close_by_care');
  const heroDescription =
    (useCms && content?.hero?.description) || t('rooms_hero_description');
  const heroJapanese1 =
    content?.hero?.japaneseText1 || '心に寄り添い、味わいに浸る';
  const heroJapanese2 = content?.hero?.japaneseText2 || '時を超えた膳';
  const heroJapanese3 = content?.hero?.japaneseText3 || '静かな旅、';

  // Layout & Flow defaults
  const layoutFlowTitle =
    (useCms && content?.layoutFlow?.title) || t('layout_&_flow');

  // Room Details defaults
  const roomDetailsTitle =
    (useCms && content?.roomDetails?.title) || t('room_details');
  const roomDetailsDescription =
    (useCms && content?.roomDetails?.description) || t('join_us_at_daimasu');

  // Split hero title into lines
  const heroTitleLines = heroTitle.split('\n');

  const rooms = [
    {
      title: (useCms && content?.vipRooms?.title) || t('vip_rooms'),
      capacity:
        (useCms && content?.vipRooms?.capacity) ||
        `6-8 ${t('people')}/${t('room')}`,
      description:
        (useCms && content?.vipRooms?.description) ||
        t('experience_elevated_privacy_and'),
      images: [
        '/ourrooms/viprooms-1.png',
        '/ourrooms/viprooms-2.png',
        '/ourrooms/viprooms-3.png',
        '/ourrooms/viprooms-4.png'
      ],
      tagline1: content?.vipRooms?.tagline1 || t('vip_rooms_tagline_1'),
      tagline2: content?.vipRooms?.tagline2 || t('vip_rooms_tagline_2'),
      buttonText: (useCms && content?.vipRooms?.buttonText) || t('book_a_table')
    },
    {
      title: (useCms && content?.tatamiRooms?.title) || t('tatami_rooms'),
      capacity:
        (useCms && content?.tatamiRooms?.capacity) ||
        `4-8 ${t('people')}/${t('room')}`,
      description:
        (useCms && content?.tatamiRooms?.description) ||
        t('immerse_yourself_in_the'),
      images: [
        '/ourrooms/tatamirooms-1.png',
        '/ourrooms/tatamirooms-2.png',
        '/ourrooms/tatamirooms-3.png',
        '/ourrooms/tatamirooms-4.png'
      ],
      tagline1: content?.tatamiRooms?.tagline1 || t('tatami_rooms_tagline_1'),
      tagline2: content?.tatamiRooms?.tagline2 || t('tatami_rooms_tagline_2'),
      buttonText:
        (useCms && content?.tatamiRooms?.buttonText) || t('book_a_room')
    },
    {
      title: (useCms && content?.sushiCounter?.title) || t('sushi_counter'),
      capacity:
        (useCms && content?.sushiCounter?.capacity) || `11 ${t('people')}`,
      description:
        (useCms && content?.sushiCounter?.description) ||
        t('experience_the_artistry_of'),
      images: [
        '/ourrooms/sushicounter-1.png',
        '/ourrooms/sushicounter-2.png',
        '/ourrooms/sushicounter-3.png',
        '/ourrooms/sushicounter-4.png'
      ],
      tagline1: content?.sushiCounter?.tagline1 || t('sushi_counter_tagline_1'),
      tagline2: content?.sushiCounter?.tagline2 || t('sushi_counter_tagline_2'),
      buttonText:
        (useCms && content?.sushiCounter?.buttonText) || t('book_a_seat')
    }
  ];

  return (
    <section className="bg-[#252A2E] text-white w-full">
      {/* Hero Section */}
      <div className="relative w-full min-h-[560px] md:min-h-[760px] lg:min-h-[860px]">
        {/* Background Image */}
        <Image
          src="/ourrooms/rooms-hero.png"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={75}
        />
        {/* Gradient Overlay — full black on mobile, fading right on desktop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/55 md:bg-transparent md:[background:linear-gradient(90deg,rgba(0,0,0,0)_47%,rgba(0,0,0,0.95)_89%)]"
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-center md:justify-end">
          <div className="w-full max-w-[1036px] mx-auto md:mx-0 px-6 md:pr-16 lg:pr-24 md:ml-auto">
            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12 lg:gap-16">
              <div className="max-w-[521px] text-left">
                <h1 className="text-3xl sm:text-4xl md:text-[48px] font-bold font-playfair text-white md:leading-[3rem] tracking-[0.02em] lg:break-keep-all">
                  {heroTitleLines.map((line, index) => (
                    <span key={`${line}-${index}`}>
                      {line}
                      {index < heroTitleLines.length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <p className="text-lg sm:text-xl md:text-[24px] font-poppins font-medium text-white mt-4 leading-[1.4] tracking-[0.01em]">
                  {heroSubtitle}
                </p>
                <div
                  className="my-6 mx-0 w-[80px] md:w-[101px] h-[3px] md:h-[6px] bg-[#FF4040]"
                  aria-hidden="true"
                />
                <p className="text-sm sm:text-base md:text-[16px] font-poppins font-normal text-white/90 leading-[1.6] tracking-[0.02em] max-w-[497px]">
                  {heroDescription}
                </p>
              </div>

              {/* Japanese Vertical Accent — desktop only */}
              <div
                aria-hidden="true"
                className="hidden md:flex flex-row gap-2 lg:gap-4"
              >
                <div className="writing-vertical-rl text-white font-zen-old-mincho text-[28px] lg:text-[32px] leading-[1.1] tracking-[0.01em]">
                  {heroJapanese1}
                </div>
                <div className="writing-vertical-rl text-white font-zen-old-mincho text-[48px] lg:text-[64px] leading-[1.1] tracking-[0.01em]">
                  {heroJapanese2}
                </div>
                <div className="writing-vertical-rl text-white font-zen-old-mincho text-[48px] lg:text-[64px] leading-[1.1] tracking-[0.01em]">
                  {heroJapanese3}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Details Section */}
      <div className="relative bg-[#FFEFD3] overflow-hidden">
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

        {/* Content */}
        <div className="relative py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
          {/* Layout & Flow Section */}
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-black font-poppins mb-8 text-center">
            {layoutFlowTitle}
          </h2>
          <div className="bg-[#F6F6F6] rounded-[11px] p-6 md:p-8 lg:p-10 mb-16 md:mb-24">
            {/* Main 3D Floor Plan Image */}
            <div className="relative w-full max-w-3xl mx-auto mb-6">
              <Image
                src="/ourrooms/layout-thumb-1.png"
                alt="Restaurant 3D Floor Layout"
                width={1118}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
            {/* Thumbnail Images */}
            <div className="flex justify-center gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1 aspect-square max-w-[180px]">
                <Image
                  src="/ourrooms/rooms-layout.png"
                  alt="Floor Plan View 1"
                  fill
                  sizes="(min-width: 768px) 180px, 30vw"
                  quality={70}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="relative flex-1 aspect-[4/3] max-w-[220px]">
                <Image
                  src="/ourrooms/layout-thumb-2.png"
                  alt="Floor Plan View 2"
                  fill
                  sizes="(min-width: 768px) 220px, 35vw"
                  quality={70}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="relative flex-1 aspect-square max-w-[180px]">
                <Image
                  src="/ourrooms/layout-thumb-3.png"
                  alt="Floor Plan View 3"
                  fill
                  sizes="(min-width: 768px) 180px, 30vw"
                  quality={70}
                  className="object-cover rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Room Details Section */}
          <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold text-black font-poppins mb-4 text-center">
            {roomDetailsTitle}
          </h2>
          <p className="text-sm md:text-base font-poppins text-black/80 leading-relaxed text-center max-w-3xl mx-auto mb-12">
            {roomDetailsDescription}
          </p>

          {/* Room Cards */}
          <div className="space-y-10 md:space-y-16">
            {rooms.map((room) => (
              <VIPRoomCard
                key={room.title}
                title={room.title}
                capacity={room.capacity}
                description={room.description}
                images={room.images}
                tagline1={room.tagline1}
                tagline2={room.tagline2}
                buttonText={room.buttonText}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
