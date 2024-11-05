import { z } from 'zod';
export interface Password {
    email?: string,
    password: string,
    note?: string,
    service: string
    usename?: string
}
export const passwordschema = z.object({
    email: z.string().optional(),
    password: z.string(),
    note: z.string().optional(),
    service: z.string(),
    usename: z.string().optional()
})
export type PasswordType = z.infer<typeof passwordschema>;
export const BASE_HOST = "http://localhost:3000";