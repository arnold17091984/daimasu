import {inter, shippori} from '@/lib/fonts';
import {cn} from '@/lib/utils';
import {useTranslations} from 'next-intl';
import Image from 'next/image';

export default function OmotenashiSection() {
  const t = useTranslations();

  return (
    <section className="bg-white px-3 sm:px-4 flex justify-center">
      <div className="max-w-[1440px] w-full flex flex-col items-center text-center py-5">
        {/* Japanese Heading */}
        <h2
          className={cn(
            'text-lg sm:text-[18px] md:text-4xl font-bold leading-[1.4] tracking-[0.02em] text-foreground font-shippori mt-3 sm:mt-4',
            shippori.className
          )}
        >
          おもてなし
        </h2>

        {/* English Subheading */}
        <p
          className={cn(
            'mt-1 max-w-[90%] sm:max-w-[908px] px-2 text-black text-[14px] sm:text-[18px] md:text-[18px] leading-[1.4] tracking-[0.02em] font-shippori font-normal',
            shippori.className
          )}
        >
          {t('at_the_restaurant')}
        </p>

        {/* Image Row */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center w-full px-2">
          {/* Image 1 */}
          <div className="transition-transform duration-300 transform hover:scale-105 w-[160px] sm:w-[220px] md:w-[240px] lg:w-[260px]">
            <Image
              src="/omotenashi1.webp"
              alt="Dish Image"
              width={400}
              height={400}
              className="rounded-xl object-cover w-full h-auto"
              priority
            />
          </div>

          {/* Image 2 */}
          <div className="transition-transform duration-300 transform scale-105 hover:scale-110 w-[180px] sm:w-[240px] md:w-[260px] lg:w-[280px]">
            <Image
              src="/omotenashi2.webp"
              alt="Restaurant Interior"
              width={400}
              height={400}
              className="rounded-xl object-cover w-full h-auto"
              priority
            />
          </div>

          {/* Image 3 */}
          <div className="transition-transform duration-300 transform hover:scale-105 w-[160px] sm:w-[220px] md:w-[240px] lg:w-[260px]">
            <Image
              src="/omotenashi3.webp"
              alt="Fresh Fish"
              width={400}
              height={400}
              className="rounded-xl object-cover w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Descriptive Paragraph */}
        <div className={cn('px-3 text-center mt-5 mb-4', inter.className)}>
          <p className="text-[12px] sm:text-[18px] md:text-[18px] leading-[1.7] tracking-[0.02em] font-poppins text-black max-w-[95%] sm:max-w-[1019px] mx-auto font-normal">
            {t('at_the_restaurant')} {t('with_this_in_mind')}{' '}
            {t('the_concept_of_omotenashi')}
          </p>
        </div>
      </div>
    </section>
  );
}
