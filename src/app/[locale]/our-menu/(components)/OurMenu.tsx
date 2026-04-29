'use client';

import {ItemSet, ItemType} from '@/app/types';
import {cn} from '@/lib/utils';
import {shippori} from '@/lib/fonts';
import {useTranslations} from 'next-intl';
import {useMenuQueries} from './OurMenuQueries';
import OurMenuGrid from './OurMenuGrid';
import {Button, buttonVariants} from '@/components/ui/button';

export default function OurMenu({
  sets,
  types
}: {
  sets: ItemSet[];
  types: ItemType[];
}) {
  const t = useTranslations();
  const {
    setSetName,
    setName,
    typeName,
    setTypeName,
    isAnyFilterActive,
    resetFilters
  } = useMenuQueries();

  // Phase 2.3 — Daimasu does not publish a fixed menu. Each evening the
  // chef builds a course around the day's catch + season; this page is the
  // "Reservations open the menu" message rather than a list of items. The
  // condition (no items + no types) covers both the no-CMS dev path and
  // the production reality that there is intentionally no item catalogue.
  if (sets.length === 0 && types.length === 0) {
    return (
      <section className="bg-washi-50 py-section-y-sm md:py-section-y px-4 min-h-[60vh] flex items-center">
        <div className="max-w-reading mx-auto text-center text-ink-900">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-gold-500 mb-6">
            {t('our_menu')}
          </p>
          <h1
            className={cn(
              'font-playfair text-3xl md:text-5xl mb-8 leading-tight',
              shippori.className
            )}
          >
            {t('menu_interim_title')}
          </h1>
          <div
            aria-hidden="true"
            className="mx-auto mb-8 h-px w-16 bg-gold-500"
          />
          <p className="font-shippori text-base md:text-lg leading-[1.8] text-ink-900/80 mb-10">
            {t('menu_interim_body')}
          </p>
          {/* Reservation entry point. Phase 3 will swap this for a real
              deposit-holding booking flow; until then the rest of the
              site treats Messenger as the booking surface, so we match. */}
          <a
            href="https://m.me/daimasujapaneserestaurant"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({variant: 'daimasu-red', size: 'daimasu-lg'})
            )}
          >
            {t('menu_interim_cta')}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="text-white py-10 min-h-[400px] max-w-[1440px] w-full mx-auto ">
      <h1
        className={cn(
          'text-center text-[2.5rem] mb-8 antialiased',
          shippori.className
        )}
      >
        {t('daimasu_specials')}
      </h1>
      <div className="mx-auto flex flex-col md:flex-row gap-8 px-4">
        {/* Left Navigation (Sets) */}
        <aside className="md:w-[200px] flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:sticky md:top-20">
          {sets.map((item: ItemSet) => (
            <Button
              variant="menu_filter"
              key={item?.id}
              className={cn(
                `px-4 rounded-md text-xs sm:text-sm md:text-base transition min-w-[100px] sm:min-w-[120px] md:min-w-full`,
                setName === item?.name && 'bg-gold-500 text-ink-900'
              )}
              onClick={() => setSetName(item?.name)}
            >
              {item.name}
            </Button>
          ))}
        </aside>

        {/* Right Content */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-6">
            {types.map((item: ItemType) => (
              <Button
                variant="menu_filter"
                key={item?.id}
                className={cn(
                  `px-5 rounded-md text-xs sm:text-sm md:text-base font-medium transition`,
                  typeName === item?.name && 'bg-gold-500 text-ink-900'
                )}
                onClick={() => setTypeName(item?.name)}
              >
                {item.name}
              </Button>
            ))}
            {isAnyFilterActive && (
              <Button
                variant="menu_filter"
                className="px-4"
                onClick={resetFilters}
              >
                {t('reset_filter')}
              </Button>
            )}
          </div>

          <OurMenuGrid />
        </div>
      </div>
    </section>
  );
}
