'use client';

import { signIn, signOut } from 'next-auth/react';
import { Avatar } from './MaterialTailwind';
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
          <Avatar
            size="md"
            variant="circular"
            src={user.image ?? undefined}
            alt="user.name ?? 'unknown''"
          />
          <button className="ml-3" onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      )}
      {!user && (
        <button disabled={isTransition} onClick={onSignInClicked}>
          Sign In
        </button>
      )}
    </form>
  );
}
