import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { jwtDecode } from 'jwt-decode';

import { DecodedAccessToken } from '@frontend/api';

import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from './cookies';

export function getCookies() {
  const access_token = cookies().get(COOKIE_ACCESS_TOKEN);
  const refresh_token = cookies().get(COOKIE_REFRESH_TOKEN);

  return { access_token, refresh_token };
}

/* -------------------------------------------------------------------------- */

/**
 * Copy cookies from the Set-Cookie header of the response to the Cookie header of the request,
 * so that it will appear to SSR/RSC as if the user already has the new cookies.
 */
export function applySetCookie(req: NextRequest, res: NextResponse): void {
  // parse the outgoing Set-Cookie header
  const setCookies = new ResponseCookies(res.headers);
  // Build a new Cookie header for the request by adding the setCookies
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
  // set “request header overrides” on the outgoing response
  NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
      res.headers.set(key, value);
    }
  });
}

/* -------------------------------------------------------------------------- */

export function getUser() {
  const access_token = cookies().get(COOKIE_ACCESS_TOKEN)?.value;

  const user = access_token ? jwtDecode<DecodedAccessToken>(access_token)?.user : null;

  return user;
}
