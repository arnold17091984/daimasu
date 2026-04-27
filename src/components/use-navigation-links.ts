'use client';

import {useLocale, useTranslations} from 'next-intl';

export function useNavigationLinks() {
  const t = useTranslations();
  const locale = useLocale();

  const links = [
    {
      value: `/${locale}`,
      label: t('home')
    },
    {
      value: `/our-menu`,
      label: t('menu')
    },
    {
      value: `/our-rooms`,
      label: t('rooms')
    },
    {
      value: `/about-us`,
      label: t('about_us')
    },
    {
      value: '#footer',
      label: t('contact')
    }
  ];

  return {links};
}
