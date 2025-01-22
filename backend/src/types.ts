import { z } from "zod";
export interface Password {
  email?: string;
  password: string;
  note?: string;
  service: string;
  usename?: string;
}
export const passwordschema = z.object({
  email: z.string().optional(),
  password: z.string(),
  note: z.string().optional(),
  service: z.string(),
  username: z.string().optional(),
});
export const initSchema = z.object({
  clock: z.record(z.string(), z.number()),
  clientName: z.string(),
  neighbours: z.array(
    z.object({
      name: z.string(),
      address: z.string(),
    }),
  ),
});

export const pairSchema = z.object({
  url: z.string(),
  name: z.string(),
  address: z.string()
});

export type InitType = z.infer<typeof initSchema>;
export type PasswordType = z.infer<typeof passwordschema>;
export const BASE_HOST = "http://localhost:3000";
