import { Employee } from '../../../app/entities/employee';
import { type EmployeeRepository } from '../../../app/repositories/employee-repository';
import { prismaClient } from './prisma-config';

export class EmployeePrismaDatabase implements EmployeeRepository {
    async findByToken(token: string): Promise<Employee | undefined> {
        const result = await prismaClient.employee.findFirst({
            where: {
                token,
            },
        });
        if (result != null) return new Employee(result, result.id);
    }

    async create(employee: Employee): Promise<void> {
        await prismaClient.employee.create({
            data: employee,
        });
    }

    async findById(id: string): Promise<Employee | undefined> {
        const result = await prismaClient.employee.findFirst({
            where: {
                id,
            },
        });
        if (result != null) return new Employee(result, result.id);
    }
}
