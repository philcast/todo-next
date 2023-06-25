import { Card, CardBody, CardFooter, CardHeader, Typography } from "@/components/MaterialTailwind";
import { GoogleSigninButton } from "./GoogleSigninButton";
import { Suspense } from "react";
import { authOptions } from "@/lib/auth";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/lists');
  }
  
  return(
  <Suspense fallback={<>Loading...</>}>
      <Card className="w-full max-w-[30rem] mx-auto mt-10 p-8">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="mb-4 place-items-center"
        >
          <Typography variant="h3" className="text-center">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Typography>Please sign in to access the app.</Typography>
          <p>
            <GoogleSigninButton />
          </p>
        </CardBody>
        <CardFooter className="pt-0">
        </CardFooter>
      </Card>
  </Suspense>
  );
}
