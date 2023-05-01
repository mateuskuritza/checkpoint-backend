import { z } from 'zod';

export const employeeSchema = z.object({
    id: z.string().uuid(),
    token: z.string().regex(/^#[a-zA-Z0-9]{7}$/),
    name: z.string().min(3).max(30),
});

export interface IEmployee extends z.infer<typeof employeeSchema> {}
