import {FileText} from 'lucide-react';
import {getLocale, getTranslations} from 'next-intl/server';
import {buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {shippori} from '@/lib/fonts';
import {
  formatPrice,
  menu,
  type KaisekiCourse,
  type MenuCategory,
  type MenuItem
} from '../menu-data';

const RESERVE_HREF = 'https://m.me/daimasujapaneserestaurant';

export default async function MenuView() {
  const t = await getTranslations();
  const locale = await getLocale();
  const reservationNote =
    locale === 'ja' ? menu.reservation_note.jp : menu.reservation_note.en;

  return (
    <>
      <MenuHero pdfHref={menu.pdf} t={t} />

      <section
        id="kaiseki"
        className="bg-ink-900 text-washi-50 py-section-y-sm md:py-section-y px-4"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            kanji={t('menu_kaiseki_heading')}
            sub={t('menu_kaiseki_subheading')}
            tone="dark"
          />
          <p className="font-shippori text-center text-sm md:text-base text-washi-50/75 max-w-2xl mx-auto mt-6 leading-[1.9]">
            {t('menu_kaiseki_intro')}
          </p>

          <div className="mt-12 md:mt-16 grid gap-10 md:gap-14 md:grid-cols-2">
            {menu.kaiseki.map((course) => (
              <KaisekiCard
                key={course.id}
                course={course}
                locale={locale}
                courseLabel={t('menu_course_includes')}
                reserveLabel={t('menu_reserve_cta')}
              />
            ))}
          </div>

          <p className="font-shippori text-xs md:text-sm text-washi-50/60 text-center mt-10 leading-[1.8]">
            {reservationNote}
          </p>
        </div>
      </section>

      <section
        id="a-la-carte"
        className="bg-washi-50 text-ink-900 py-section-y-sm md:py-section-y px-4"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            kanji={t('menu_a_la_carte_heading')}
            sub="À la Carte"
            tone="light"
          />

          <div className="mt-12 md:mt-16 space-y-14 md:space-y-20">
            {menu.categories.map((category) => (
              <CategoryBlock
                key={category.id}
                category={category}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

type Translator = Awaited<ReturnType<typeof getTranslations>>;

function MenuHero({pdfHref, t}: {pdfHref: string; t: Translator}) {
  return (
    <section className="bg-washi-50 text-ink-900 py-section-y-sm md:py-section-y px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-gold-500 mb-6">
          {t('menu_hero_eyebrow')}
        </p>
        <h1
          className={cn(
            'text-3xl md:text-5xl leading-tight mb-8',
            shippori.className
          )}
        >
          {t('menu_hero_title')}
        </h1>
        <div aria-hidden className="mx-auto mb-8 h-px w-16 bg-gold-500" />
        <p className="font-shippori text-base md:text-lg leading-[1.9] text-ink-900/80 mb-10">
          {t('menu_hero_lead')}
        </p>
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({variant: 'daimasu-red', size: 'daimasu-lg'}),
            'gap-2'
          )}
        >
          <FileText className="size-4" aria-hidden />
          {t('menu_pdf_cta')}
        </a>
      </div>
    </section>
  );
}

function SectionHeading({
  kanji,
  sub,
  tone
}: {
  kanji: string;
  sub: string;
  tone: 'light' | 'dark';
}) {
  const eyebrowColor = tone === 'dark' ? 'text-gold-500' : 'text-gold-500';
  return (
    <div className="text-center">
      <p
        className={cn(
          'font-poppins text-[11px] tracking-[0.3em] uppercase mb-4',
          eyebrowColor
        )}
      >
        {sub}
      </p>
      <h2
        className={cn('text-3xl md:text-4xl leading-tight', shippori.className)}
      >
        {kanji}
      </h2>
      <div aria-hidden className="mx-auto mt-6 h-px w-12 bg-gold-500" />
    </div>
  );
}

function CategoryBlock({
  category,
  locale
}: {
  category: MenuCategory;
  locale: string;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-4 border-b border-ink-900/15 pb-4 mb-8">
        <h3
          className={cn(
            'text-2xl md:text-3xl text-ink-900',
            shippori.className
          )}
        >
          {category.kanji}
        </h3>
        <span className="font-poppins text-[11px] tracking-[0.3em] uppercase text-gold-500">
          {category.en}
        </span>
      </div>
      <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
        {category.items.map((item, i) => (
          <li key={`${category.id}-${i}`}>
            <ItemRow item={item} locale={locale} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ItemRow({item, locale}: {item: MenuItem; locale: string}) {
  const isJa = locale === 'ja';
  const primary = isJa ? item.jp : item.en;
  const secondary = isJa ? item.en : item.jp;
  return (
    <div className="flex items-baseline gap-4">
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-base md:text-lg text-ink-900 leading-snug',
            isJa && shippori.className
          )}
        >
          {primary}
        </p>
        {secondary && (
          <p
            className={cn(
              'text-xs md:text-sm text-ink-900/55 mt-1 leading-snug',
              !isJa && shippori.className
            )}
          >
            {secondary}
          </p>
        )}
        {item.description && (
          <p className="font-shippori text-xs md:text-sm text-ink-900/65 mt-2 leading-[1.7]">
            {item.description}
          </p>
        )}
      </div>
      <div
        aria-hidden
        className="hidden sm:block flex-1 mx-2 border-b border-dotted border-ink-900/20 translate-y-[-4px]"
      />
      <p className="font-poppins text-sm md:text-base text-ink-900 tabular-nums whitespace-nowrap">
        {formatPrice(item.price)}
      </p>
    </div>
  );
}

function KaisekiCard({
  course,
  locale,
  courseLabel,
  reserveLabel
}: {
  course: KaisekiCourse;
  locale: string;
  courseLabel: string;
  reserveLabel: string;
}) {
  const isJa = locale === 'ja';
  return (
    <article className="relative bg-ink-900 border border-gold-500/30 rounded-[2px] px-6 py-10 md:px-10 md:py-12 flex flex-col">
      <div
        aria-hidden
        className="absolute inset-x-6 top-3 h-px bg-gold-500/40"
      />
      <div
        aria-hidden
        className="absolute inset-x-6 bottom-3 h-px bg-gold-500/40"
      />

      <header className="text-center">
        <h3
          className={cn(
            'text-4xl md:text-5xl text-washi-50',
            shippori.className
          )}
        >
          {course.kanji}
        </h3>
        <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-gold-500 mt-3">
          {course.romaji}
        </p>
        <p className="font-poppins text-xl md:text-2xl text-washi-50 mt-4 tabular-nums">
          ₱{course.price.toLocaleString('en-US')}
        </p>
      </header>

      {course.composition && course.composition.length > 0 ? (
        <>
          <div className="my-8 flex items-center gap-3 text-gold-500/70">
            <div aria-hidden className="flex-1 h-px bg-gold-500/30" />
            <span className="font-poppins text-[10px] tracking-[0.3em] uppercase">
              {courseLabel}
            </span>
            <div aria-hidden className="flex-1 h-px bg-gold-500/30" />
          </div>
          <ol className="space-y-4 flex-1">
            {course.composition.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-poppins text-[10px] tracking-[0.25em] uppercase text-gold-500/70 mt-1 w-12 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      'text-sm md:text-base text-washi-50 leading-snug',
                      shippori.className
                    )}
                  >
                    {step.label_jp ? `${step.label_jp}：` : ''}
                    {isJa ? step.jp : step.en}
                  </p>
                  <p
                    className={cn(
                      'text-[11px] md:text-xs text-washi-50/55 mt-1 leading-snug',
                      isJa ? '' : shippori.className
                    )}
                  >
                    {isJa ? step.en : step.jp}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <div className="my-8 flex-1" />
      )}

      <div className="mt-10 text-center">
        <a
          href={RESERVE_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({variant: 'daimasu-orange', size: 'daimasu-md'})
          )}
        >
          {reserveLabel}
        </a>
      </div>
    </article>
  );
}
