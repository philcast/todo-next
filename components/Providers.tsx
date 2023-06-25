'use client';

import { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@material-tailwind/react/context/theme';

export function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <ThemeProvider>
      <SessionProvider>{children}</SessionProvider>;
    </ThemeProvider>
  );
}
