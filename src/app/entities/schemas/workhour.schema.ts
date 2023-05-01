import { z } from 'zod';

export const workhourSchema = z.object({
    id: z.string().uuid(),
    employeeId: z.string().uuid(),
    startDate: z.date(),
    endDate: z.date(),
});

export interface IWorkhour extends z.infer<typeof workhourSchema> {}
