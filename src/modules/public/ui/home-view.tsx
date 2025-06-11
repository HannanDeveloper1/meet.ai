"use client";
import { LogOutIcon, VerifiedIcon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function HomeView() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col p-4 gap-y-4 items-center justify-center min-h-svh">
      <p className="text-muted-foreground text-base">Logged In as,</p>
      {isPending ? (
        <>
          <Skeleton className="w-16 h-16 rounded-full" />
          <Skeleton className="w-32 h-7" />
          <Skeleton className="w-56 h-6" />
          <Skeleton className="rounded-lg w-26 h-9" />
        </>
      ) : (
        <>
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={session?.user.image ?? ""}
              alt={session?.user.name ?? ""}
            />
            <AvatarFallback className="text-xl">
              {session?.user.name?.charAt(0) ?? ""}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-2xl font-bold">{session?.user.name}</h3>
          <p className="text-lg">
            {session?.user.email}{" "}
            {session?.user.emailVerified && (
              <>
                <VerifiedIcon />
              </>
            )}
          </p>
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => router.push("/sign-in"),
                },
              })
            }
          >
            <LogOutIcon /> Logout
          </Button>
        </>
      )}
    </div>
  );
}
