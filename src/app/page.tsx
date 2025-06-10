"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { CheckCircle2, CircleAlert, Loader2Icon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session, isPending } = authClient.useSession();
  const handleSubmit = async () => {
    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onRequest: () => {
          setIsSubmitting(true);
        },
        onResponse: () => {
          setIsSubmitting(false);
        },
        onError: ({ error }) => {
          setSuccess("");
          setError(error.message);
        },
        onSuccess: () => {
          setError("");
          setSuccess("User created successfully");
        },
      }
    );
  };

  return isPending ? (
    <div className="flex items-center justify-center w-full min-h-screen">
      <Loader2Icon className="animate-spin" size={50} />
    </div>
  ) : (
    <>
      {session ? (
        <div className="flex flex-col p-4 gap-y-4">
          <p>
            Currently logged in as <strong>{session?.user.name}</strong> with{" "}
            <strong>{session?.user.email}</strong>
          </p>
          <Button onClick={() => authClient.signOut()}>Sign Out</Button>
        </div>
      ) : (
        <div className="p-2 flex flex-col gap-y-4">
          <Input
            placeholder="Name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? (
              <>
                <Loader2Icon className="animate-spin" /> Submitting
              </>
            ) : (
              <>Sign Up</>
            )}
          </Button>
          {!success
            ? error && (
                <Alert variant="destructive">
                  <CircleAlert />
                  <AlertTitle>Error:</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )
            : !error && (
                <Alert variant="default">
                  <CheckCircle2 />
                  <AlertTitle>Success:</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
        </div>
      )}
    </>
  );
}
