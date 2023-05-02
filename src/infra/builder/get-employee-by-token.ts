import { GetEmployeeByToken } from '../../app/use-cases/get-employee-by-token';
import { EmployeeInMemoryDatabase } from '../database/inMemory/employee-in-memory-database';

export function getEmployeeByTokenUseCase(): GetEmployeeByToken {
    const database = new EmployeeInMemoryDatabase();
    return new GetEmployeeByToken(database);
}
