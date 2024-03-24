"use client"

import * as React from "react";
import Link from "next/link";

import { NavItem } from "@/types/nav";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/components/context/authContext";
import { useContext } from "react";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <div className="gap-6 md:gap-10 mr-4 hidden md:flex">
        <Link href="/authentication" className="flex items-center space-x-2">
          <Button>
            <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login with Github
          </Button>
        </Link>
        {items?.length ? (
          <nav className="flex gap-6">
            {items?.map(
              (item, index) =>
                !item.requireAuth && item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </div>
    </AuthContext.Provider>
  );
}
