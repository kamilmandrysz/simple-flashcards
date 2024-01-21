import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const DefaultBody = ({ children }: Props) => (
  <div className="flex min-h-dvh w-full justify-center bg-gray-50">
    <div className="container flex w-full flex-col px-4 pb-10 pt-24">{children}</div>
  </div>
);
