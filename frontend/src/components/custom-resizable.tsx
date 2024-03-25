"use client";

import { useEffect, useState } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Sidebar } from "@/components/sidebar";

export default function CustomResizable({
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [panelSize, setPanelSize] = useState({ defaultSize: 15, minSize: 10 });

  function debounce(
    func: (...args: any[]) => void,
    wait: number
  ): (...args: any[]) => void {
    let timeout: NodeJS.Timeout | null;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout!);
        func(...args);
      };
      clearTimeout(timeout!);
      timeout = setTimeout(later, wait);
    };
  }

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width >= 2560) {
        setPanelSize({ defaultSize: 15, minSize: 10 });
      } else if (width >= 1920) {
        setPanelSize({ defaultSize: 17, minSize: 12 });
      } else if (width >= 1536) {
        setPanelSize({ defaultSize: 19, minSize: 14 });
      } else if (width >= 1024) {
        setPanelSize({ defaultSize: 25, minSize: 20 });
      } else {
        setPanelSize({ defaultSize: 30, minSize: 25 });
      }
    }

    const debouncedHandleResize = debounce(handleResize, 250);
    window.addEventListener("resize", debouncedHandleResize);
    handleResize();
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        collapsible
        minSize={panelSize.minSize}
        defaultSize={panelSize.defaultSize}
        maxSize={40}
        className="hidden md:block h-[calc(100vh-4.125rem)]"
      >
        <Sidebar className="hidden md:block" />
      </ResizablePanel>
      <ResizableHandle withHandle className="hidden md:flex" />
      <ResizablePanel
        className="h-[calc(100vh-4.125rem)]"
        defaultSize={100 - panelSize.defaultSize}
      >
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
