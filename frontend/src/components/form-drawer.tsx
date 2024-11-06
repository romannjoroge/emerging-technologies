import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import PasswordForm from "./password-form";
import { X } from "lucide-react";

const FormDrawer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <PasswordForm />
        <DrawerClose>
          <Button
            size="sm"
            variant="ghost"
            className=" h-auto w-auto  focus-visible:ring-0 focus-visible:ring-offset-0 p-2 absolute  top-1 right-2  text-neutral-800  hover:text-rose-500  rounded-full "
          >
            <X className="h-4 w-4" />
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default FormDrawer;
