import Image from 'next/image';
import {useTranslations} from 'next-intl';

function OurMenuHeader() {
  const t = useTranslations();

  return (
    <div className="relative w-full h-[340px] sm:h-[400px] md:h-[300px] text-white">
      <Image
        src="/aboutus/aboutus-cover.png"
        alt=""
        fill
        sizes="100vw"
        quality={70}
        priority
        className="object-cover"
      />
      {/* Dark overlay so the global Header logo at top stays legible */}
      <div className="absolute inset-0 bg-black/45 sm:bg-black/30" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-8 pt-24 sm:pt-12 pb-6">
        <div className="max-w-3xl w-full">
          {/* Decorative page banner — demoted to <h2> so the keyword-rich
              MenuView hero ("大枡 — 今月のお品書き") owns the single <h1>. */}
          <h2 className="text-[36px] sm:text-[64px] md:text-[80px] leading-none font-extrabold font-shippori text-white">
            {t('our_menu')}
          </h2>
          <p className="text-[13px] sm:text-[16px] md:text-[20px] leading-[150%] font-medium font-mplus mt-4 text-white/90">
            {t('enjoy_our_array_of')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurMenuHeader;
