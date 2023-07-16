import { LuListChecks } from 'react-icons/lu';

import { SignInButton } from './sign-in-button';
import { ThemeToggle } from './theme-toogle';

type Props = {
  title: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export function AppHeader({ title, user }: Props) {
  return (
    <header className="w-full px-4 py-2 lg:py-4 border-b bg-header text-header-foreground">
      <div className="flex items-center h-10 gap-4">
        <LuListChecks className="w-7 h-7" />
        <h1 className="flex-grow">{title}</h1>
        <ThemeToggle />
        <SignInButton user={user} />
      </div>
    </header>
  );
}
