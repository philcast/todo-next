'use client';

import { signOut } from 'next-auth/react';
import { useTransition } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SignInButtonProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function SignInButton({ user }: SignInButtonProps) {
  const [isTransition, startTransition] = useTransition();

  return user?.image && user?.name ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar role="button">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <form className="flex" onSubmit={() => startTransition(signOut)}>
          <button className="ml-3">Sign Out</button>
          {isTransition && <Spinner />}
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar>
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>Please sign in</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
