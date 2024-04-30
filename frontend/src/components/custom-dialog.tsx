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
import { ReactNode, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface CustomDialogProps {
  trigger: ReactNode;
  title: string;
  titleDescription: string;
  content: ReactNode;
  footer: ReactNode;
}

export function CustomDialog({
  trigger,
  title,
  titleDescription,
  content,
  footer,
}: CustomDialogProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="max-w-6xl w-[calc(100vw-4rem)]">
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
    <Drawer open={open} onOpenChange={setOpen}>
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
