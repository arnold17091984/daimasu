'use client';

import {buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type MembershipContent = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
};

type Props = {
  content?: MembershipContent;
};

export default function MembershipSection({content}: Props) {
  const title = content?.title || "More Than a Card.\nIt's an Invitation.";
  const description = content?.description || "A symbol of access to Daimasu's most sought-after experiences—priority reservations, exclusive privileges, and elevated dining moments reserved for members.";
  const buttonText = content?.buttonText || "Become a member";
  const buttonLink = content?.buttonLink || "#";

  // Split title into lines
  const titleLines = title.split('\n');

  return (
    <section
      id="membership"
      className="relative w-full min-h-[800px] lg:min-h-[1265px] bg-black overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/homepage/membership-bg.png"
          alt=""
          fill
          className="object-cover object-left"
        />
        {/* Dark Gradient Overlay - fades to black on the right */}
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-8 lg:px-0 h-full min-h-[800px] lg:min-h-[1265px] flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-end">
          <div className="lg:w-[600px] lg:mr-[149px] text-center lg:text-left">
            {/* Gold DAIMASU Logo */}
            <div className="relative w-[300px] lg:w-[426px] h-[180px] lg:h-[254px] mx-auto lg:mx-0 mb-8 lg:mb-12">
              <Image
                src="/homepage/daimasu-gold-logo.svg"
                alt="DAIMASU"
                fill
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h2 className="font-playfair font-bold text-xl md:text-2xl lg:text-4xl text-white leading-[1.23] tracking-[0.02em] mb-6">
              {titleLines.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>

            {/* Description */}
            <p className="text-white font-poppins text-base md:text-xl lg:text-[24px] leading-[1.44] tracking-[0.02em] mb-8 lg:mb-12">
              {description}
            </p>

            {/* CTA Button */}
            <div className='flex items-center'>
              <Link
                href={buttonLink}
                className={cn(
                  buttonVariants({variant: 'daimasu-red', size: 'daimasu-lg'}),
                  'w-max mx-auto'
                )}
              >
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
