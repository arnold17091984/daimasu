import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
import {routing} from './i18n/routing';

const intlProxy = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const response = intlProxy(request);

  // Get the current locale from the proxy
  const {pathname} = request.nextUrl;
  const locale = pathname.split('/')[1]; // Assuming path is /en/... or /ja/...

  // Persist the locale in a cookie
  response.headers.set(
    'Set-Cookie',
    `NEXT_LOCALE=${locale}; Path=/; HttpOnly; SameSite=Lax`
  );

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|keystatic|_next|_vercel|.*\\..*)*)'
};
