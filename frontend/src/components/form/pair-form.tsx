import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PairDevice } from "@/services";
import { pairSchema } from "@/schema/zod";
export default function PairForm() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof pairSchema>>({
    resolver: zodResolver(pairSchema),
    defaultValues: {
      name: "",
      address: "",
      url: "",
    },
  });
  const mutation = useMutation({
    mutationFn: PairDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      toast.success("pairing completed");
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
  function onSubmit(values: z.infer<typeof pairSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="  px-6  md:px-2 lg:px-0  py-2 grid"
      >
        <div className="">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name of the device or person"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is the device or person's name .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder=" Enter the IP Adress of the device e.g http://192.168.1.100"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter the address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter the URL of the target device"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter the URL.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="my-6 w-full md:w-1/2 lg:w-1/3 h-12 text-lg font-semibold rounded-md justify-self-center"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
