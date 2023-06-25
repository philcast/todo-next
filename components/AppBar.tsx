import { Navbar, Typography } from './MaterialTailwind';
import { ListBulletIcon } from './HeroIcons';
import { SignInButton } from './SignInButton';

type Props = {
  title: string;
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
};

export function AppBar({ title, user }: Props) {
  return (
    <Navbar variant="gradient" color="blue" className="w-full py-2 px-4 lg:px-8 lg:py-4">
      <div className="container flex items-center gap-4 h-10">
        <ListBulletIcon className="h-6 w-6" />
        <Typography className="font-medium grow">{title}</Typography>
        <SignInButton user={user}/>
      </div>
    </Navbar>
  );
}
