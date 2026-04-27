import React from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

function OurMenuHeader() {
  const t = useTranslations();

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[300px] text-white">
      <Image
        src="/aboutus/aboutus-cover.png"
        alt="Rooms Cover"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 flex flex-col justify-start items-center text-left px-4 sm:px-8 pt-2 sm:pt-8 pb-4">
        <div className="flex flex-row items-start gap-10 max-w-5xl w-full">
          <Image
            src="/daimasu-logo.webp"
            alt="Daimasu Logo"
            width={160}
            height={160}
            className="mt-2 sm:mt-0"
          />
          <div className="flex-1 sm:-ml-4 mt-8 sm:mt-12">
            <h1 className="text-[28px] sm:text-[64px] md:text-[80px] leading-none font-extrabold font-shippori text-white">
              {t('our_menu')}
            </h1>
            <p className="text-[12px] sm:text-[16px] md:text-[20px] leading-[150%] font-medium font-mplus max-w-[1125px] mt-2 text-white">
              {t('enjoy_our_array_of')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurMenuHeader;
