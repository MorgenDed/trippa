import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from '@/utils/supabase/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 1. Run next-intl middleware first to handle routing/locales
  const response = intlMiddleware(request);

  // 2. Pass the response to Supabase to update session (set cookies)
  return await updateSession(request, response);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(nl|en|de|fr|es)/:path*']
};
