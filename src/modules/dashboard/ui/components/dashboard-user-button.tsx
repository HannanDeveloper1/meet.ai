import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { ChevronDown, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const DashboardUserButton = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  const onLogout = async () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return (
      <Skeleton className="h-16 w-full border border-border/10 bg-white/10 overflow-hidden" />
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex gap-3 items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden transition-colors duration-100 ease-linear">
        <Avatar>
          <AvatarImage src={data?.user.image ?? ""} alt={data?.user.name} />
          <AvatarFallback className="bg-primary">
            {(() => {
              const name = data?.user?.name ?? "";
              const initials =
                name
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((word) => word.charAt(0))
                  .join("") ||
                name.charAt(0) ||
                "";
              return initials;
            })()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data?.user?.name}</p>
          <p className="text-xs truncate w-full">{data?.user?.email}</p>
        </div>
        <ChevronDown className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuGroup className="flex items-center justify-between">
          <Avatar>
            <AvatarImage src={data?.user.image ?? ""} alt={data?.user.name} />
            <AvatarFallback className="bg-primary">
              {(() => {
                const name = data?.user?.name ?? "";
                const initials =
                  name
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((word) => word.charAt(0))
                    .join("") ||
                  name.charAt(0) ||
                  "";
                return initials;
              })()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 p-2 flex-1">
            <span className="font-medium truncate">{data?.user?.name}</span>
            <span className="font-sm font-normal text-muted-foreground truncate">
              {data?.user?.email ?? ""}
            </span>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer flex items-center text-popover-foreground font-medium">
            <CreditCardIcon className="size-4 text-popover-foreground" />{" "}
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex items-center text-popover-foreground font-medium"
            onClick={onLogout}
          >
            <LogOutIcon className="size-4 text-popover-foreground" /> Logout
          </DropdownMenuItem>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
