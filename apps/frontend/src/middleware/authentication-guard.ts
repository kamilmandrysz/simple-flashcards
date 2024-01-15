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
    return NextResponse.next();
  }

  const { isAuthenticated, cookiesToSet } = await getUserAuthenticationStatus(request);

  if (
    route.auth === AuthenticationState.AVAILABLE ||
    (route.auth === AuthenticationState.AUTHENTICATED && isAuthenticated) ||
    (route.auth === AuthenticationState.UNAUTHENTICATED && !isAuthenticated)
  ) {
    const response = NextResponse.next();
    cookiesToSet.forEach(({ name, value, expires }) => {
      response.cookies.set(name, value, { expires });
    });

    return response;
  }

  const response = NextResponse.redirect(fullUrl.replace(url.pathname, routes.HOME.url), {
    status: 302,
  });
  cookiesToSet.forEach(({ name, value, expires }) => {
    response.cookies.set(name, value, { expires });
  });

  return response;
}

async function getUserAuthenticationStatus(request: NextRequest): Promise<{
  isAuthenticated: boolean;
  cookiesToSet: { name: string; value: string; expires: Date | number }[];
}> {
  //Get session cookies
  const access_token = request.cookies.get(COOKIE_ACCESS_TOKEN)?.value;
  const refresh_token = request.cookies.get(COOKIE_REFRESH_TOKEN)?.value;

  const decodedAccessToken = access_token ? jwtDecode(access_token) : null;

  const oneDay = 24 * 60 * 60 * 1000;

  //Check if access token is valid
  if (decodedAccessToken) {
    if (decodedAccessToken?.sub) {
      return { isAuthenticated: true, cookiesToSet: [] };
    }

    return {
      isAuthenticated: false,
      cookiesToSet: [
        {
          name: COOKIE_ACCESS_TOKEN,
          value: COOKIE_ACCESS_TOKEN,
          expires: Date.now() - oneDay,
        },
      ],
    };
  }

  if (!refresh_token) {
    return { isAuthenticated: false, cookiesToSet: [] };
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

    const decodedNewAccessToken = jwtDecode(new_access_token);
    const decodedNewRefreshToken = jwtDecode(new_refresh_token);

    return {
      isAuthenticated: true,
      cookiesToSet: [
        {
          name: COOKIE_ACCESS_TOKEN,
          value: new_access_token,
          expires: UNIXTimestampToDate(decodedNewAccessToken.exp || 0),
        },
        {
          name: COOKIE_REFRESH_TOKEN,
          value: new_refresh_token,
          expires: UNIXTimestampToDate(decodedNewRefreshToken.exp || 0),
        },
      ],
    };
  } catch (e) {
    //Attempt to refresh token failed

    return {
      isAuthenticated: false,
      cookiesToSet: [
        {
          name: COOKIE_REFRESH_TOKEN,
          value: COOKIE_REFRESH_TOKEN,
          expires: Date.now() - oneDay,
        },
      ],
    };
  }
}
