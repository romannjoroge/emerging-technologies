import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import PasswordForm from "@/components/password-form";
import { Toaster } from "@/components/ui/toaster";
import { X, Plus } from "lucide-react";
function App() {
  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <Button className=" my-12 flex items-center justify-center ml-2  ">
            <Plus className="w-4 h-4"></Plus>
            <div>Add</div>
          </Button>
        </DrawerTrigger>
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
      <Toaster />
    </>
  );
}

export default App;
