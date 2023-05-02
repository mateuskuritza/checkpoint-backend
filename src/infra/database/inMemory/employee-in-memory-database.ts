import { type Employee } from '../../../app/entities/employee';
import { type EmployeeRepository } from '../../../app/repositories/employee-repository';
import { makeEmployee } from '../../../tests/factories/employee-factory';

export class EmployeeInMemoryDatabase implements EmployeeRepository {
    private readonly employees: Employee[] = [];

    constructor() {
        const me = makeEmployee({
            token: '#1234567',
        });

        this.employees.push(me);
    }

    async findByToken(token: string): Promise<Employee | undefined> {
        const user = this.employees.find((employee) => employee.token === token);
        return user;
    }

    async create(employee: Employee): Promise<void> {
        this.employees.push(employee);
    }

    async findById(id: string): Promise<Employee | undefined> {
        return this.employees.find((employee) => employee.id === id);
    }
}
