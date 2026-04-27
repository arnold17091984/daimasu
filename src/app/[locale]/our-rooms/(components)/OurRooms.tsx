'use client';

import {useState, useRef} from 'react';
import Image from 'next/image';
import {FaUsers} from 'react-icons/fa6';
import ExternalLink from '@/components/ExternalLink';
import {buttonVariants} from '@/components/ui/button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
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
  reverse?: boolean;
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
}: Omit<RoomCardProps, 'reverse'>) {
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

// Standard Room Card (for other rooms)
function RoomCard({
  title,
  capacity,
  description,
  images,
  tagline1,
  tagline2,
  buttonText,
  reverse = false
}: RoomCardProps) {
  return (
    <div className="relative w-full rounded-[21px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.4)]">
      {/* Background Image */}
      <div className="relative w-full aspect-[2.3/1] min-h-[400px] md:min-h-[500px]">
        <Image src={images[0]} alt={title} fill className="object-cover" />
        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            reverse
              ? 'bg-gradient-to-l from-black/90 via-black/60 to-transparent'
              : 'bg-gradient-to-r from-black/90 via-black/60 to-transparent'
          }`}
        />

        {/* Content */}
        <div
          className={`absolute inset-0 flex ${
            reverse ? 'flex-row-reverse' : 'flex-row'
          } items-center pointer-events-none`}
        >
          {/* Text Content */}
          <div
            className={`flex-1 p-6 md:p-10 lg:p-12 ${
              reverse ? 'text-left' : 'text-right'
            }`}
          >
            {/* Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-white mb-2">
              {title}
            </h3>

            {/* Capacity */}
            <div
              className={`flex items-center gap-2 text-white mb-4 ${
                reverse ? 'justify-start' : 'justify-end'
              }`}
            >
              <FaUsers className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm md:text-base font-poppins">
                {capacity}
              </span>
            </div>

            {/* Description */}
            <p
              className={`text-sm md:text-base font-poppins text-white/90 leading-relaxed max-w-md ${
                reverse ? 'mr-auto' : 'ml-auto'
              }`}
            >
              {description}
            </p>

            {/* Book Button */}
            <div
              className={`mt-6 ${reverse ? 'text-left' : 'text-right'} pointer-events-auto`}
            >
              <ExternalLink href="https://m.me/daimasujapaneserestaurant">
                <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-poppins font-bold text-lg md:text-xl rounded-[9px] hover:bg-white hover:text-black transition-all shadow-[0px_4px_9px_0px_rgba(0,0,0,1)]">
                  {buttonText}
                </button>
              </ExternalLink>
            </div>
          </div>

          {/* Japanese Tagline (Vertical) */}
          <div
            className={`hidden md:flex flex-col items-center justify-center px-8 lg:px-12 ${
              reverse ? 'order-first' : ''
            }`}
          >
            <div className="writing-vertical-rl text-white font-zen-old-mincho text-2xl lg:text-3xl tracking-wider">
              <p>{tagline1}</p>
              <p className="mt-2">{tagline2}</p>
            </div>
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
  // Hero section defaults
  const heroTitle = content?.hero?.title || "A Quiet Journey,\nA Table Beyond Time";
  const heroSubtitle = content?.hero?.subtitle || "Drawn Close by Care, Immersed in Taste";
  const heroDescription = content?.hero?.description || "Each room offers a sanctuary from the outside world, where comfort is felt in every detail. Soft lighting, thoughtful design, and serene surroundings create a space to relax, savor, and connect. Here, time slows, allowing each dish and every conversation to be truly enjoyed.";
  const heroJapanese1 = content?.hero?.japaneseText1 || "心に寄り添い、味わいに浸る";
  const heroJapanese2 = content?.hero?.japaneseText2 || "時を超えた膳";
  const heroJapanese3 = content?.hero?.japaneseText3 || "静かな旅、";

  // Layout & Flow defaults
  const layoutFlowTitle = content?.layoutFlow?.title || "Layout & Flow";

  // Room Details defaults
  const roomDetailsTitle = content?.roomDetails?.title || "Room Details";
  const roomDetailsDescription = content?.roomDetails?.description || "Join us at Daimasu, and discover why every meal here is more than food—it's a celebration of culture, care, and culinary artistry.";

  // Split hero title into lines
  const heroTitleLines = heroTitle.split('\n');

  const rooms = [
    {
      title: content?.vipRooms?.title || "VIP Rooms",
      capacity: content?.vipRooms?.capacity || "6-8 people/room",
      description: content?.vipRooms?.description || "Experience elevated privacy and comfort in our VIP Room, designed to accommodate up to 8 guests. With refined interiors and a serene ambiance, it's the ideal setting for intimate celebrations, business meals, or special occasions. Let our attentive team ensure every detail is handled with care, creating a seamless and memorable dining experience.",
      images: [
        '/ourrooms/viprooms-1.png',
        '/ourrooms/viprooms-2.png',
        '/ourrooms/viprooms-3.png',
        '/ourrooms/viprooms-4.png'
      ],
      tagline1: content?.vipRooms?.tagline1 || "洗練と静寂に包まれた",
      tagline2: content?.vipRooms?.tagline2 || "親密な隠れ家",
      buttonText: content?.vipRooms?.buttonText || "Book a Table"
    },
    {
      title: content?.tatamiRooms?.title || "Tatami Rooms",
      capacity: content?.tatamiRooms?.capacity || "4-8 people/room",
      description: content?.tatamiRooms?.description || "Immerse yourself in the elegance of tradition within our Tatami Room, a sanctuary of understated luxury. Appointed with the handcrafted woven straw flooring and refined Japanese decor, this exclusive space offers a serene escape for those seeking a truly authentic and elevated dining experience. Ideal for private gatherings, it embodies the essence of omotenashi—Japan's highest form of hospitality—with grace and quiet sophistication.",
      images: [
        '/ourrooms/tatamirooms-1.png',
        '/ourrooms/tatamirooms-2.png',
        '/ourrooms/tatamirooms-3.png',
        '/ourrooms/tatamirooms-4.png'
      ],
      tagline1: content?.tatamiRooms?.tagline1 || "畳の間、時が静かに",
      tagline2: content?.tatamiRooms?.tagline2 || "流れる特別な空間",
      buttonText: content?.tatamiRooms?.buttonText || "Book a Room"
    },
    {
      title: content?.sushiCounter?.title || "Sushi Counter",
      capacity: content?.sushiCounter?.capacity || "11 people",
      description: content?.sushiCounter?.description || "Experience the artistry of Japanese cuisine at our exclusive Sushi Counter, thoughtfully designed to seat up to 13 guests. Witness master chefs craft each piece with precision and elegance, delivering an immersive dining experience that honors tradition and seasonality. Ideal for private gatherings this setting reflects the spirit of omakase and omotenashi—where every detail is curated with grace and hospitality.",
      images: [
        '/ourrooms/sushicounter-1.png',
        '/ourrooms/sushicounter-2.png',
        '/ourrooms/sushicounter-3.png',
        '/ourrooms/sushicounter-4.png'
      ],
      tagline1: content?.sushiCounter?.tagline1 || "寿司は芸術、",
      tagline2: content?.sushiCounter?.tagline2 || "オマカセは体験",
      buttonText: content?.sushiCounter?.buttonText || "Book a Seat"
    }
  ];

  return (
    <section className="bg-[#252A2E] text-white w-full">
      {/* Hero Section */}
      <div className="relative w-full min-h-[600px] md:min-h-[800px] lg:min-h-[907px]">
        {/* Background Image */}
        <Image
          src="/ourrooms/rooms-hero.png"
          alt="Rooms Hero"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay - transparent on left (47%), black on right (89%) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 0) 47%, rgba(0, 0, 0, 1) 89%)'
          }}
        />

        {/* Content - positioned on right side */}
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="w-full max-w-[1036px] px-4 sm:px-8 md:pr-16 lg:pr-24">
            <div className="flex flex-row items-start gap-8 md:gap-12 lg:gap-16">
              {/* English Content - LEFT side of text block */}
              <div className="max-w-[521px] text-left">
                <h1 className="text-3xl sm:text-4xl md:text-[48px] font-bold font-playfair text-white md:leading-[3rem] tracking-[0.02em]">
                  {heroTitleLines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < heroTitleLines.length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <p className="text-lg sm:text-xl md:text-[24px] font-poppins font-medium text-white mt-4 leading-[1.22] tracking-[0.01em]">
                  {heroSubtitle}
                </p>
                <div
                  className="my-6 mx-auto"
                  style={{
                    width: '101px',
                    height: '6px',
                    backgroundColor: '#FF4040'
                  }}
                />
                <p className="text-sm sm:text-base md:text-[16px] font-poppins font-normal text-white leading-[1.44] tracking-[0.02em] max-w-[497px]">
                  {heroDescription}
                </p>
              </div>

              {/* Japanese Text (Vertical) - RIGHT side of text block */}
              <div className="hidden md:flex flex-row gap-2 lg:gap-4">
                <div className="writing-vertical-rl text-white font-zen-old-mincho text-[32px] leading-[1.1] tracking-[0.01em]">
                  {heroJapanese1}
                </div>
                <div className="writing-vertical-rl text-white font-zen-old-mincho text-[64px] leading-[1.1] tracking-[0.01em]">
                  {heroJapanese2}
                </div>
                <div className="writing-vertical-rl text-white font-zen-old-mincho text-[64px] leading-[1.1] tracking-[0.01em]">
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
                  className="object-cover rounded-md"
                />
              </div>
              <div className="relative flex-1 aspect-[4/3] max-w-[220px]">
                <Image
                  src="/ourrooms/layout-thumb-2.png"
                  alt="Floor Plan View 2"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="relative flex-1 aspect-square max-w-[180px]">
                <Image
                  src="/ourrooms/layout-thumb-3.png"
                  alt="Floor Plan View 3"
                  fill
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
            {rooms.map((room, index) =>
              index === 0 || index === 1 || index === 2 ? (
                <VIPRoomCard
                  key={index}
                  title={room.title}
                  capacity={room.capacity}
                  description={room.description}
                  images={room.images}
                  tagline1={room.tagline1}
                  tagline2={room.tagline2}
                  buttonText={room.buttonText}
                />
              ) : (
                <RoomCard
                  key={index}
                  title={room.title}
                  capacity={room.capacity}
                  description={room.description}
                  images={room.images}
                  tagline1={room.tagline1}
                  tagline2={room.tagline2}
                  buttonText={room.buttonText}
                  reverse={index % 2 === 1}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
