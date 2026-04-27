'use client';
import Image from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {useTranslations} from 'next-intl';

export default function TatlerDiningAndTasteBeyond() {
  const t = useTranslations();

  return (
    <>
      <section className="w-full pt-0 sm:pt-0 px-4 flex justify-center items-center relative bg-white">
        {/* Overlapping Awards Image (Responsive Position) */}
        <div className="w-full max-w-[1440px] px-4">
          <Image
            src="/award-image.png"
            alt="Tatler Awards Group"
            width={900}
            height={300}
            className="h-auto block mx-auto"
            priority
          />
        </div>
      </section>

      {/* <section className="relative w-full pt-[100px] sm:pt-[200px] pb-12 sm:pb-16 z-[1]">
        <div className="text-center mb-6 sm:mb-9 px-4">
          <h2 className="text-[16px] sm:text-[18px] md:texts-[18px] font-extrabold tracking-[0.02em] text-[#00000082] font-shippori leading-[1.1]">
            {t('a_taste_beyond_waves')}
          </h2>
        </div>

        <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 bg-gradient-to-b from-gray-100 to-white rounded-xl shadow-inner">
          <button className="custom-prev absolute top-1/2 -translate-y-1/2 left-1 sm:-left-6 md:-left-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-md transition z-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="custom-next absolute top-1/2 -translate-y-1/2 right-1 sm:-right-6 md:-right-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-md transition z-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={12}
            slidesPerView={3}
            breakpoints={{
              768: {slidesPerView: 4},
              1024: {slidesPerView: 6}
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev'
            }}
            className="!pb-10"
          >
            {[
              '/carousel-1.webp',
              '/carousel-2.webp',
              '/carousel-3.webp',
              '/carousel-4.webp',
              '/carousel-5.webp',
              '/carousel-6.webp'
            ].map((src, idx) => (
              <SwiperSlide
                key={idx}
                className="rounded-md overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={src}
                  alt={`Carousel ${idx + 1}`}
                  width={200}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section> */}
    </>
  );
}
