import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogForm from "./form/dialog-form";

export function PasswordDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:w-2/3 lg:w-1/2 w-3/4">
        <DialogHeader>
          <DialogTitle>Edit password</DialogTitle>
          <DialogDescription>
            Make changes to the password entry. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogForm />
      </DialogContent>
    </Dialog>
  );
}
