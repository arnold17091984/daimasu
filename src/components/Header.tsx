'use client';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import {buttonVariants} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';
import type {LinkHref} from '@/lib/typed-link';
import {cn} from '@/lib/utils';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {useEffect, useState} from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Smooth-fade the header background once the user scrolls past the
  // hero seam. rAF keeps the work off the scroll-handler hot path.
  useEffect(() => {
    let frame = 0;
    const evaluate = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 32);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 xl:px-16',
        'transition-[padding,background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]',
        'border-b',
        isScrolled
          ? 'py-3 lg:py-4 bg-ink-900/85 backdrop-blur-md border-gold-500/25 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)]'
          : 'py-6 lg:py-8 bg-transparent border-transparent'
      )}
    >
      <div className="flex items-center justify-between gap-6">
        {/* Left Section - Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Daimasu — home">
          <Image
            src="/homepage/daimasu-logo.svg"
            alt="Daimasu"
            width={410}
            height={84}
            className={cn(
              'w-auto transition-[height] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]',
              isScrolled ? 'h-9 md:h-10 lg:h-11' : 'h-12 md:h-14 lg:h-16'
            )}
            priority
          />
        </Link>

        {/* Right Section - Navigation */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          {/* Nav Links */}
          <nav className="flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const className = cn(
                'relative px-2 xl:px-3 py-2 text-white font-poppins font-bold text-sm leading-[1.09] tracking-[0.02em] whitespace-nowrap transition-colors hover:text-gold-500',
                // Slide-in gold underline on hover
                'after:pointer-events-none after:absolute after:bottom-1 after:left-2 after:right-2 xl:after:left-3 xl:after:right-3 after:h-px after:bg-gold-500 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out'
              );
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
