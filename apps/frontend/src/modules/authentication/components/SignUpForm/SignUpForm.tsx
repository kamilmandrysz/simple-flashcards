'use client';

import { useForm } from 'react-hook-form';
import { object, string, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailRegEx, passwordRegEx } from '@flashcards/utils';

import { Button, BaseTextField } from '@frontend/components';

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
  } = useForm<Form>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: Form) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-4 lg:gap-5" onSubmit={handleSubmit(onSubmit)}>
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
      <Button className="mt-2 w-full lg:w-[100px]" type="submit">
        Sign up
      </Button>
    </form>
  );
};
