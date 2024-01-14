import { cookies } from 'next/headers';

import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from './cookies';

export function getCookies() {
  const access_token = cookies().get(COOKIE_ACCESS_TOKEN);
  const refresh_token = cookies().get(COOKIE_REFRESH_TOKEN);

  return { access_token, refresh_token };
}
