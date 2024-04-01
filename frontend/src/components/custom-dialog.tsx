import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

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
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-6xl">
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
