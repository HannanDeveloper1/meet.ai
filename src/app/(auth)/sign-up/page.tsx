import { SignUpView } from "@/modules/auth/ui/sign-up-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) return redirect("/");
  return <SignUpView />;
};

export default SignUp;
