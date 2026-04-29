'use client';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import {buttonVariants} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';
import type {LinkHref} from '@/lib/typed-link';
import {cn} from '@/lib/utils';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {useState} from 'react';
import {Menu, X} from 'lucide-react';

type NavLink = {
  key: 'home' | 'menu' | 'rooms' | 'about_us' | 'contact';
  href: string;
};

const navLinks: NavLink[] = [
  {key: 'home', href: '/'},
  {key: 'menu', href: '/our-menu'},
  {key: 'rooms', href: '/our-rooms'},
  {key: 'about_us', href: '/about-us'},
  {key: 'contact', href: '#footer'}
];

export default function Header() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-6 lg:py-8 px-4 md:px-8 lg:px-12 xl:px-16">
      <div className="flex items-center justify-between gap-6">
        {/* Left Section - Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Daimasu — home">
          <Image
            src="/homepage/daimasu-logo.svg"
            alt="Daimasu"
            width={410}
            height={84}
            className="h-12 md:h-14 lg:h-16 w-auto"
            priority
          />
        </Link>

        {/* Right Section - Navigation */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          {/* Nav Links */}
          <nav className="flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const className =
                'px-2 xl:px-3 py-2 text-white font-poppins font-bold text-sm leading-[1.09] tracking-[0.02em] hover:text-white/80 transition-colors whitespace-nowrap';
              return link.href.startsWith('#') ? (
                <a key={link.key} href={link.href} className={className}>
                  {t(link.key)}
                </a>
              ) : (
                <Link
                  key={link.key}
                  href={link.href as LinkHref}
                  className={className}
                >
                  {t(link.key)}
                </Link>
              );
            })}

            {/* Membership Button */}
            <Link
              href="/membership"
              className={cn(
                buttonVariants({variant: 'daimasu-orange', size: 'daimasu-sm'}),
                'text-xs ml-2'
              )}
            >
              {t('membership')}
            </Link>
          </nav>

          {/* Language Switcher */}
          <LanguageSwitcher className="ml-2" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm">
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => {
              const className =
                'px-4 py-3 text-white font-poppins font-bold text-base border-b border-white/10';
              const close = () => setIsMenuOpen(false);
              return link.href.startsWith('#') ? (
                <a
                  key={link.key}
                  href={link.href}
                  className={className}
                  onClick={close}
                >
                  {t(link.key)}
                </a>
              ) : (
                <Link
                  key={link.key}
                  href={link.href as LinkHref}
                  className={className}
                  onClick={close}
                >
                  {t(link.key)}
                </Link>
              );
            })}
            <Link
              href="/membership"
              className={cn(
                buttonVariants({variant: 'daimasu-orange', size: 'daimasu-md'}),
                'mt-4 text-center'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('membership')}
            </Link>
            <div className="mt-4 pt-4 border-t border-white/10">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
