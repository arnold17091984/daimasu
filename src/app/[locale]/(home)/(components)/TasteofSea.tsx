import {Button} from '@/components/ui/button';
import {shippori} from '@/lib/fonts';
import {cn} from '@/lib/utils';
import {useTranslations} from 'next-intl';
import Image from 'next/image';

export default function TasteofSea() {
  const t = useTranslations();

  return (
    <section className="relative w-full bg-white pt-0 px-4 flex flex-col items-center bg-[url(/triangle-vector.svg)] overflow-visible bg-bottom pb-[520px] bg-no-repeat">
      {/* Unified Arc + Title + Sushi */}
      <div className="relative w-full max-w-[1440px] flex items-start justify-center">
        {/* Arc Background */}
        {/* <Image
          src="/taste-of-sea-arc.webp"
          alt="Arc background"
          fill
          className="object-contain"
          priority
        /> */}

        <div className="z-30 transition-transform duration-300 ease-in-out relative overflow-visible">
          <Image
            src="/taste-of-the-sea.png"
            alt="Sushi Dish"
            width={896}
            height={597}
            className="w-full h-auto drop-shadow-2xl max-w-[750px]"
            priority
          />
          {/* <div className="absolute inset-0 z-10 bg-[url(/triangle-vector.svg)] -z-1 overflow-visible" /> */}

          <section className="z-20 w-full h-full flex flex-col items-center mt-5 text-black absolute translate-x-[50%] -left-[25%]">
            <div className="mx-auto w-full flex flex-col items-center">
              <h2 className="text-4xl font-bold text-center leading-tight font-shippori">
                {t('our_location')}
              </h2>

              <p className="text-foreground text-xl text-center tracking-wide leading-tight font-shippori">
                ご来店を心よりお待ちしております
              </p>

              {/* Google Map Embed */}
              <div className="relative mt-6 sm:mt-12 w-[90%] max-w-xl aspect-[2/1] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps?q=ALLEGRO+CENTER+ON,+2284+Chino+Roces+Avenue,+Makati+City&output=embed"
                  width="100%"
                  height="100%"
                  style={{border: 0}}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Daimasu Place Map"
                ></iframe>
              </div>
            </div>
          </section>
        </div>

        <div className="flex gap-8 max-w-[500px] mt-20">
          <p
            className={cn(
              'text-foreground text-5xl font-semibold w-[48px] whitespace-pre-wrap',
              shippori.className
            )}
          >
            海の味わい
          </p>
          <div className="flex flex-col gap-6">
            <p>
              Discover the pure, vibrant flavors of the ocean. From fresh
              sashimi to grilled seafood favorites, each dish is crafted to
              showcase the sea’s natural bounty with balance and care.
            </p>
            <div className="flex gap-2 items-center">
              <Button>Our Menu</Button>
              <Button variant="secondary" className="text-white">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <p className="mt-16 sm:mt-40 text-center px-4 leading-[1.8] tracking-[0.02em] text-black text-[14px] sm:text-[18px] md:text-[18px] max-w-[737px] font-shippori">
        {t('authentic_japanese_coastal_cuisine')}
      </p>

      {/* Menu / Tables Cards */}
      {/* <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 px-2 w-full max-w-[1180px]">
        {[
          {
            label: t('our_menu'),
            image: '/our-menu.webp',
            button: t('explore')
          },
          {
            label: t('our_tables'),
            image: '/our-room.jpg',
            button: t('reserve')
          }
        ].map((card, idx) => (
          <div
            key={idx}
            className="relative w-full sm:w-[48%] max-w-[568px] h-[235px] rounded-xl overflow-hidden shadow-md group"
          >
            <div className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-105">
              <Image
                src={card.image}
                alt={`${card.label} Background`}
                fill
                className="object-cover"
              />
            </div>

            <div className="relative z-10 h-full w-full bg-[rgba(0,0,0,0.55)] flex flex-col items-center justify-center text-white">
              <p className="text-[14px] sm:text-[18px] md:text-[18px] font-bold font-shippori">
                {card.label}
              </p>
              <button className="mt-3 bg-[#FCB543] hover:bg-[#e8a130] text-white text-[12px] sm:text-[14px] md:text-[16px] font-extrabold py-2 px-6 rounded-md shadow-md font-poppins">
                {card.button}
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </section>
  );
}
