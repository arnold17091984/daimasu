import React, {FC} from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import {useNavigationLinks} from './use-navigation-links';
import {shippori} from '@/lib/fonts';
import {cn} from '@/lib/utils';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {buttonVariants} from './ui/button';
import {useLocale} from 'next-intl';
import {useWindowSize} from '@uidotdev/usehooks';

interface IMobileNavigation {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const MobileNavigation: FC<IMobileNavigation> = ({isOpen, setIsOpen}) => {
  const {links} = useNavigationLinks();
  const pathname = usePathname();
  const locale = useLocale();
  const size = useWindowSize();
  const isMobile = (size?.width as number) <= 768;

  return (
    <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
      <SheetContent hideCloseButton side="top" className="bg-black">
        <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Select page where you want to navigate
        </SheetDescription>
        <nav
          className={cn(
            'flex flex-col items-center space-y-2 text-base tracking-wide text-center',
            shippori.className
          )}
        >
          {links.map((item) => {
            return (
              <div className="relative" key={item.value}>
                <Link
                  onClick={() => setIsOpen(false)}
                  href={item.value}
                  className={cn(
                    buttonVariants({variant: 'link'}),
                    'text-white hover:no-underline no-underline font-bold p-0 m-0 h-max px-2 py-1.5'
                  )}
                >
                  {item.label}
                </Link>
                {/* {pathname ===
                  `/${locale}${item.value === '/' ? '' : item.value}` && (
                  <div
                    className="absolute inset-0 h-[36px] bg-[#F7B93E] -z-[1] rounded-md"
                    // layoutId="underline"
                  ></div>
                )} */}
              </div>
            );
          })}

          {/* <LocaleSwitcher /> */}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
