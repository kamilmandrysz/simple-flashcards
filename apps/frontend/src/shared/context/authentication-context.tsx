'use client';

import { User } from '@frontend/api';
import { createContext, ReactNode, useContext, useState } from 'react';

export const AuthenticationContext = createContext<{
  user: User | null;
}>({
  user: null,
});

export const AuthenticationContextProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) => {
  return (
    <AuthenticationContext.Provider value={{ user }}>{children}</AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};
