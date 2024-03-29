"use client";

import * as React from "react";
import Link from "next/link";

import { NavItem } from "@/types/nav";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuthContext, AuthorContext } from "@/components/context/authContext";
import { useContext } from "react";
import { UserAvatar } from "@/components/user-avatar";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const { author } = useContext(AuthorContext);
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="gap-6 md:gap-6 mr-4 hidden md:flex">
      {items?.length ? (
        <nav className="flex gap-6">
          {items.map((item, index) => {
            if (item.requireAuth && !isAuthenticated) {
              return null;
            }
            return (
              item.href && (
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
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}
