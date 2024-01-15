import { ReactNode } from 'react';

import { getUser } from '@frontend/utils/server';

import { AuthenticationContextProvider } from '../context';

type Props = {
  children: ReactNode;
};

export const AuthenticationProvider = ({ children }: Props) => {
  const user = getUser();

  return <AuthenticationContextProvider user={user}>{children}</AuthenticationContextProvider>;
};
