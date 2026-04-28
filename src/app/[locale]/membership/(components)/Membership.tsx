'use client';

import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {cn} from '@/lib/utils';
import {buttonVariants} from '@/components/ui/button';
import {
  CalendarCheck,
  Car,
  ChefHat,
  Check,
  Minus,
  Users,
  Wine
} from 'lucide-react';

type MembershipContent = {
  hero?: {
    title?: string;
    subtitle?: string;
    description?: string;
    registerButtonText?: string;
    registerButtonLink?: string | null;
    benefitsButtonText?: string;
    benefitsButtonLink?: string | null;
    japaneseText1?: string;
    japaneseText2?: string;
    japaneseText3?: string;
    japaneseText4?: string;
    japaneseText5?: string;
  };
  programConcept?: {
    title?: string;
    description?: string;
  };
};

type Props = {
  content?: MembershipContent | null;
};

const REGISTER_LINK = 'https://m.me/daimasujapaneserestaurant';

const COMPARISON_ROWS: Array<{
  labelKey: string;
  noteKey?: string;
  values: [React.ReactNode, React.ReactNode, React.ReactNode];
  highlight?: boolean;
}> = [
  // Pricing block
  {
    labelKey: 'tier_total_price',
    values: ['PHP 130,000', 'PHP 250,000', 'PHP 500,000'],
    highlight: true
  },
  {
    labelKey: 'tier_annual_fees',
    values: ['PHP 30,000', 'PHP 50,000', 'PHP 100,000']
  },
  {
    labelKey: 'tier_deposit',
    values: ['PHP 100,000', 'PHP 200,000', 'PHP 400,000']
  },
  {labelKey: 'tier_bonus', values: ['10%', '15%', '20%']},
  {
    labelKey: 'tier_total_balance',
    values: ['PHP 110,000', 'PHP 230,000', 'PHP 480,000'],
    highlight: true
  },
  {
    labelKey: 'tier_dining_discount',
    noteKey: 'tier_dining_discount_note',
    values: ['10% OFF', '13% OFF', '15% OFF']
  },
  // Benefit block
  {labelKey: 'tier_priority_reservation_perm', values: [true, true, true]},
  {labelKey: 'tier_free_private_room', values: [true, true, true]},
  {
    labelKey: 'tier_chefs_special_birthday',
    values: [false, false, true]
  },
  {
    labelKey: 'tier_pair_omakase_birthday',
    values: [true, true, false]
  },
  {
    labelKey: 'tier_seasonal_tasting',
    values: ['tier_seasonal_2x', 'tier_seasonal_2x', 'tier_seasonal_4x']
  },
  {
    labelKey: 'tier_free_bottle_keep',
    values: ['tier_bottle_1', 'tier_bottle_1', 'tier_bottle_2']
  },
  {labelKey: 'tier_chef_consultation', values: [true, true, true]},
  {labelKey: 'tier_priority_chef', values: [false, false, true]},
  {labelKey: 'tier_chauffeur', values: [false, false, true]}
];

const VIP_CARDS: Array<{
  Icon: React.ElementType;
  titleKey: string;
  descKey: string;
}> = [
  {
    Icon: ChefHat,
    titleKey: 'card_chefs_special_title',
    descKey: 'card_chefs_special_desc'
  },
  {
    Icon: CalendarCheck,
    titleKey: 'card_priority_reservation_title',
    descKey: 'card_priority_reservation_desc'
  },
  {
    Icon: Wine,
    titleKey: 'card_bottle_keep_title',
    descKey: 'card_bottle_keep_desc'
  },
  {Icon: Car, titleKey: 'card_chauffeur_title', descKey: 'card_chauffeur_desc'}
];

// Decorative wrapper that re-uses the kamon stamp motif
function KamonSeal({
  size = 80,
  className = ''
}: Readonly<{size?: number; className?: string}>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-gold/30',
        className
      )}
      style={{width: size, height: size}}
    >
      <span
        className="font-zen-old-mincho text-gold/60"
        style={{fontSize: Math.round(size * 0.4)}}
      >
        大
      </span>
    </div>
  );
}

