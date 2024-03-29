"use client";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { AuthContext, AuthorContext } from "@/components/context/authContext";
import { useContext } from "react";
import { UserAvatar } from "@/components/user-avatar";

export function SiteHeader() {
  const { isAuthenticated } = useContext(AuthContext);
  const { author } = useContext(AuthorContext);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {isAuthenticated ? (
              <UserAvatar author={author} />
            ) : (
              <Link
                href="/authentication"
                className="flex items-center space-x-2"
              >
                <Button>
                  <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login with Github
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
