import { type Employee } from '../entities/employee';

export abstract class EmployeeRepository {
    abstract findById(id: string): Promise<Employee | undefined>;
    abstract findByToken(token: string): Promise<Employee | undefined>;
    abstract create(employee: Employee): Promise<void>;
}
