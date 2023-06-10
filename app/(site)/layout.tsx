import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/MaterialTailwind";

// These styles apply to every route in the application
import './globals.css';

export const metadata = {
  title: 'Todo',
  description: 'Welcome to Todo',
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="mx-auto max-w-screen-2xl h-screen flex flex-col gap-5">
            <Header title="My TODOs"/>
            <div className="grow">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

