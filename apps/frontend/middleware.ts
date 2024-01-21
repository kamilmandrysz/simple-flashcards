import { NextRequest } from 'next/server';

import { authenticationGuard } from '@frontend/middleware';
import { applySetCookie } from '@frontend/utils/server';

export async function middleware(request: NextRequest) {
  console.log(request.url);

  const response = await authenticationGuard(request);

  applySetCookie(request, response);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|site.webmanifest).*)'],
};
