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
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="candice wu"
          />
      </div>
    </Navbar>
  );
}