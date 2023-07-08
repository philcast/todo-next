import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { GoogleSigninCard } from "./GoogleSigninCard";
import { Suspense } from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/lists');
  }
  
  return(
  <Suspense fallback={<>Loading...</>}> 
    <GoogleSigninCard className="w-full max-w-[30rem] mx-auto mt-10"/>
  </Suspense>
  );
}
