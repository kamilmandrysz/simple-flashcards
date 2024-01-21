'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

import { Button, BaseTextField } from '@frontend/components';
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  UNIXTimestampToDate,
  handleFormErrors,
  routes,
} from '@frontend/utils';
import { useNotifications } from '@frontend/shared/context/notification-context';
import { signInUser } from '@frontend/api';

type Form = {
  emailOrUsername: string;
  password: string;
};

const formSchema = object().shape({
  emailOrUsername: string().required('Email or username is required'),
  password: string().required('Password is required.'),
});

export const SignInForm = () => {
  const {
    formState: { errors },
    register,
    setError,
    handleSubmit,
  } = useForm<Form>({
    resolver: yupResolver(formSchema),
  });
  const router = useRouter();
  const { showNotification } = useNotifications();

  const onSubmit = async (data: Form) => {
    try {
      const { access_token, refresh_token } = (await signInUser(data)).data;

      const decodedAccessToken = jwtDecode(access_token);
      const decodedRefreshToken = jwtDecode(refresh_token);

      Cookies.set(COOKIE_ACCESS_TOKEN, access_token, {
        expires: UNIXTimestampToDate(decodedAccessToken.exp || 0),
      });
      Cookies.set(COOKIE_REFRESH_TOKEN, refresh_token, {
        expires: UNIXTimestampToDate(decodedRefreshToken.exp || 0),
      });

      router.push(routes.FLASHCARDS.url);
      router.refresh();
    } catch (e) {
      handleFormErrors(e, setError, showNotification);
    }
  };

  return (
    <form className="flex flex-col gap-4 lg:gap-5" onSubmit={handleSubmit(onSubmit)}>
      <BaseTextField
        label="Email or username"
        placeholder="Enter email or username"
        error={errors?.emailOrUsername?.message}
        {...register('emailOrUsername')}
      />

      <BaseTextField
        type="password"
        label="Password"
        placeholder="Enter password"
        error={errors?.password?.message}
        {...register('password')}
      />
      <Button className="mt-2 w-full lg:w-[100px]" type="submit">
        Sign in
      </Button>
    </form>
  );
};
