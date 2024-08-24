import {Dialog} from "@/components/ui/dialog"
import { PropsWithChildren} from "react";

type Props = {
	open: boolean;
	onOpenChange: (open:boolean) => void;
} & PropsWithChildren

export function Modal({ open, children, onOpenChange }: Props) {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {children}
      </Dialog>
    </>
  );
}