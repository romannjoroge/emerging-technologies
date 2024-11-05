import {z} from "zod";

export const initSchema = z.object({
    clock: z.record(z.string(), z.number()),
    clientName: z.string(),
    neighbours: z.array(z.object({
        name: z.string(),
        address: z.string()
    }))
})