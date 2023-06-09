import { Employee } from '../../app/entities/employee';
import { type IEmployee } from '../../app/entities/schemas/employee.schema';

type Override = Partial<IEmployee>;

export function makeEmployee(override: Override = {}): Employee {
    return new Employee({
        name: 'John Doe',
        token: '#1234567',
        ...override,
    });
}
