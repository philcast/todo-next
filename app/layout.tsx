// These styles apply to every route in the application
import './globals.css';
import { AppHeader } from '@/components/AppHeader';
import { Providers } from '@/components/Providers';
import { authOptions } from '@/lib/auth';
import { getServerSession,  } from 'next-auth/next';

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
    <html lang="en">
      <body className="h-screen overflow-y-hidden">
        <Providers>
          <div className="mx-auto max-w-screen-2xl h-screen flex flex-col">
            <AppHeader title="My TODOs" user={session?.user}/>
            <main className="grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
