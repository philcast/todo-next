'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';

interface SignInButtonProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function SignInButton({user}: SignInButtonProps) {
  const [isTransition, startTransition] = useTransition();

  const onSignInClicked = () =>
    startTransition(() => signIn('google').then(() => void 0));

  return (
    <form onSubmit={() => false}>
      {user && (
        <>
          <Avatar>
            <AvatarImage src={user.image ?? undefined} alt="user.name ?? 'unknown''"/>
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <button className="ml-3" onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      )}
      {!user && (
        <Button disabled={isTransition} onClick={onSignInClicked}>
          Sign In
        </Button>
      )}
    </form>
  );
}
