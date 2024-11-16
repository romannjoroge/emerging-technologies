import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogForm from "./form/dialog-form";
import { PasswordData } from "@/services";

export function PasswordDialog({
  children,
  entry,
}: {
  children: React.ReactNode;
  entry: PasswordData;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:w-2/3 lg:w-1/2">
        <DialogHeader>
          <DialogTitle>Edit password</DialogTitle>
          <DialogDescription>
            Make changes to the password entry. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogForm entry={entry} />
      </DialogContent>
    </Dialog>
  );
}
