import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type GrabFoodContent = {
  title?: string;
  buttonText?: string;
  buttonLink?: string;
};

type Props = {
  content?: GrabFoodContent;
};

// Phase 2.4 — luxury repositioning. The previous GrabFood section was a
// full-bleed dark hero with a 6xl headline and a filled-red CTA, giving
// delivery the same visual weight as the kaiseki experience itself.
// Demoted here to a single quiet line above the footer: small label, a
// muted GrabFood lockup, and a text link. The dining-in story keeps its
// theatrical surface; delivery becomes a footnote.
export default function GrabFoodSection({content}: Props) {
  const t = useTranslations();
  const useCms = useLocale() === 'en';

  const title = (useCms && content?.title) || t('grabfood_title');
  const buttonText = (useCms && content?.buttonText) || t('grabfood_button');
  const buttonLink =
    content?.buttonLink ||
    'https://r.grab.com/g/6-20260123_182251_91230EF135F3447384D50AE00F339011_MEXMPS-2-C7VDEBXXTJD1G2';

  return (
    <section className="bg-washi-50 border-t border-ink-900/10">
      <div className="max-w-shell mx-auto px-4 md:px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center md:text-left">
        <span className="font-poppins text-[11px] tracking-[0.3em] uppercase text-ink-900/60">
          {title}
        </span>
        <Image
          src="/homepage/grabfood-logo.png"
          alt="GrabFood"
          width={500}
          height={100}
          className="h-6 md:h-7 w-auto opacity-70"
        />
        <Link
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-poppins text-[12px] tracking-[0.12em] uppercase text-ink-900 underline underline-offset-4 decoration-gold-500 hover:text-gold-500 transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
