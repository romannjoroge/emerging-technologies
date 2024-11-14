import { useQueryClient, useMutation } from "@tanstack/react-query";
import { DeletePasswordEntry } from "@/services";
import { toast } from "sonner";
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
