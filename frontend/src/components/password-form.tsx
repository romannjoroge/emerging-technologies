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

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().min(1, { message: "email is required" }).email(),
  service: z.string({
    required_error: "the name of the service is required",
    invalid_type_error: "service name must be a string",
  }),
  password: z.string().min(1, {
    message: "the password is required",
  }),
  username: z.string(),
  note: z.string(),
});

export default function PasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      service: "",
      email: "",
      note: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      description: "submitted",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full md:w-3/4 px-6  md:px-2 lg:px-0 mx-auto py-2 grid"
      >
        <div className="text-2xl  font-black">Add A New Password</div>
        <div className=" text-sm text-gray-600  mb-4">
          fill in this form and submit it to save your details locally
        </div>
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
                <FormDescription className="sr-only">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
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
                <FormDescription className="sr-only">
                  Enter your email address.
                </FormDescription>
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
                <FormDescription className="sr-only">
                  Enter the password.
                </FormDescription>
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
                <FormDescription className="sr-only">
                  This is the name of the service or platform.
                </FormDescription>
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
                    className=" h-36  resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is the name of the service or platform.
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