function BrushDivider() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 12"
      className="mx-auto w-[260px] opacity-40"
      fill="none"
    >
      <path
        d="M4 6 Q80 2 160 6 Q240 10 316 6"
        stroke="#8A7A5A"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CellValue({
  v,
  isToku,
  t
}: Readonly<{
  v: React.ReactNode;
  isToku: boolean;
  t: ReturnType<typeof useTranslations>;
}>) {
  if (v === true) {
    return (
      <Check className="w-4 h-4 mx-auto text-[#C66600]" aria-label="included" />
    );
  }
  if (v === false) {
    return (
      <Minus
        className="w-4 h-4 mx-auto text-white/15"
        aria-label="not included"
      />
    );
  }
  if (typeof v === 'string' && v.startsWith('tier_')) {
    return (
      <span className={isToku ? 'text-gold/80' : 'text-white/75'}>{t(v)}</span>
    );
  }
  return <span className={isToku ? 'text-gold/80' : 'text-white/75'}>{v}</span>;
}

export default function Membership({content}: Readonly<Props>) {
  const t = useTranslations();
  const useCms = useLocale() === 'en';

  // Hero
  const heroTitle =
    (useCms && content?.hero?.title) ||
    `${t('membership_page_hero_title_line_1')}\n${t('membership_page_hero_title_line_2')}`;
  const heroSubtitle =
    (useCms && content?.hero?.subtitle) || t('membership_page_hero_subtitle');
  const heroDescription =
    (useCms && content?.hero?.description) ||
    t('membership_page_hero_description');
  const registerButtonText =
    (useCms && content?.hero?.registerButtonText) || t('register_now');
  const registerButtonLink = content?.hero?.registerButtonLink || REGISTER_LINK;
  const benefitsButtonText =
    (useCms && content?.hero?.benefitsButtonText) || t('view_benefits');
  const benefitsButtonLink = content?.hero?.benefitsButtonLink || '#tiers';

  // Vertical Japanese accents
  const japaneseText1 = content?.hero?.japaneseText1 || 'あなたの第二の食卓';
  const japaneseText2 =
    content?.hero?.japaneseText2 || '会員だけの特別な時間、';
  const japaneseText3 = content?.hero?.japaneseText3 || '旬の料理とともに。';
  const japaneseText4 = content?.hero?.japaneseText4 || '日本料理の静かな旅。';
  const japaneseText5 = content?.hero?.japaneseText5 || '二度、記憶に残る。';

  // Concept
  const programConceptTitle =
    (useCms && content?.programConcept?.title) ||
    `${t('program_concept_title_line_1')}\n${t('program_concept_title_line_2')}`;
  const programConceptDescription =
    (useCms && content?.programConcept?.description) ||
    t('program_concept_description');

  const titleLines = heroTitle.split('\n');
  const programTitleLines = programConceptTitle.split('\n');

  return (
    <article className="bg-[#0A0A0A] text-white w-full">
      {/* ===================================================
          1. HERO
      =================================================== */}
      <section className="relative w-full min-h-[100svh] flex items-end overflow-hidden">
        <Image
          src="/membership/membership-hero-273bf1.png"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.72) 70%, rgba(0,0,0,0.95) 100%)'
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0A0A0A]"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pb-24 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div className="max-w-[640px]">
              <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
                {t('membership_eyebrow')}
              </p>
              <h1 className="font-playfair font-bold text-[40px] sm:text-[56px] lg:text-[68px] leading-[1.05] tracking-tight break-keep-all">
                {titleLines.map((line, i) => (
                  <span key={`${line}-${i}`} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <div className="my-8 h-px w-10 bg-gold" aria-hidden="true" />
              <p className="font-shippori text-[18px] lg:text-[20px] text-white/85 leading-[1.6] mb-5">
                {heroSubtitle}
              </p>
              <p className="font-poppins text-[14px] lg:text-[15px] text-white/55 leading-[1.7] max-w-[480px] mb-10">
                {heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={registerButtonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-daimasu-red hover:bg-daimasu-red/90 text-white font-poppins font-semibold text-[14px] tracking-[0.08em] uppercase px-10 h-[52px] rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                >
                  {registerButtonText}
                </a>
                <a
                  href={benefitsButtonLink}
                  className="inline-flex items-center justify-center border border-gold/70 text-gold hover:bg-gold/10 font-poppins font-semibold text-[14px] tracking-[0.08em] uppercase px-10 h-[52px] rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                >
                  {benefitsButtonText}
                </a>
              </div>
            </div>

            {/* Vertical Japanese atmosphere */}
            <div
              aria-hidden="true"
              className="hidden lg:flex flex-row gap-3 items-start opacity-40 self-end"
            >
              {[
                {text: japaneseText2, size: 22},
                {text: japaneseText3, size: 22},
                {text: japaneseText4, size: 22},
                {text: japaneseText1, size: 30},
                {text: japaneseText5, size: 30}
              ].map((col) => (
                <div
                  key={col.text}
                  className="writing-vertical-rl text-white font-zen-old-mincho leading-[1.15] tracking-[0.05em]"
                  style={{fontSize: col.size}}
                >
                  {col.text}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <BrushDivider />
          </div>
        </div>
      </section>

      {/* ===================================================
          2. PROGRAM CONCEPT
      =================================================== */}
      <section className="relative bg-[#0A0A0A] bg-washi-grain py-24 lg:py-32 overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-center">
          <div>
            <p className="font-poppins text-[11px] tracking-[0.25em] uppercase text-gold mb-6">
              {t('concept_eyebrow')}
            </p>
            <h2 className="font-playfair font-bold text-[36px] sm:text-[44px] lg:text-[54px] leading-[1.15] tracking-tight">
              {programTitleLines.map((line, i) => (
                <span key={`${line}-${i}`} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-8 font-shippori text-[16px] lg:text-[17px] leading-[1.9] text-white/75 max-w-[520px] break-keep-all">
              {programConceptDescription}
            </p>
          </div>

          {/* Poem frame with kamon stamp */}
          <div className="relative w-full max-w-[360px] h-[440px] mx-auto bg-[#141414] border border-gold-muted/40 flex items-center justify-center">
            <div aria-hidden="true" className="absolute -top-6 -right-6">
              <KamonSeal size={56} className="bg-[#0A0A0A]" />
            </div>
            <div aria-hidden="true" className="flex flex-row gap-3 px-6">
              {[
                japaneseText1,
                japaneseText2,
                japaneseText3,
                japaneseText4,
                japaneseText5
              ].map((text, i) => (
                <div
                  key={`poem-${i}-${text.slice(0, 4)}`}
                  className="writing-vertical-rl font-zen-old-mincho text-[20px] text-white/70 leading-[1.2] tracking-[0.08em]"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          3A. TIER SHOWCASE CARDS
      =================================================== */}
      <section
        id="tiers"
        className="relative bg-[#0A0A0A] py-24 lg:py-32 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-[680px] mx-auto mb-16 lg:mb-20">
            <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-gold mb-5">
              {t('tier_eyebrow')}
            </p>
            <h2 className="font-playfair font-bold text-[40px] sm:text-[48px] lg:text-[60px] leading-[1.1] tracking-tight mb-5">
              {t('choose_tier_title')}
            </h2>
            <p className="font-poppins text-[15px] lg:text-[16px] text-white/55 leading-[1.7]">
              {t('choose_tier_subtitle_line_1')}
              <br className="hidden sm:inline" />{' '}
              {t('choose_tier_subtitle_line_2')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 pb-2">
            {/* ============= MATSU ============= */}
            <article className="relative bg-[#141414] border border-white/10 rounded-[6px] p-8 lg:p-10 flex flex-col min-h-[640px]">
              <header>
                <span
                  className="font-zen-old-mincho text-[64px] text-white/85 leading-none block"
                  aria-hidden="true"
                >
                  松
                </span>
                <p className="font-poppins font-semibold text-[12px] tracking-[0.3em] uppercase text-white/45 mt-2">
                  {t('tier_matsu')}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                  <Users
                    className="w-3.5 h-3.5 text-white/35"
                    aria-hidden="true"
                  />
                  <span className="font-poppins text-[12px] text-white/55">
                    {t('tier_limited_50')}
                  </span>
                </span>
              </header>

              <div className="mt-7">
                <p className="font-poppins text-[10px] tracking-[0.25em] uppercase text-white/35 mb-1">
                  {t('tier_total_investment')}
                </p>
                <p className="font-playfair font-bold text-[42px] lg:text-[46px] text-white leading-none">
                  PHP 130,000
                </p>
                <p className="mt-3 font-poppins text-[13px] text-white/45 leading-[1.7]">
                  {t('tier_annual_fees')} PHP 30,000
                  <br />
                  {t('tier_deposit')} PHP 100,000
                </p>
              </div>

              <div
                className="my-7 h-px bg-gradient-to-r from-transparent via-gold-muted/40 to-transparent"
                aria-hidden="true"
              />

              <ul className="space-y-3 text-[14px] text-white/75 font-poppins leading-[1.55]">
                <li className="flex gap-3">
                  <CalendarCheck
                    className="w-4 h-4 mt-0.5 text-[#C66600] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_priority_reservation')}</span>
                </li>
                <li className="flex gap-3">
                  <ChefHat
                    className="w-4 h-4 mt-0.5 text-[#C66600] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_private_room')}</span>
                </li>
                <li className="flex gap-3">
                  <Wine
                    className="w-4 h-4 mt-0.5 text-[#C66600] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_bottle_keep_1')}</span>
                </li>
                <li className="flex gap-3">
                  <Check
                    className="w-4 h-4 mt-0.5 text-[#C66600] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_omakase_birthday')}</span>
                </li>
              </ul>

              <div className="mt-6 inline-block bg-white/5 rounded-[4px] px-3 py-1.5 self-start font-poppins text-[12px] text-[#C66600] font-semibold">
                10% {t('tier_dining_discount_short')}
              </div>

              <div className="mt-auto pt-8">
                <a
                  href={REGISTER_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full border border-[#C66600] text-[#C66600] hover:bg-[#C66600]/10 font-poppins font-semibold text-[14px] tracking-[0.08em] uppercase h-[52px] rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {t('register_now')}
                </a>
              </div>
            </article>

            {/* ============= TOKU-MATSU (RECOMMENDED) ============= */}
            <article
              aria-label="Recommended tier: Toku-Matsu"
              className="relative bg-[#141414] border-2 border-gold rounded-[6px] p-8 lg:p-10 flex flex-col min-h-[640px] md:-mt-4 md:mb-4 shadow-[0_0_40px_rgba(212,175,55,0.15)]"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-[#0A0A0A] font-poppins font-bold text-[11px] tracking-[0.18em] uppercase px-5 py-1.5 rounded-full whitespace-nowrap"
              >
                {t('tier_recommended_badge')}
              </span>
              <header>
                <span
                  className="font-zen-old-mincho text-[64px] text-gold leading-none block"
                  aria-hidden="true"
                >
                  特松
                </span>
                <p className="font-poppins font-semibold text-[12px] tracking-[0.3em] uppercase text-gold/70 mt-2">
                  {t('tier_toku_matsu')}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5">
                  <Users
                    className="w-3.5 h-3.5 text-gold/60"
                    aria-hidden="true"
                  />
                  <span className="font-poppins text-[12px] text-gold/75">
                    {t('tier_limited_30')}
                  </span>
                </span>
              </header>

              <div className="mt-7">
                <p className="font-poppins text-[10px] tracking-[0.25em] uppercase text-gold/55 mb-1">
                  {t('tier_total_investment')}
                </p>
                <p className="font-playfair font-bold text-[42px] lg:text-[46px] text-gold leading-none">
                  PHP 250,000
                </p>
                <p className="mt-3 font-poppins text-[13px] text-white/55 leading-[1.7]">
                  {t('tier_annual_fees')} PHP 50,000
                  <br />
                  {t('tier_deposit')} PHP 200,000
                </p>
              </div>

              <div
                className="my-7 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
                aria-hidden="true"
              />

              <ul className="space-y-3 text-[14px] text-white/80 font-poppins leading-[1.55]">
                <li className="flex gap-3">
                  <CalendarCheck
                    className="w-4 h-4 mt-0.5 text-gold shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_priority_reservation')}</span>
                </li>
                <li className="flex gap-3">
                  <ChefHat
                    className="w-4 h-4 mt-0.5 text-gold shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_private_room')}</span>
                </li>
                <li className="flex gap-3">
                  <Wine
                    className="w-4 h-4 mt-0.5 text-gold shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_bottle_keep_1')}</span>
                </li>
                <li className="flex gap-3">
                  <Check
                    className="w-4 h-4 mt-0.5 text-gold shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_omakase_birthday')}</span>
                </li>
                <li className="flex gap-3">
                  <Check
                    className="w-4 h-4 mt-0.5 text-gold shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_seasonal_2x')}</span>
                </li>
              </ul>

              <div className="mt-6 bg-gold/10 border border-gold/30 rounded-[4px] px-3 py-2 font-poppins text-[12px] text-gold leading-[1.5]">
                {t('tier_bonus_callout_toku')}
              </div>

              <div className="mt-auto pt-8">
                <a
                  href={REGISTER_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-gold hover:bg-gold-dark text-[#0A0A0A] font-poppins font-bold text-[14px] tracking-[0.08em] uppercase h-[52px] rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                >
                  {t('register_now')}
                </a>
              </div>
            </article>

            {/* ============= GOKU-MATSU ============= */}
            <article className="relative bg-[#141414] border border-daimasu-red/40 rounded-[6px] p-8 lg:p-10 flex flex-col min-h-[640px]">
              <span
                aria-hidden="true"
                className="absolute top-6 right-6 writing-vertical-rl font-zen-old-mincho text-[11px] text-daimasu-red/70 tracking-[0.25em]"
              >
                極 · 10名様のみ
              </span>
              <header>
                <span
                  className="font-zen-old-mincho text-[64px] text-daimasu-red/85 leading-none block"
                  aria-hidden="true"
                >
                  極松
                </span>
                <p className="font-poppins font-semibold text-[12px] tracking-[0.3em] uppercase text-daimasu-red/70 mt-2">
                  {t('tier_goku_matsu')}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 bg-daimasu-red/10 border border-daimasu-red/30 rounded-full px-4 py-1.5">
                  <Users
                    className="w-3.5 h-3.5 text-daimasu-red/70"
                    aria-hidden="true"
                  />
                  <span className="font-poppins text-[12px] text-daimasu-red/85">
                    {t('tier_limited_10')}
                  </span>
                </span>
              </header>

              <div className="mt-7">
                <p className="font-poppins text-[10px] tracking-[0.25em] uppercase text-white/35 mb-1">
                  {t('tier_total_investment')}
                </p>
                <p className="font-playfair font-bold text-[42px] lg:text-[46px] text-white leading-none">
                  PHP 500,000
                </p>
                <p className="mt-3 font-poppins text-[13px] text-white/45 leading-[1.7]">
                  {t('tier_annual_fees')} PHP 100,000
                  <br />
                  {t('tier_deposit')} PHP 400,000
                </p>
              </div>

              <div
                className="my-7 h-px bg-gradient-to-r from-transparent via-daimasu-red/40 to-transparent"
                aria-hidden="true"
              />

              <ul className="space-y-3 text-[14px] text-white/75 font-poppins leading-[1.55]">
                <li className="flex gap-3">
                  <CalendarCheck
                    className="w-4 h-4 mt-0.5 text-daimasu-red shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_priority_reservation')}</span>
                </li>
                <li className="flex gap-3">
                  <ChefHat
                    className="w-4 h-4 mt-0.5 text-daimasu-red shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_private_room')}</span>
                </li>
                <li className="flex gap-3">
                  <Wine
                    className="w-4 h-4 mt-0.5 text-daimasu-red shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_bottle_keep_2')}</span>
                </li>
                <li className="flex gap-3">
                  <Check
                    className="w-4 h-4 mt-0.5 text-daimasu-red shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_seasonal_4x')}</span>
                </li>
              </ul>

              <p className="mt-6 font-poppins text-[10px] tracking-[0.25em] uppercase text-daimasu-red/70">
                {t('tier_exclusive_label')}
              </p>
              <ul className="mt-3 space-y-3 text-[14px] text-white/85 font-poppins leading-[1.55]">
                <li className="flex gap-3">
                  <Check
                    className="w-4 h-4 mt-0.5 text-daimasu-red shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_birthday_course')}</span>
                </li>
                <li className="flex gap-3">
                  <Check
                    className="w-4 h-4 mt-0.5 text-daimasu-red shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_priority_chef')}</span>
                </li>
                <li className="flex gap-3">
                  <Car
                    className="w-4 h-4 mt-0.5 text-daimasu-red shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t('tier_summary_chauffeur')}</span>
                </li>
              </ul>

              <div className="mt-auto pt-8">
                <a
                  href={REGISTER_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full border border-daimasu-red text-white bg-transparent hover:bg-daimasu-red/10 font-poppins font-semibold text-[14px] tracking-[0.08em] uppercase h-[52px] rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {t('register_now')}
                </a>
              </div>
            </article>
          </div>

          <div className="text-center mt-12">
            <a
              href="#full-comparison"
              className="font-poppins text-[12px] tracking-[0.2em] uppercase text-white/45 hover:text-white/75 transition-colors"
            >
              {t('tier_comparison_link')}
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================
          3B. DETAILED COMPARISON TABLE
      =================================================== */}
      <section
        id="full-comparison"
        className="bg-[#0A0A0A] py-20 lg:py-24 scroll-mt-24"
      >
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-white/40 text-center mb-10">
            {t('tier_full_comparison_label')}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-t border-white/10">
              <thead>
                <tr className="border-b border-white/10">
                  <th
                    scope="col"
                    className="text-left py-5 font-poppins font-medium text-[12px] tracking-[0.2em] uppercase text-white/40"
                  >
                    {t('tier_features')}
                  </th>
                  <th scope="col" className="py-5 text-center">
                    <span className="font-zen-old-mincho text-[24px] text-white/75 block">
                      松
                    </span>
                  </th>
                  <th scope="col" className="py-5 text-center">
                    <span className="font-zen-old-mincho text-[24px] text-gold block">
                      特松
                    </span>
                  </th>
                  <th scope="col" className="py-5 text-center">
                    <span className="font-zen-old-mincho text-[24px] text-daimasu-red/80 block">
                      極松
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.labelKey}
                    className={cn(
                      'border-b border-white/5',
                      row.highlight && 'bg-white/[0.025]'
                    )}
                  >
                    <th
                      scope="row"
                      className="py-3 pr-4 text-left font-poppins font-normal text-[14px] text-white/65"
                    >
                      {t(row.labelKey)}
                      {row.noteKey && (
                        <span className="block font-poppins text-[11px] text-white/35 mt-0.5">
                          {t(row.noteKey)}
                        </span>
                      )}
                    </th>
                    {row.values.map((v, i) => (
                      <td
                        key={`${row.labelKey}-${i}`}
                        className="py-3 text-center font-poppins text-[14px]"
                      >
                        <CellValue v={v} isToku={i === 1} t={t} />
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="py-6" />
                  {(
                    [
                      'daimasu-outline-orange',
                      'gold',
                      'daimasu-outline-red'
                    ] as const
                  ).map((variant, i) => (
                    <td
                      key={`cta-${variant}-${i}`}
                      className="py-6 text-center"
                    >
                      <a
                        href={REGISTER_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'inline-flex items-center justify-center font-poppins font-semibold text-[12px] tracking-[0.08em] uppercase h-10 rounded-[4px] px-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                          variant === 'gold' &&
                            'bg-gold hover:bg-gold-dark text-[#0A0A0A] font-bold',
                          variant === 'daimasu-outline-orange' &&
                            'border border-[#C66600] text-[#C66600] hover:bg-[#C66600]/10',
                          variant === 'daimasu-outline-red' &&
                            'border border-daimasu-red text-white hover:bg-daimasu-red/10'
                        )}
                      >
                        {t('register_now')}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===================================================
          4. VIP PRIVILEGE CARDS
      =================================================== */}
      <section className="relative bg-[#0A0A0A] bg-washi-grain py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-[600px] mx-auto mb-14 lg:mb-16">
            <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-gold mb-5">
              {t('vip_eyebrow')}
            </p>
            <h2 className="font-playfair font-bold text-[36px] sm:text-[44px] lg:text-[54px] leading-[1.1] tracking-tight">
              {t('vip_treatment_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VIP_CARDS.map(({Icon, titleKey, descKey}) => (
              <div
                key={titleKey}
                className="group bg-[#141414] border border-white/8 rounded-[6px] p-7 lg:p-8 transition-all duration-500 hover:border-gold/30"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-white/5 mb-6 group-hover:bg-gold/10 transition-colors">
                  <Icon
                    className="w-6 h-6 text-[#C66600] group-hover:text-gold transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-shippori font-bold text-[20px] text-white mb-3 leading-[1.4]">
                  {t(titleKey)}
                </h3>
                <p className="font-poppins text-[13px] text-white/55 leading-[1.7] break-keep-all">
                  {t(descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          5. SETTLEMENT PROCESS TIMELINE
      =================================================== */}
      <section className="relative w-full py-24 lg:py-32 overflow-hidden">
        <Image
          src="/membership/settlement-bg.png"
          alt=""
          fill
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/72" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A0A0A] to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-gold mb-5">
              {t('settlement_eyebrow')}
            </p>
            <h2 className="font-playfair font-bold text-[36px] sm:text-[44px] lg:text-[54px] leading-[1.15] tracking-tight">
              <span className="text-white">{t('settlement_simple')}</span>{' '}
              <span className="text-[#C66600]">{t('settlement_process')}</span>
            </h2>
            <p className="mt-5 font-shippori text-[16px] text-white/65 leading-[1.7]">
              {t('settlement_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 relative">
            {/* Connecting line (desktop only) */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-[26px] left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-[#C66600]/0 via-[#C66600]/40 to-[#C66600]/0"
            />
            {[
              {
                num: 1,
                titleKey: 'step_deduct_title',
                descKey: 'step_deduct_desc'
              },
              {
                num: 2,
                titleKey: 'step_discount_title',
                descKey: 'step_discount_desc'
              },
              {
                num: 3,
                titleKey: 'step_topup_title',
                descKey: 'step_topup_desc'
              }
            ].map(({num, titleKey, descKey}) => (
              <div
                key={num}
                className="relative px-2 lg:px-6 text-center md:text-left"
              >
                <div className="relative inline-flex md:flex">
                  <span className="w-[52px] h-[52px] rounded-full bg-[#0A0A0A] border border-[#C66600]/50 flex items-center justify-center font-poppins font-bold text-[#C66600] text-[18px]">
                    {num}
                  </span>
                </div>
                <h3 className="mt-5 font-playfair font-bold text-[22px] lg:text-[26px] text-white leading-[1.3]">
                  {t(titleKey)}
                </h3>
                <p className="mt-3 font-poppins text-[14px] lg:text-[15px] text-white/65 leading-[1.7] break-keep-all">
                  {t(descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          6. PROMISES (ASSURANCES)
      =================================================== */}
      <section className="relative bg-[#0A0A0A] bg-washi-grain py-20 lg:py-24 overflow-hidden">
        <div className="relative max-w-[820px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              {t('additional_information')}
            </p>
            <h2 className="font-playfair font-bold text-[28px] sm:text-[32px] lg:text-[40px] leading-[1.2] tracking-tight">
              {t('membership_assurances')}
            </h2>
          </div>
          <ul className="bg-[#141414] border border-white/8 rounded-[6px] p-8 lg:p-12 divide-y divide-white/5">
            {[
              'info_topup',
              'info_minimum',
              'info_no_expiry',
              'info_membership_valid'
            ].map((key) => (
              <li
                key={key}
                className="flex items-center gap-4 py-4 font-shippori text-[15px] lg:text-[16px] text-white/75 leading-[1.7] break-keep-all first:pt-0 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="block w-[2px] h-[14px] bg-[#C66600] shrink-0"
                />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===================================================
          7. READY TO JOIN — CEREMONY
      =================================================== */}
      <section className="relative bg-[#0A0A0A] py-24 lg:py-36 overflow-hidden">
        <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <KamonSeal size={80} className="mx-auto mb-8" />
          <h2 className="font-playfair font-bold text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.1] tracking-tight">
            <span className="text-white block">
              {t('ready_to_join_line_1')}
            </span>
            <span className="text-gold block">{t('ready_to_join_line_2')}</span>
          </h2>
          <p className="mt-6 font-shippori text-[16px] lg:text-[17px] text-white/65 leading-[1.8] max-w-[520px] mx-auto break-keep-all">
            {t('ready_to_join_desc')}
          </p>
          <p className="mt-10 mb-4 font-poppins text-[11px] tracking-[0.25em] uppercase text-white/35">
            {t('cta_eyebrow')}
          </p>
          <a
            href={REGISTER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-daimasu-red hover:bg-daimasu-red/90 text-white font-poppins font-bold text-[15px] tracking-[0.1em] uppercase px-14 h-[56px] rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            {t('register_now')}
          </a>
          <div className="mt-5">
            <a
              href={REGISTER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-poppins text-[13px] text-[#C66600] hover:underline underline-offset-4"
            >
              {t('cta_messenger_link')}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
