import { ReactNode } from 'react';

import { getUser } from '@frontend/utils/server';

import { DefaultHeader } from './components';
import { DefaultBody } from './components';

type Props = {
  children: ReactNode;
};

export const DefaultLayout = ({ children }: Props) => {
  const user = getUser();

  return (
    <div className="flex flex-col items-center">
      <DefaultHeader user={user} />
      <DefaultBody>{children}</DefaultBody>
    </div>
  );
};
