import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PasswordData, UpdatePasswordEntry } from "@/services";
import { passwordEntrySchema } from "@/schema/zod";
export default function DialogForm({ entry }: { entry: PasswordData }) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof passwordEntrySchema>>({
    resolver: zodResolver(passwordEntrySchema),
    defaultValues: {
      username: entry.username || "",
      password: entry.password || "",
      service: entry.service || "",
      email: entry.email || "",
      note: entry.note || "",
    },
  });
  const mutation = useMutation({
    mutationFn: UpdatePasswordEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      toast.success("the entry has been updated");
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
  function onSubmit(values: z.infer<typeof passwordEntrySchema>) {
    mutation.mutate({ passwordData: values, id: entry.id });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full   px-2  py-2 grid"
      >
        <div className="">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="e.g mbeka02" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="e.g mbeka02@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <FormControl>
                  <Input placeholder="e.g Instagram" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="type your note here"
                    className=" h-28  resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="my-6 w-full md:w-1/2 lg:w-1/3 h-12 text-lg font-semibold rounded-md justify-self-center"
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
