import { GetEmployeeByToken } from '../../app/use-cases/get-employee-by-token';
import { EmployeePrismaDatabase } from '../database/prisma/employee-prisma-database';

export function getEmployeeByTokenUseCase(): GetEmployeeByToken {
    const database = new EmployeePrismaDatabase();
    return new GetEmployeeByToken(database);
}
