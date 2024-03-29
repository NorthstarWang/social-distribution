"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { NavItem } from "@/types/nav";
import { AuthContext } from "@/components/context/authContext";
import { useContext } from "react";
import { ModeToggle } from "@/components/theme-toggle";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      <ScrollArea className={className}>
        {siteConfig.sidebarNav.map((section, index) => {
          if (section.requireAuth && !isAuthenticated) {
            return null;
          }

          return (
            <div key={index} className="space-y-4 py-4">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  {section.title}
                </h2>
                <div className="space-y-1">
                  {section.items.map((item: NavItem, itemIndex) => {
                    if (item.requireAuth && !isAuthenticated) {
                      return null;
                    }

                    return (
                      <Link href={item.href} key={itemIndex}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          {item.title}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </ScrollArea>
      <Separator className="mb-1" />
      <div className="flex space-x-1 px-3">
        <Button variant="ghost" className="h-14 w-14" size="icon" asChild>
          <Link href={siteConfig.links.github}>
            <GitHubLogoIcon className="h-8 w-8" />
            <span className="sr-only">GitHub</span>
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </>
  );
}
