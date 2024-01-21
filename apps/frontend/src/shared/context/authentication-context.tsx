'use client';

import { User } from '@frontend/api';
import { createContext, ReactNode, useContext } from 'react';

export const AuthenticationContext = createContext<{
  user: User | null;
}>({
  user: null,
});

export function AuthenticationContextProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) {
  return (
    <AuthenticationContext.Provider value={{ user }}>{children}</AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
