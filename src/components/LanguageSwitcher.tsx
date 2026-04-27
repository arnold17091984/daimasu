'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {usePathname, useRouter} from '@/i18n/navigation';
import {useLocale} from 'next-intl';
import {useTransition} from 'react';

const locales = [
  {value: 'en', label: 'English'},
  {value: 'ja', label: '日本語'},
];

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({className}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, {locale: newLocale as 'en' | 'ja'});
    });
  };

  return (
    <Select value={locale} onValueChange={handleLocaleChange} disabled={isPending}>
      <SelectTrigger
        className={`w-auto gap-2 border-none bg-transparent text-white font-poppins font-bold text-base leading-[1.09] tracking-[0.02em] hover:text-white/80 focus:ring-0 focus:ring-offset-0 ${className}`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-black/95 border-white/20">
        {locales.map((loc) => (
          <SelectItem
            key={loc.value}
            value={loc.value}
            className="text-white font-poppins hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer"
          >
            {loc.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
