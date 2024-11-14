import { useQueryClient, useMutation } from "@tanstack/react-query";
import { DeletePasswordEntry } from "@/services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Clipboard, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { PasswordData } from "@/services";
interface ColumnActionsProps {
  entry: PasswordData;
}
const ColumnActions = ({ entry }: ColumnActionsProps) => {
  const queryClient = useQueryClient();
  const DeleteMutation = useMutation({
    mutationFn: DeletePasswordEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PasswordData"] });
      toast.success("the password has been deleted successfully");
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="flex space-x-2 items-center"
          onClick={() => {
            navigator.clipboard.writeText(entry.password);
            toast.success("copied!");
          }}
        >
          <Clipboard className="w-2 h-2" />
          Copy password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center space-x-2">
          <Pencil className="w-2 h-2" />
          Update entry
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => DeleteMutation.mutate(entry.id)}
          className="text-red-500 items-center flex space-x-2 hover:text-red-700 "
        >
          <Trash className="w-2 h-2" />
          Delete entry
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export { ColumnActions };
