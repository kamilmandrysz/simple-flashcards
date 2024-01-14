import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

import {
  routes,
  AuthenticationState,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  UNIXTimestampToDate,
} from '@frontend/utils';
import { RefreshTokenResponse } from '@frontend/api';

export async function authenticationGuard(request: NextRequest) {
  const fullUrl = request.url;
  const url = new URL(fullUrl);

  //Find route
  //Dynamic routes has functions as url
  //If route is dynamic we need to find page param and then check if it is current route
  const route = Object.values(routes).find((value) => {
    if (typeof value.url === 'string') {
      return value.url === url.pathname;
    }

    const dynamicPath = url.pathname.replace(value.baseUrl, '').substring(1);

    return value.url(dynamicPath) === url.pathname;
  });

  //If route was not found return
  if (!route) {
    return;
  }

  //Get session cookies
  const access_token = request.cookies.get(COOKIE_ACCESS_TOKEN)?.value;
  const refresh_token = request.cookies.get(COOKIE_REFRESH_TOKEN)?.value;

  const authenticatedRoute = route.auth === AuthenticationState.AUTHENTICATED;
  const allAuthenticationStatesRoute = route.auth === null;

  const redirectHomeResponse = NextResponse.redirect(
    fullUrl.replace(url.pathname, routes.HOME.url),
    {
      status: 302,
    }
  );

  //Check if user is authenticated
  if (access_token) {
    //If route requires authenticated user or route doesn't need authentication state return
    if (authenticatedRoute || allAuthenticationStatesRoute) {
      return;
    }

    //If route requires unauthenticated user redirect to homepage
    return redirectHomeResponse;
  }

  //Check if user doesn't have refresh token
  if (refresh_token === undefined) {
    //If route requires authenticated user redirect to homepage
    if (authenticatedRoute) {
      return redirectHomeResponse;
    }

    //If route requires unauthenticated user or route doesn't need authentication state return
    return;
  }

  //Refresh auth tokens
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/refresh`, {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    });
    const {
      access_token: new_access_token,
      refresh_token: new_refresh_token,
    }: RefreshTokenResponse = await res.json();

    const decodedAccessToken = jwtDecode(new_access_token);
    const decodedRefreshToken = jwtDecode(new_refresh_token);

    //If route requires authenticated user or route doesn't need authentication state return cookie
    if (authenticatedRoute || allAuthenticationStatesRoute) {
      const response = NextResponse.next();

      response.cookies.set(COOKIE_ACCESS_TOKEN, new_access_token, {
        expires: UNIXTimestampToDate(decodedAccessToken.exp || 0),
      });
      response.cookies.set(COOKIE_REFRESH_TOKEN, new_refresh_token, {
        expires: UNIXTimestampToDate(decodedRefreshToken.exp || 0),
      });

      return response;
    }

    //If route requires unauthenticated user redirect to homepage cookie
    redirectHomeResponse.cookies.set(COOKIE_ACCESS_TOKEN, new_refresh_token, {
      expires: UNIXTimestampToDate(decodedAccessToken.exp || 0),
    });
    redirectHomeResponse.cookies.set(COOKIE_REFRESH_TOKEN, new_access_token, {
      expires: UNIXTimestampToDate(decodedRefreshToken.exp || 0),
    });

    return redirectHomeResponse;
  } catch (e) {
    //Attempt to refresh token failed
    const oneDay = 24 * 60 * 60 * 1000;

    //If route requires authenticated user redirect to homepage with removed cookie
    if (authenticatedRoute) {
      redirectHomeResponse.cookies.set(COOKIE_REFRESH_TOKEN, COOKIE_REFRESH_TOKEN, {
        expires: Date.now() - oneDay,
      });
      return redirectHomeResponse;
    }

    //If route requires unauthenticated user or route doesn't need authentication state return response with removed cookie
    const response = NextResponse.next();
    redirectHomeResponse.cookies.set(COOKIE_REFRESH_TOKEN, COOKIE_REFRESH_TOKEN, {
      expires: Date.now() - oneDay,
    });

    return response;
  }
}
