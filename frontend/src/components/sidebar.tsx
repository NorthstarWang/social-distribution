import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { NavItem } from "@/types/nav";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pb-12", className)}>
      {siteConfig.sidebarNav.map(
        (section, index) =>
          !section.requireAuth && (
            <div key={index} className="space-y-4 py-4">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  {section.title}
                </h2>
                <div className="space-y-1">
                  {section.items.map(
                    (item: NavItem, itemIndex) =>
                      !item.requireAuth && (
                        <Link href={item.href} key={itemIndex}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            {item.title}
                          </Button>
                        </Link>
                      )
                  )}
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
}
