"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Loader2Icon, LogInIcon, OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { GitHub, Google } from "@/constants/icons";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<{
    isSubmitting: boolean;
    type: "email" | "google" | "github" | null;
  }>({
    isSubmitting: false,
    type: null,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);

    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: ({ error }) => {
          setError(error.message);
        },
        onRequest: () => {
          setPending({
            isSubmitting: true,
            type: "email",
          });
        },
        onResponse: () => {
          setPending({
            isSubmitting: false,
            type: null,
          });
        },
      }
    );
  };

  const oAuth = async ({ provider }: { provider: "google" | "github" }) => {
    setError(null);
    await authClient.signIn.social(
      {
        provider,
        callbackURL: "/",
      },
      {
        onError: ({ error }) => {
          setError(error.message);
        },
        onRequest: () => {
          setPending({
            isSubmitting: true,
            type: provider,
          });
        },
        onResponse: () => {
          setPending({
            isSubmitting: false,
            type: null,
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="me@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle className="text-destructive">
                      {error}
                    </AlertTitle>
                  </Alert>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={pending.isSubmitting}
                >
                  {pending.isSubmitting && pending.type === "email" ? (
                    <>
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                      Signing In
                    </>
                  ) : (
                    <>
                      Sign In <LogInIcon />
                    </>
                  )}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button
                    variant={"outline"}
                    type="button"
                    className="w-full"
                    disabled={pending.isSubmitting}
                    onClick={() => oAuth({ provider: "google" })}
                  >
                    {pending.isSubmitting && pending.type === "google" ? (
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                    ) : (
                      <Google className="*:[path]:fill-secondary-foreground size-3.5" />
                    )}
                    Google
                  </Button>
                  <Button
                    variant={"outline"}
                    type="button"
                    className="w-full"
                    disabled={pending.isSubmitting}
                    onClick={() => oAuth({ provider: "github" })}
                  >
                    {pending.isSubmitting && pending.type === "github" ? (
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                    ) : (
                      <GitHub className="*:[path]:fill-secondary-foreground size-3.5" />
                    )}
                    GitHub
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={"/sign-up"}
                    className="underline underline-offset-4 font-semibold"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src={"/logo.svg"} alt="logo" className="h-[92px] w-[92px]" />
            <p className="text-3xl font-special font-bold text-white">
              Meet.AI
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:font-semibold  *:[a]:underline *:[a]:underline-offset-4">
        By continue, you agree to our <a href="#">Terms & Service</a> and{" "}
        <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};
