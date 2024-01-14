import Link from 'next/link';

import { routes } from '@frontend/utils';

import { SignUpForm } from '../components';

export const SignUpPage = () => {
  return (
    <div className="flex w-full flex-col px-8 py-5 lg:pb-16 lg:pt-12">
      <h1 className="mb-3 text-2xl font-bold lg:mb-10 lg:text-4xl">Sign Up</h1>

      <SignUpForm />

      <Link className="mt-8 text-center text-sm lg:mt-10 lg:text-start" href={routes.SIGN_IN.url}>
        Already have an account?
        <span className="text-primary ml-1 font-bold">Sign in!</span>
      </Link>
    </div>
  );
};
