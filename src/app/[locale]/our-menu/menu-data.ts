import type {Locale} from 'next-intl';
import {host} from '@/config';
import menuJson from '../../../../content/menu.json';

export type MenuPrice = number | {value: number; suffix: '~'};

export type MenuItem = {
  jp: string;
  en: string;
  price: MenuPrice | null;
  description: string | null;
};

export type MenuCategory = {
  id: string;
  kanji: string;
  en: string;
  items: MenuItem[];
};

export type KaisekiCourse = {
  id: string;
  kanji: string;
  romaji: string;
  price: number;
  composition:
    | {
        label_jp: string;
        jp: string;
        en: string;
      }[]
    | null;
};

export type MenuData = {
  pdf: string;
  categories: MenuCategory[];
  kaiseki: KaisekiCourse[];
  reservation_note: {jp: string; en: string};
};

export const menu = menuJson as MenuData;

export function formatPrice(price: MenuPrice | null): string {
  if (price === null) return '';
  if (typeof price === 'number') {
    return `₱${price.toLocaleString('en-US')}`;
  }
  return `₱${price.value.toLocaleString('en-US')}~`;
}

function priceToString(price: MenuPrice | null): string | null {
  if (price === null) return null;
  return typeof price === 'number' ? String(price) : String(price.value);
}

/**
 * Build schema.org Menu JSON-LD for the /our-menu page.
 * Links back to the global Restaurant entity declared in the locale layout
 * via @id reference, so Google can join the two graphs.
 */
export function buildMenuJsonLd(locale: Locale) {
  const isJa = locale === 'ja';
  const menuId = `${host}/${locale}/our-menu#menu`;
  const restaurantId = `${host}/#restaurant`;

  const sections = menu.categories.map((category) => ({
    '@type': 'MenuSection' as const,
    name: isJa ? category.kanji : category.en,
    alternateName: isJa ? category.en : category.kanji,
    hasMenuItem: category.items.map((item) => {
      const priceValue = priceToString(item.price);
      const itemNode: Record<string, unknown> = {
        '@type': 'MenuItem',
        name: isJa ? item.jp : item.en,
        alternateName: isJa ? item.en : item.jp
      };
      if (item.description) itemNode.description = item.description;
      if (priceValue) {
        itemNode.offers = {
          '@type': 'Offer',
          price: priceValue,
          priceCurrency: 'PHP',
          availability: 'https://schema.org/InStock'
        };
      }
      return itemNode;
    })
  }));

  const kaisekiSection = {
    '@type': 'MenuSection' as const,
    name: isJa ? '会席料理' : 'Kaiseki Courses',
    alternateName: isJa ? 'Kaiseki Courses' : '会席料理',
    hasMenuItem: menu.kaiseki.map((course) => {
      const courseDescription = course.composition
        ? course.composition
            .map((step) =>
              [
                step.label_jp ? `${step.label_jp}：` : '',
                isJa ? step.jp : step.en
              ].join('')
            )
            .join(' / ')
        : undefined;
      return {
        '@type': 'MenuItem',
        name: isJa ? course.kanji : course.romaji,
        alternateName: isJa ? course.romaji : course.kanji,
        ...(courseDescription ? {description: courseDescription} : {}),
        offers: {
          '@type': 'Offer',
          price: String(course.price),
          priceCurrency: 'PHP',
          availability: 'https://schema.org/InStock'
        }
      };
    })
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': menuId,
    name: isJa ? '大枡 — 今月のお品書き' : "Daimasu — This Month's Menu",
    inLanguage: locale,
    url: `${host}/${locale}/our-menu`,
    isRelatedTo: {'@id': restaurantId},
    hasMenuSection: [kaisekiSection, ...sections]
  };
}
