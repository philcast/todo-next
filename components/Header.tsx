import { ListBulletIcon } from "./HeroIcons";
import { Avatar, Navbar, Typography } from "./MaterialTailwind";

type HeaderProps = {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <Navbar className="w-full py-2 px-4 lg:px-8 lg:py-4 bg-blue-500">
      <div className="container mx-auto py-1.5 flex items-center gap-4 ">
        <ListBulletIcon className="h-6 w-6" />
        <Typography className="font-medium grow">
          {title}
        </Typography>
        <Avatar
          size="md"
          variant="circular"
          src="https://gravatar.com/userimage/35548340/749da3d55ec4acd802a164d120bf0982?size=100"
          alt="philippe"
        />
      </div>
    </Navbar>
  );
}