import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

import { authOptions } from '@/lib/auth';

import { GoogleSigninCard } from './GoogleSigninCard';

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/lists');
  }

  return (
    <Suspense fallback={<>Loading...</>}>
      <GoogleSigninCard className="w-full max-w-[30rem] mx-auto mt-10" />
    </Suspense>
  );
}
