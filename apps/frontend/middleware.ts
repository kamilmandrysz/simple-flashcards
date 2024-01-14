import { NextRequest } from 'next/server';

import { authenticationGuard } from '@frontend/middleware';

export async function middleware(request: NextRequest) {
  const authenticationRedirect = await authenticationGuard(request);
  if (authenticationRedirect) return authenticationRedirect;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|site.webmanifest).*)'],
};
