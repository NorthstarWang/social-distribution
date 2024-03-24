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

      const sizeBreakpoints = {
        md: 768,
        lg: 1024,
        xl: 1280,
      };

      if (width >= sizeBreakpoints.lg) {
        setPanelSize({ defaultSize: 20, minSize: 18 });
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
        className="hidden md:block h-[calc(100vh-4.125rem)]"
      >
        <Sidebar className="hidden md:block" />
      </ResizablePanel>
      <ResizableHandle withHandle className="hidden md:flex" />
      <ResizablePanel defaultSize={100 - panelSize.defaultSize}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
