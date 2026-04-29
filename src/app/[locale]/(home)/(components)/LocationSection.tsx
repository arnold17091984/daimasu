'use client';

import {buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type LocationContent = {
  title?: string;
  address?: string;
  contactNo?: string;
  email?: string;
  buttonText?: string;
  buttonLink?: string;
};

type Props = {
  content?: LocationContent;
};

export default function LocationSection({content}: Props) {
  const t = useTranslations();
  const useCms = useLocale() === 'en';

  const title = (useCms && content?.title) || t('our_location');
  const address =
    (useCms && content?.address) ||
    `${t('location_address_line_1')}\n${t('location_address_line_2')}`;
  const contactNo = content?.contactNo || '0917 109 6032';
  const email = content?.email || 'daimasumakati@gmail.com';
  const buttonText = (useCms && content?.buttonText) || t('location_button');
  const buttonLink = content?.buttonLink || 'https://m.me/DaimasuMakati';

  // Split address into lines
  const addressLines = address.split('\n');

  return (
    <section className="relative w-full bg-washi-50 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0">
        <Image
          src="/homepage/tatler-texture-2.png"
          alt=""
          fill
          sizes="100vw"
          quality={50}
          className="object-cover mix-blend-multiply opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-[420px] flex-shrink-0 text-center lg:text-left">
            <h2 className="font-playfair font-bold text-3xl md:text-[40px] text-black leading-tight tracking-[0.02em] mb-6">
              {title}
            </h2>

            <div className="text-black font-poppins text-base md:text-lg lg:text-xl leading-[1.5] tracking-[0.02em] space-y-4 mb-8">
              <p>
                <span className="font-semibold">
                  {t('location_address_label')}
                </span>
                <br />
                {addressLines.map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {line}
                    {index < addressLines.length - 1 && <br />}
                  </span>
                ))}
              </p>

              <p>
                <span className="font-semibold">
                  {t('location_contact_label')}
                </span>{' '}
                {contactNo}
              </p>

              <p>
                <span className="font-semibold">
                  {t('location_email_label')}
                </span>{' '}
                <a
                  href={`mailto:${email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {email}
                </a>
              </p>
            </div>

            <Link
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({variant: 'daimasu-red', size: 'daimasu-lg'}),
                'inline-flex w-max h-[60px]'
              )}
            >
              {buttonText}
            </Link>
          </div>

          {/* Right Image */}
          <div className="w-full lg:flex-1 aspect-[871/660] lg:aspect-[871/600] max-w-[871px]">
            <div className="relative w-full h-full rounded-[10px] overflow-hidden border-[10px] border-white shadow-lg">
              <Image
                src="/homepage/location-image.png"
                alt="Daimasu Location Map"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 871px, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
