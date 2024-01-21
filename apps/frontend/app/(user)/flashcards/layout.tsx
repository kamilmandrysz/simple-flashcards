import { ReactNode } from 'react';

import { DefaultLayout } from '@frontend/layouts';

const UserLayout = ({ children }: { children: ReactNode }) => {
  return <DefaultLayout>{children}</DefaultLayout>;
};

export default UserLayout;
