'use client';

import Link from 'next/link';

import { useAuthentication } from '@frontend/shared/context';
import { routes } from '@frontend/utils';

export default async function Index() {
  const { user } = useAuthentication();

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link href={routes.SIGN_IN.url} prefetch={false}>
        Sign in
      </Link>
      {user ? user.username : 'no active session'}
    </div>
  );
}
