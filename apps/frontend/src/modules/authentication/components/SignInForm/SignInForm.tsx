'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { Button, BaseTextField } from '@frontend/components';

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
    handleSubmit,
  } = useForm<Form>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: Form) => {
    console.log(data);
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
