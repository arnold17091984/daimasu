'use client';

import {useState} from 'react';
import {Menu, X} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';
import {motion} from 'motion/react';
import Link from 'next/link';
import {buttonVariants} from './ui/button';
import {shippori} from '@/lib/fonts';
import MobileNavigation from './MobileNavigation';
import {useNavigationLinks} from './use-navigation-links';

export default function TopBanner() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();

  const {links} = useNavigationLinks();

  return (
    <header className="sticky top-0 z-50 bg-[#E9D0A7] w-full font-shippori">
      <div className="max-w-[2545px] mx-auto flex justify-between sm:justify-center items-center h-[61px] px-4 sm:px-6">
        <div className="text-lg font-bold sm:hidden">Daimasu</div>

        <nav
          className={cn(
            'hidden sm:flex items-center space-x-12 text-base tracking-wide text-center',
            shippori.className
          )}
        >
          {links.map((item) => {
            return (
              <div className="relative" key={item.value}>
                <Link
                  href={item.value}
                  className={cn(
                    buttonVariants({variant: 'link'}),
                    'text-black hover:no-underline no-underline font-bold p-0 m-0 h-max px-2 py-1.5'
                  )}
                >
                  {item.label}
                </Link>
                {pathname ===
                  `/${locale}${item.value === '/' ? '' : item.value}` && (
                  <div
                    className="absolute inset-0 h-[36px] bg-[#F7B93E] -z-[1] rounded-md"
                    // layoutId="underline"
                  ></div>
                )}
              </div>
            );
          })}

          <LocaleSwitcher />
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
}
