'use client';

import {buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type GrabFoodContent = {
  title?: string;
  buttonText?: string;
  buttonLink?: string;
};

type Props = {
  content?: GrabFoodContent;
};

export default function GrabFoodSection({content}: Props) {
  const t = useTranslations();
  const useCms = useLocale() === 'en';

  const title = (useCms && content?.title) || t('grabfood_title');
  const buttonText = (useCms && content?.buttonText) || t('grabfood_button');
  const buttonLink =
    content?.buttonLink ||
    'https://r.grab.com/g/6-20260123_182251_91230EF135F3447384D50AE00F339011_MEXMPS-2-C7VDEBXXTJD1G2';

  return (
    <section className="relative w-full min-h-[400px] md:min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/homepage/grabfood-bg.png"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="max-w-xl flex flex-col items-center">
          {/* Title */}
          <h2 className="font-shippori font-bold text-4xl md:text-6xl text-white leading-tight mb-6 break-keep-all">
            {title}
          </h2>

          {/* GrabFood Logo */}
          <div className="mb-8">
            <Image
              src="/homepage/grabfood-logo.png"
              alt="GrabFood"
              width={500}
              height={100}
              className="h-16 md:h-24 w-auto"
            />
          </div>

          {/* CTA Button */}
          <Link
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({variant: 'daimasu-red', size: 'daimasu-lg'})
            )}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
