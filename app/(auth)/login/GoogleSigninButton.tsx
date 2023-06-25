"use client";

import { Button } from "@/components/MaterialTailwind";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useTransition } from "react";

export const GoogleSigninButton = () => {
  const [isTransition, startTransition] = useTransition();

  const onSignInClicked = () =>
    startTransition(() => signIn('google').then(() => void 0));

  return (
    <form onSubmit={() => false}>
      <Button variant="outlined" fullWidth className="flex justify-center items-center gap-3" onClick={onSignInClicked} disabled={isTransition}>
        <Image
          loading="lazy"
          height={24}
          width={24}
          alt="provider-logo"
          src="/logos/google.svg"
        />
        <span>Sign in with Google</span>
      </Button>
    </form>
  );
};