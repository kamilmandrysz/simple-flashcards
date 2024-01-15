import '@frontend/styles/global.css';

import { ReactNode } from 'react';
import { Open_Sans } from 'next/font/google';

import { NotificationsProvider } from '@frontend/shared/context';
import { AuthenticationProvider } from '@frontend/shared/providers';

import { NotificationArea } from '@frontend/components';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  variable: '--font-open-sans',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <AuthenticationProvider>
          <NotificationsProvider>
            {children}
            <NotificationArea />
          </NotificationsProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
