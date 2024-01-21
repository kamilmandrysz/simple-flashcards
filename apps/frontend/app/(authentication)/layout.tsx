import { ReactNode } from 'react';

import { AuthenticationLayout } from '@frontend/layouts';

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return <AuthenticationLayout>{children}</AuthenticationLayout>;
};

export default AccountLayout;
