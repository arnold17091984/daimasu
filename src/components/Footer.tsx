'use client';

import {buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {FaFacebookF, FaInstagram} from 'react-icons/fa';

type FooterProps = {
  content: {
    hours: {
      line1: string;
      line2: string;
    };
    contactButton: {
      text: string;
      link: string | null;
    };
    socialLinks: {
      facebookUrl: string | null;
      instagramUrl: string | null;
    };
    copyright: string;
  } | null;
};

export default function Footer({content}: FooterProps) {
  const t = useTranslations();
  const useCms = useLocale() === 'en';

  const hours =
    useCms && content?.hours
      ? content.hours
      : {line1: t('footer_hours_line_1'), line2: t('footer_hours_line_2')};
  const contactButton =
    useCms && content?.contactButton
      ? content.contactButton
      : {
          text: t('contact_us'),
          link: content?.contactButton?.link ?? 'https://m.me/DaimasuMakati'
        };
  const socialLinks = content?.socialLinks ?? {
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com'
  };
  const copyright = (useCms && content?.copyright) || t('footer_copyright');

  return (
    <footer
      id="footer"
      className="relative w-full bg-black overflow-hidden flex-shrink-0"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/homepage/footer-bg.png"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1072px] mx-auto px-4 md:px-8 py-4 lg:py-12">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="relative w-[200px] md:w-[250px] lg:w-[284px] h-[230px] md:h-[290px] lg:h-[330px] mb-8">
            <Image
              src="/homepage/footer-logo.svg"
              alt="Daimasu"
              fill
              sizes="(min-width: 1024px) 284px, (min-width: 768px) 250px, 200px"
              className="object-contain"
            />
          </div>

          {/* Hours */}
          <div className="text-white/80 font-poppins text-lg md:text-xl lg:text-[24px] leading-[1.71] text-center mb-8">
            <p>{hours.line1}</p>
            <p>{hours.line2}</p>
          </div>

          {/* Contact Button */}
          {contactButton.link && (
            <Link
              href={contactButton.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({variant: 'daimasu-red', size: 'daimasu-lg'}),
                'w-max mb-12'
              )}
            >
              {contactButton.text}
            </Link>
          )}

          {/* Divider */}
          <div className="w-full max-w-[1072px] h-px bg-[#0A142F]/10 mb-8" />

          {/* Social Icons */}
          <div className="flex gap-6 mb-8">
            {socialLinks.facebookUrl && (
              <a
                href={socialLinks.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[45px] h-[45px] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
            )}
            {socialLinks.instagramUrl && (
              <a
                href={socialLinks.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[45px] h-[45px] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            )}
          </div>

          {/* Copyright */}
          <p className="text-white/80 font-mplus text-sm leading-[1.49] text-center">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
