// These styles apply to every route in the application
import { getServerSession } from 'next-auth/next';

import { AppHeader } from '@/components/app-header';
import { authOptions } from '@/lib/auth';

import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Todo',
  description: 'Welcome to Todo',
};

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen overflow-y-hidden">
        <Providers>
          <div className="mx-auto max-w-screen-2xl h-screen flex flex-col">
            <AppHeader title="My TODOs" user={session?.user} />
            <main className="mt-3 lg:mt-4 grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
