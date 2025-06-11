import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import {
  ChevronDown,
  CreditCardIcon,
  Loader2Icon,
  LogOutIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const DashboardUserButton = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onLogout = async () => {
    authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setIsSubmitting(true);
        },
        onResponse: () => {
          setIsSubmitting(false);
        },
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
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex gap-3 items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden transition-colors duration-100 ease-linear">
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
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex flex-col items-center justify-center gap-y-1">
            <Avatar className="size-24 mb-2">
              <AvatarImage src={data?.user?.image!} alt={data?.user.name} />
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
            <DrawerTitle>{data?.user?.name}</DrawerTitle>
            <DrawerDescription>{data?.user?.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant={"outline"}
              className="cursor-pointer flex items-center text-popover-foreground font-medium"
            >
              <CreditCardIcon className="size-4 text-popover-foreground" />{" "}
              Billing
            </Button>
            <Button
              variant={"outline"}
              className="cursor-pointer flex items-center text-popover-foreground font-medium"
              onClick={onLogout}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="size-4 mr-2" />
                  Logging out
                </>
              ) : (
                <>
                  <LogOutIcon className="size-4 text-popover-foreground" />{" "}
                  Logout
                </>
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex gap-3 items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden transition-colors duration-100 ease-linear">
        <Avatar>
          <AvatarImage src={data?.user?.image!} alt={data?.user.name} />
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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="size-4 mr-2" />
                Logging out
              </>
            ) : (
              <>
                <LogOutIcon className="size-4 text-popover-foreground" /> Logout
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
