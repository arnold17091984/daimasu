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
