"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { NavItem } from "@/types/nav";
import { AuthContext } from "@/components/context/authContext";
import { useContext } from "react";
import { ModeToggle } from "@/components/theme-toggle";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 pt-8 flex flex-col h-full">
        <ScrollArea className="flex-1 my-4 pb-10 pl-6 h-full">
          <div className="flex flex-col space-y-3">
            {isAuthenticated ? null : (
              <MobileLink
                href="/"
                className="flex items-center"
                onOpenChange={setOpen}
              >
                <Button>
                  <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login with Github
                </Button>
              </MobileLink>
            )}
            {siteConfig.mainNav?.map(
              (item) =>
                (isAuthenticated || !item.requireAuth) &&
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
          <div className="flex flex-col space-y-2 pb-4">
            {siteConfig.sidebarNav.map(
              (item, index) =>
                (isAuthenticated || !item.requireAuth) && (
                  <div key={index} className="flex flex-col space-y-3 pt-6">
                    <h4 className="font-medium">{item.title}</h4>
                    {item?.items?.length &&
                      item.items.map(
                        (item: NavItem) =>
                          (isAuthenticated || !item.requireAuth) && (
                            <React.Fragment key={item.href}>
                              {item.href ? (
                                <MobileLink
                                  href={item.href}
                                  onOpenChange={setOpen}
                                  className="text-muted-foreground"
                                >
                                  {item.title}
                                </MobileLink>
                              ) : (
                                item.title
                              )}
                            </React.Fragment>
                          )
                      )}
                  </div>
                )
            )}
          </div>
        </ScrollArea>
        
      <SheetFooter className="flex-shrink-0 flex flex-row items-center space-x-1 p-3">
        <Button variant="ghost" className="h-14 w-14" size="icon">
            <Link href={siteConfig.links.github}>
              <GitHubLogoIcon className="h-8 w-8" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <ModeToggle />
      </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
