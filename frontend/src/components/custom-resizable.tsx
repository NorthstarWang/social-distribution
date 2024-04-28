"use client";

import { useEffect, useState } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Sidebar } from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { set } from "react-hook-form";

interface CustomResizableProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean;  // New prop with default value true
}

export default function CustomResizable({
  children,
  scrollable = true,
}: CustomResizableProps) {
  function getPanelSize() {
    const width = window.innerWidth;

    if (width >= 2560) {
      return { defaultSize: 10, minSize: 10, maxSize: 16};
    } else if (width >= 1920) {
      return { defaultSize: 12, minSize: 12, maxSize: 18};
    } else if (width >= 1536) {
      return { defaultSize: 14, minSize: 14, maxSize: 20};
    } else if (width >= 1024) {
      return { defaultSize: 20, minSize: 16, maxSize: 22};
    } else {
      return { defaultSize: 22, minSize: 18, maxSize: 24};
    }
  }

  const [panelSize, setPanelSize] = useState(getPanelSize());

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
      setPanelSize(getPanelSize());
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
        maxSize={panelSize.maxSize}
        className="hidden md:block h-[calc(100vh-4.125rem)]"
      >
        <Sidebar className="hidden md:block h-[calc(100vh-8rem)]" />
      </ResizablePanel>
      <ResizableHandle withHandle className="hidden md:flex" />
      <ResizablePanel
        className="h-[calc(100vh-4.125rem)]"
        defaultSize={100 - panelSize.defaultSize}
      >
        {scrollable ? (
          <ScrollArea className="col-span-3 md:col-span-4 h-full overflow-auto">
            {children}
          </ScrollArea>
        ) : (
          <>{children}</>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
