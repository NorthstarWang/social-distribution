import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface CustomDialogProps {
  trigger: ReactNode;
  title: string;
  titleDescription: string;
  content: ReactNode;
  footer: ReactNode;
  width: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomDialog({
  trigger,
  title,
  titleDescription,
  content,
  footer,
  width,
  open,
  onOpenChange,
}: CustomDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className={`max-w-${width} w-[calc(100vw-4rem)]`}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{titleDescription}</DialogDescription>
          </DialogHeader>
          {content}
          <DialogFooter className="sm:justify-start">{footer}</DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        {content}
        <DrawerFooter className="pt-2">{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
