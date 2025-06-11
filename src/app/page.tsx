import { auth } from "@/lib/auth";
import HomeView from "@/modules/public/ui/home-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/sign-in");
  return <HomeView />;
}
