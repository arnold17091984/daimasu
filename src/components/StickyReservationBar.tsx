'use client';

import {Link} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';
import {Phone, BookOpen, CalendarCheck} from 'lucide-react';

// Phase 1C — mobile sticky reservation bar.
// HNW guests on mobile expect a one-thumb path to Reserve / Menu / Call.
// Pinned to the bottom on screens < md so the home hero stays uncluttered
// while still keeping the primary actions one tap away. Hidden on md+
// because desktop already exposes the same actions in the global header.
export default function StickyReservationBar() {
  const t = useTranslations();

  return (
    <nav
      aria-label={t('reservation_actions')}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-gold-500/30 bg-ink-900/95 backdrop-blur-md"
      style={{paddingBottom: 'env(safe-area-inset-bottom)'}}
    >
      <ul className="grid grid-cols-3 divide-x divide-gold-500/20">
        <li>
          <a
            href="tel:+639171096032"
            className="flex h-14 flex-col items-center justify-center gap-0.5 text-washi-50 hover:text-gold-300 transition-colors"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            <span className="font-poppins text-[10px] tracking-[0.12em] uppercase">
              {t('cta_call')}
            </span>
          </a>
        </li>
        <li>
          <Link
            href="/our-menu"
            className="flex h-14 flex-col items-center justify-center gap-0.5 text-washi-50 hover:text-gold-300 transition-colors"
          >
            <BookOpen className="w-5 h-5" aria-hidden="true" />
            <span className="font-poppins text-[10px] tracking-[0.12em] uppercase">
              {t('cta_menu')}
            </span>
          </Link>
        </li>
        <li>
          <a
            href="https://m.me/daimasujapaneserestaurant"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 flex-col items-center justify-center gap-0.5 bg-gold-500 text-ink-900 hover:bg-gold-300 transition-colors"
          >
            <CalendarCheck className="w-5 h-5" aria-hidden="true" />
            <span className="font-poppins text-[10px] font-medium tracking-[0.12em] uppercase">
              {t('cta_reserve')}
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
