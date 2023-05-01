import { randomUUID } from 'node:crypto';
import { InvalidDataError } from '../errors/invalid-data-error';
import { employeeSchema, type IEmployee } from './schemas/employee.schema';

export class Employee {
    private readonly props: IEmployee;

    constructor(props: Omit<IEmployee, 'id'>, id?: string) {
        const data = {
            ...props,
            id: id ?? randomUUID(),
        };

        const { valid, error } = this.isValid(data);
        if (!valid) throw new InvalidDataError(error);

        this.props = { ...data };
    }

    private isValid(props: IEmployee): {
        valid: boolean;
        error?: string;
    } {
        const result = employeeSchema.safeParse(props);

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
