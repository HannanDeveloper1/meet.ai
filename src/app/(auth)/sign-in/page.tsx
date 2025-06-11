import { SignInView } from "@/modules/auth/ui/sign-in-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) return redirect("/");
  return <SignInView />;
};

export default SignIn;
