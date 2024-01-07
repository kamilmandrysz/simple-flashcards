import Link from 'next/link';

import { routes } from '@frontend/utils';

import { SignInForm } from '../components';

export const SignInPage = () => {
  return (
    <div className="flex w-full flex-col px-8 py-5 lg:pb-16 lg:pt-12">
      <h1 className="mb-3 text-2xl font-bold lg:mb-10 lg:text-4xl">Sign In</h1>

      <SignInForm />

      <Link className="mt-8 text-center text-sm lg:mt-auto lg:text-start" href={routes.SIGN_UP}>
        Not a member yet?
        <span className="text-primary ml-1 font-bold">Crate account!</span>
      </Link>
    </div>
  );
};
