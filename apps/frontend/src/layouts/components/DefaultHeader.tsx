'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import Cookies from 'js-cookie';

import { User } from '@frontend/api';
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN, routes } from '@frontend/utils';
import { Dropdown } from '@frontend/components';
import { useNotifications } from '@frontend/shared/context';

type Props = {
  user: User | null;
};

export const DefaultHeader = ({ user }: Props) => {
  const router = useRouter();
  const { showNotification } = useNotifications();

  const onLogout = useCallback(() => {
    console.log('/');

    Cookies.remove(COOKIE_ACCESS_TOKEN);
    Cookies.remove(COOKIE_REFRESH_TOKEN);

    showNotification('success', 'Successfully logged out.');

    router.push('/');
    router.refresh();
  }, [router]);

  return (
    <div className="bg-secondary fixed top-0 z-20 flex  h-16 w-full justify-center shadow-md">
      <div className="container flex h-full w-full items-center justify-end gap-2 px-4">
        {user ? (
          <>
            <Dropdown
              className="!rounded-full border-0 !bg-transparent !px-0 !py-0 !shadow-none ring-transparent hover:bg-transparent"
              button={<UserCircleIcon className="h-10 w-10 text-white" />}
            >
              <Link className="flex items-center gap-2" href={routes.FLASHCARDS.url}>
                <DocumentTextIcon className="h-4 w-4 text-slate-500" />
                Flashcards
              </Link>
              <Link className="flex items-center gap-2" href={routes.FLASHCARDS.url}>
                <UserIcon className="h-4 w-4 text-slate-500" />
                Profile
              </Link>
              <button className="flex w-full items-center gap-2" onClick={onLogout}>
                <ArrowLeftStartOnRectangleIcon className="h-4 w-4 text-slate-500" />
                Logout
              </button>
            </Dropdown>
          </>
        ) : (
          <>
            <Link
              href={routes.SIGN_IN.url}
              className="btn btn-xl btn-contained btn-contained-primary-dark"
            >
              Sign In
            </Link>
            <Link
              href={routes.SIGN_UP.url}
              className="btn btn-xl btn-outlined btn-outlined-primary-dark"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
