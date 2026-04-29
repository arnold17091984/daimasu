import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ja'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/our-menu': '/our-menu',
    '/our-rooms': '/our-rooms',
    '/about-us': '/about-us',
    '/membership': '/membership',
    '/posts': '/posts',
    '/pathnames': {
      ja: '/pfadnamen'
    }
  }
});
