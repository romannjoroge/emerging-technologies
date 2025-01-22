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

export const updatePasswordSchema = z.object({
    password: z.string().optional(),
    email: z.string().optional(),
    note: z.string().optional(),
    service: z.string().optional(),
    username: z.string().optional()
});

export const handleMessageSchema = z.object({
    requestType: z.enum(["ADD", "DELETE", "UPDATE"]),
    args: z.record(z.string(), z.any()),
    clock: z.record(z.string(), z.number()),
});

export const pairSchema = z.object({
    neighbour: z.object({
        name: z.string(),
        address: z.string()
    }),
    passwords: z.array(z.object({
        id: z.number(),
        email: z.string().optional(),
        password: z.string(),
        note: z.string().optional(),
        service: z.string(),
        username: z.string().optional()
    }))
});

export type UpdatePassword = z.infer<typeof updatePasswordSchema>;
export type PasswordType = z.infer<typeof passwordSchema>;
export type InitSchema = z.infer<typeof initSchema>
export type UpdateNeighbour = z.infer<typeof handleMessageSchema>;