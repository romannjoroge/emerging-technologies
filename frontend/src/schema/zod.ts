import z from "zod";

const passwordEntrySchema = z.object({
  email: z.union([z.literal(""), z.string().email()]),
  service: z.string({
    required_error: "the name of the service is required",
    invalid_type_error: "service name must be a string",
  }),
  password: z.string().min(1, {
    message: "the password is required",
  }),
  username: z.string().optional(),
  note: z.string().optional(),
});

const pairSchema = z.object({
  name: z.string(),
  address: z.string(),
  url: z.string(),
});

export { passwordEntrySchema, pairSchema };
