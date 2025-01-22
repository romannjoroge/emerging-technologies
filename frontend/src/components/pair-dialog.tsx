import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PairForm from "./form/pair-form";
export function PairDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:w-2/3 lg:w-1/2">
        <DialogHeader>
          <DialogTitle>Pair</DialogTitle>
          <DialogDescription>
            Transfer your data to another device.
          </DialogDescription>
        </DialogHeader>
        <PairForm />
      </DialogContent>
    </Dialog>
  );
}
