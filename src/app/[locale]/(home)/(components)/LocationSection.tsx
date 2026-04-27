'use client';

import {buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';
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
  const title = content?.title || "Our Location";
  const address = content?.address || "Ground Floor Allegro Center,\nChino Roces Ave, Brgy Magallanes 1232";
  const contactNo = content?.contactNo || "0917 109 6032";
  const email = content?.email || "daimasumakati@gmail.com";
  const buttonText = content?.buttonText || "Reserve a Table";
  const buttonLink = content?.buttonLink || "https://m.me/DaimasuMakati";

  // Split address into lines
  const addressLines = address.split('\n');

  return (
    <section className="relative w-full min-h-[800px] lg:min-h-[1164px] bg-[#FFEFD3] overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0">
        <Image
          src="/homepage/tatler-texture-2.png"
          alt=""
          fill
          className="object-cover mix-blend-multiply opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[170px] py-16 lg:py-[170px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-[503px] text-center lg:text-left lg:pt-[199px]">
            {/* Title */}
            <h2 className="font-playfair font-bold text-3xl md:text-[40px] text-black leading-[1.97] tracking-[0.02em] mb-4">
              {title}
            </h2>

            {/* Address */}
            <div className="text-black font-poppins text-base md:text-xl lg:text-[24px] leading-[1.25] tracking-[0.02em] space-y-4 mb-8 lg:mb-12">
              <p>
                Address:
                <br />
                {addressLines.map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < addressLines.length - 1 && <br />}
                  </span>
                ))}
              </p>

              <p>Contact No.: {contactNo}</p>

              <p>Email: {email}</p>
            </div>

            {/* CTA Button */}
            <Link
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({variant: 'daimasu-red', size: 'daimasu-lg'}),
                'w-max h-[60px]'
              )}
            >
              {buttonText}
            </Link>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[871px] aspect-[871/824]">
            <div className="relative w-full h-full rounded-[10px] overflow-hidden border-[10px] border-white shadow-lg">
              <Image
                src="/homepage/location-image.png"
                alt="Daimasu Location Map"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
