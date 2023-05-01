import { randomUUID } from 'crypto';
import { type IWorkhour } from '../../app/entities/schemas/workhour.schema';
import { Workhour } from '../../app/entities/workhour';

type Override = Partial<IWorkhour>;

export function makeWorkhour(override: Override = {}): Workhour {
    const startDate = new Date();

    return new Workhour({
        employeeId: randomUUID(),
        startDate,
        endDate: new Date(startDate.getTime() + 1),
        ...override,
    });
}
