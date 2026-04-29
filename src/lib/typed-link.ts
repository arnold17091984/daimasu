import type {ComponentProps} from 'react';
import type {Link} from '@/i18n/navigation';

// `next-intl` produces a typed `Link` whose `href` is constrained to the
// `pathnames` declared in `routing.ts`. Component props that originate from
// the CMS (Keystatic) come back as plain `string`, so we cast through this
// type alias rather than sprinkling `as any` across the codebase.
export type LinkHref = ComponentProps<typeof Link>['href'];
