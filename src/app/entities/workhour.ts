import { randomUUID } from 'node:crypto';
import { InvalidDataError } from '../errors/invalid-data-error';
import { workhourSchema, type IWorkhour } from './schemas/workhour.schema';

export class Workhour {
    private readonly props: IWorkhour;

    constructor(props: Omit<IWorkhour, 'id'>, id?: string) {
        const data = {
            ...props,
            id: id ?? randomUUID(),
        };

        const { valid, error } = this.isValid(data);
        if (!valid) throw new InvalidDataError(error);
        if (!this.isStartDateBeforeEndData(data)) throw new InvalidDataError('Start date must be before end date');

        this.props = { ...data };
    }

    private isStartDateBeforeEndData({ startDate, endDate }: IWorkhour): boolean {
        return startDate.getTime() < endDate.getTime();
    }

    private isValid(props: IWorkhour): {
        valid: boolean;
        error?: string;
    } {
        const result = workhourSchema.safeParse(props);

        if (result.success) {
            return {
                valid: true,
            };
        }

        return {
            valid: false,
            error: result.error.message,
        };
    }
}
