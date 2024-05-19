"use client";
import Link from "next/link";

import Image from "next/image";
import { UserAuthForm } from "@/components/authentication/user-auth-form";
import { useState } from "react";
import { Icons } from "@/components/icons";

export default function AuthenticationPage() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <div className="container relative hidden flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 h-[calc(100vh-4.125rem)]">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900">
            {isLoading && (
              <div className="flex items-center justify-center h-screen">
                <Icons.spinner className="h-4 w-4 animate-spin" />
              </div>
            )}
            <Image
                src="/auth_splash.jpg"
                alt="Photo by https://unsplash.com/@pawel_czerwinski"
                fill
                priority
                onLoad={() => setIsLoading(false)}
                className="rounded-md object-cover"
              />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in with Github
              </h1>
              <p className="text-sm text-muted-foreground">
                Authenticate with your Github account and get started.
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href=""
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href=""
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
