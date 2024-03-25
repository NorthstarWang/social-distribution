import CustomResizable from "@/components/custom-resizable";
import { ReactNode } from "react";

interface BrowseLayoutProps {
  children: ReactNode;
}

export default function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <main className="flex flex-col">
      <div className="bg-background">
        <CustomResizable>{children}</CustomResizable>
      </div>
    </main>
  );
}
