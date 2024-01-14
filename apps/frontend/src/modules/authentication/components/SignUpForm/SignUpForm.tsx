'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { object, string, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailRegEx, passwordRegEx } from '@flashcards/utils';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import { useNotifications } from '@frontend/shared/context/notification-context';
import { Button, BaseTextField } from '@frontend/components';
import { isEmptyObject, routes } from '@frontend/utils';
import { signUpUser } from '@frontend/api';
import { handleFormErrors } from '@frontend/utils';

type Form = {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
};

const formSchema = object().shape({
  email: string()
    .required('Email is required')
    .matches(emailRegEx, 'Email must be in the correct format.'),
  username: string()
    .required('Username is required.')
    .min(3, 'Username must have at least {length} characters.'),
  password: string()
    .required('Password is required.')
    .matches(
      passwordRegEx,
      'Password must contain minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and, one special character.'
    ),
  repeatPassword: string()
    .required('Repeat password is required.')
    .oneOf([ref('password')], 'Passwords do not match'),
});

export const SignUpForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm<Form>({
    resolver: yupResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const { showNotification } = useNotifications();

  const onSubmit = async ({ email, username, password }: Form) => {
    setIsLoading(true);

    try {
      await signUpUser({
        email,
        username,
        password,
      });

      setIsSubmittedSuccessfully(true);
    } catch (e) {
      handleFormErrors(e, setError, showNotification);
    }

    setIsLoading(false);
  };

  return (
    <div className="relative">
      <form
        className={clsx('flex flex-col gap-4 lg:gap-5', { invisible: isSubmittedSuccessfully })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <BaseTextField
          label="Email"
          placeholder="Enter email"
          error={errors?.email?.message}
          {...register('email')}
        />
        <BaseTextField
          label="Username"
          placeholder="Enter username"
          error={errors?.username?.message}
          {...register('username')}
        />
        <BaseTextField
          type="password"
          label="Password"
          placeholder="Enter password"
          error={errors?.password?.message}
          {...register('password')}
        />
        <BaseTextField
          type="password"
          label="Repeat password"
          placeholder="Enter password again"
          error={errors?.repeatPassword?.message}
          {...register('repeatPassword', {
            required: 'Repeat Password is required',
          })}
        />
        <Button
          className="mt-2 w-full lg:w-[100px]"
          type="submit"
          isLoading={isLoading}
          disabled={isLoading || !isEmptyObject(errors)}
        >
          Sign up
        </Button>
      </form>

      {isSubmittedSuccessfully ? (
        <div className="absolute top-0 flex h-[calc(100%+3.375rem)] w-full flex-col items-center gap-2 bg-white pt-4 lg:h-[calc(100%+4rem)]">
          <CheckCircleIcon className="fill-primary h-[12rem] w-[12rem]" />
          <p className="text-lg font-bold">Account created successfully!</p>
          <Link href={routes.SIGN_IN.url} className="mt-4">
            <Button>Back to login page</Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
