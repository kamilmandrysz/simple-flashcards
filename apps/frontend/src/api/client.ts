import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { RefreshTokenResponse } from './auth';
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  UNIXTimestampToDate,
  routes,
} from '@frontend/utils';

const isServer = typeof window === 'undefined';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(async (request) => {
  let access_token: string | undefined = undefined;
  if (isServer) {
    const { cookies } = await import('next/headers');
    access_token = cookies().get(COOKIE_ACCESS_TOKEN)?.value;
  } else {
    access_token = Cookies.get(COOKIE_ACCESS_TOKEN);
  }

  if (access_token) {
    request.headers['Authorization'] = `Bearer ${access_token}`;
  }

  return request;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error: AxiosError) {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      let refreshToken: string | undefined = undefined;
      if (isServer) {
        const { cookies } = await import('next/headers');
        refreshToken = cookies().get(COOKIE_REFRESH_TOKEN)?.value;
      } else {
        refreshToken = Cookies.get(COOKIE_REFRESH_TOKEN);
      }

      if (!refreshToken) {
        if (isServer) {
          const { redirect } = await import('next/navigation');
          redirect(routes.HOME.url);
        } else {
          window.location.href = routes.HOME.url;
        }
        return Promise.reject(error);
      }

      try {
        const response = await axios.get<RefreshTokenResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}auth/refresh`,
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );
        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        const decodedNewAccessToken = jwtDecode(newAccessToken);
        const decodedNewRefreshToken = jwtDecode(newRefreshToken);

        const accessTokenExp = UNIXTimestampToDate(decodedNewAccessToken.exp || 0);
        const refreshTokenExp = UNIXTimestampToDate(decodedNewRefreshToken.exp || 0);

        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        if (isServer) {
          const { cookies } = await import('next/headers');
          cookies().set(COOKIE_ACCESS_TOKEN, newAccessToken, {
            expires: accessTokenExp,
          });
          cookies().set(COOKIE_REFRESH_TOKEN, newRefreshToken, {
            expires: refreshTokenExp,
          });
        } else {
          Cookies.set(COOKIE_ACCESS_TOKEN, newAccessToken, { expires: accessTokenExp });
          Cookies.set(COOKIE_REFRESH_TOKEN, newRefreshToken, { expires: refreshTokenExp });
        }

        return API(originalRequest);
      } catch (e) {
        const oneDay = 24 * 60 * 60 * 1000;
        const expires = Date.now() - oneDay;

        if (isServer) {
          const { cookies } = await import('next/headers');
          cookies().set(COOKIE_REFRESH_TOKEN, COOKIE_REFRESH_TOKEN, {
            expires,
          });
          const { redirect } = await import('next/navigation');
          redirect(routes.HOME.url);
        } else {
          Cookies.remove(COOKIE_REFRESH_TOKEN);
          window.location.href = routes.HOME.url;
        }

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
