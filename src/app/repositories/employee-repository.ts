import { type Employee } from '../entities/employee';

export abstract class EmployeeRepository {
    abstract findByToken(token: string): Promise<Employee | undefined>;
    abstract create(employee: Employee): Promise<void>;
}
