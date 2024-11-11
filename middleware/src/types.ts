import {z} from "zod";

export const initSchema = z.object({
    clock: z.record(z.string(), z.number()),
    clientName: z.string(),
    neighbours: z.array(z.object({
        name: z.string(),
        address: z.string()
    }))
})

export const passwordSchema = z.object({
   email: z.string().optional(),
   password: z.string(),
   note: z.string().optional(),
   service: z.string(),
   username: z.string().optional() 
})

export type PasswordType = z.infer<typeof passwordSchema>;