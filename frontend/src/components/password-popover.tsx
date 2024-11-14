import {
  Popover,
  PopoverContent,
  PopoverClose,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ElementRef, useRef } from "react";
import PopoverForm from "./form/popover-form";
interface WalletPopoverProps {
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}
export const PasswordPopover = ({
  children,
  align,
  side = "bottom",
  sideOffset,
}: WalletPopoverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className=" w-96 pt-3"
      >
        <div className="relative">
          <PopoverClose asChild ref={closeRef}>
            <Button
              size="sm"
              variant="ghost"
              className=" h-auto w-auto  focus-visible:ring-0 focus-visible:ring-offset-0 p-2 absolute  top-1 right-2  text-neutral-800  hover:text-rose-500  rounded-full "
            >
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
          <PopoverForm />
        </div>
      </PopoverContent>
    </Popover>
  );
};
