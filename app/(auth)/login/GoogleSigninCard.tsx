'use client';

import Image from 'next/image';

import { signIn } from 'next-auth/react';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface GoogleSigninCardProps {
  className?: string;
}

export const GoogleSigninCard = ({ className }: GoogleSigninCardProps) => {
  const [isTransition, startTransition] = useTransition();

  const onSignInClicked = () => {
    startTransition(() => signIn('google').then(() => void 0));
    return false;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl text-muted-foreground">Please sign in to access your TODOs.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" width="full" className={className} onClick={onSignInClicked} disabled={isTransition}>
          <Image loading="lazy" height={24} width={24} className="mr-2" alt="google-logo" src="/logos/google.svg" />
          Sign in with Google
        </Button>
      </CardFooter>
    </Card>
  );
};
