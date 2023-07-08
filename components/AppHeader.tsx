import { LuListChecks } from 'react-icons/lu';
import { SignInButton } from './SignInButton';

type Props = {
  title: string;
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
};

export function AppHeader({ title, user }: Props) {
  return (
    <header className="w-full px-4 py-2 lg:px-8 lg:py-4">
      <div className="container flex items-center h-10 gap-4">
        <LuListChecks className="w-7 h-7" />
        <h1>{title}</h1>
        <SignInButton user={user}/>
      </div>
    </header>
  );
}
