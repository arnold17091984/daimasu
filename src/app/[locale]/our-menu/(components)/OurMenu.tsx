'use client';

import {ItemSet, ItemType} from '@/app/types';
import {cn} from '@/lib/utils';
import {shippori} from '@/lib/fonts';
import {useTranslations} from 'next-intl';
import {useMenuQueries} from './OurMenuQueries';
import OurMenuGrid from './OurMenuGrid';
import {Button} from '@/components/ui/button';

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

  // When the upstream menu API is unreachable (e.g. env vars not configured)
  // the page would otherwise render a broken sidebar with no items. Surface a
  // calm empty state under the localised header instead.
  if (sets.length === 0 && types.length === 0) {
    return (
      <section className="text-white py-16 min-h-[400px] max-w-[1440px] w-full mx-auto px-4 text-center">
        <h1
          className={cn('text-[2.5rem] mb-6 antialiased', shippori.className)}
        >
          {t('daimasu_specials')}
        </h1>
        <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto">
          {t('enjoy_our_array_of')}
        </p>
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
                setName === item?.name && 'bg-[#FFB548] text-black'
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
                  typeName === item?.name && 'bg-[#FFB548] text-black'
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
